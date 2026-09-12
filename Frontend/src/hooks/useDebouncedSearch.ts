import { useState, useEffect, useRef } from "react";
import { BACKEND_URL } from "../components/config";
import axios from "axios";
import type { ContentType } from "../types/content";

type ContentItem = {
  _id: string,
  title: string,
  content?: string,
  link?: string,
  type: ContentType,
  tags?: string[],
  workspaceId?: string | null,
  isPinned?: boolean,
  createdAt?: string
};

export function useDebouncedSearch(query: string, token: string | null, delay = 400) {

  const [results, setResults] = useState<ContentItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timer = useRef<number | null>(null);
  const abortCtrl = useRef<AbortController | null>(null);

  useEffect(() => {
    if (timer.current) {
      window.clearTimeout(timer.current);
    }

    if (!query || query.trim() === "") {
      if (abortCtrl.current) {
        abortCtrl.current.abort();
        abortCtrl.current = null;
      }

      setResults(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);

    timer.current = window.setTimeout(async () => {
      if (abortCtrl.current) {
        abortCtrl.current.abort();
      }
      abortCtrl.current = new AbortController();

      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/search`, {
          params: { q: query },
          headers: token ? { Authorization: token } : undefined,
          signal: abortCtrl.current.signal,
        });

        setResults(res.data.results || []);
      } catch (error: unknown) {

        if (axios.isCancel(error)) {
          //ignore
        } else {
          const err = error as { name?: string; code?: string };
          if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED") {
            //
          } else {
            console.error("Search error", error);
            setError("Search failed");
            setResults([]);
          }
        }
      } finally {
        setLoading(false);
      }

    }, delay);



    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
    };
  }, [query, token, delay]);

  return { results, loading, error };
}
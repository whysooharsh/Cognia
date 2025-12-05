import { useState, useEffect, useRef } from "react";
import { BACKEND_URL } from "../components/config";
import axios from "axios";

type ContentItem = {
  _id: string,
  title: string,
  content?: string,
  link?: string,
  type?: string,
  tags?: string[],
  createdAt?: string
};

export function useDebouncedSearch(query: string, token: string | null, delay = 400) {

  const [results, setResults] = useState<ContentItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timer = useRef<number | null>(null);
  const abortCtrl = useRef<AbortController | null>(null); // to cancel async ops

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
        console.log("Searching for:", query);
        console.log("Backend URL:", BACKEND_URL);
        
        const res = await axios.get(`${BACKEND_URL}/api/v1/search`, {
          params: { q: query },
          headers: token ? { Authorization: token } : undefined,
          signal: abortCtrl.current.signal,
        });
        
        console.log("Search response:", res.data);
        setResults(res.data.results || []);
      } catch (error: any) {

        if (axios.isCancel?.(error)) {
          //ignore
        } else if (error?.name === "Cancelled Error " || error?.code == "ERR_Cancelled") {
          // 
        } else {
          console.error("Search error", error);
          setError("Search failed");
          setResults([]);
        }
      } finally {
        setLoading(false);
      }

    }, delay);

    // cleanup 

    return () => {
      if(timer.current){
        window.clearTimeout(timer.current);
      }
    };
  }, [query, token, delay]);

  return { results, loading, error };
}
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { BACKEND_URL } from "../components/config";

export interface Workspace {
  _id: string;
  name: string;
  color: string;
  icon: string;
  createdAt: string;
}

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${BACKEND_URL}/api/v1/workspaces`, {
        headers: { Authorization: token },
      })
      .then((res) => setWorkspaces(res.data.workspaces))
      .catch((err) => console.error("Error fetching workspaces:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createWorkspace = async (name: string, color?: string) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/workspaces`,
      { name, color: color || "#6B7280" },
      { headers: { Authorization: token } }
    );
    refresh();
    return res.data.workspace;
  };

  const deleteWorkspace = async (id: string) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${BACKEND_URL}/api/v1/workspaces/${id}`, {
      headers: { Authorization: token },
    });
    refresh();
  };

  return { workspaces, loading, refresh, createWorkspace, deleteWorkspace };
}

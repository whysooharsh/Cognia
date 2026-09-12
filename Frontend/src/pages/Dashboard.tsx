import { useState } from "react";
import axios from "axios";

import {
  BACKEND_URL,
  ButtonCustom,
  Card,
  ContentDetailModal,
  CreateContentModal,
  CreateWorkspaceModal,
  Navbar,
  SearchBar,
  SideBar,
  showCopyToast,
} from "../components";
import { useContent, useDebouncedSearch, useWorkspaces } from "../hooks";
import type { ContentItem } from "../types/content";
import {
  DeleteIcon,
  DocIcon,
  PlusIcon,
  ShareIcon,
  ShareLink,
  XIcon,
  Youtube,
} from "../icons";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [expandedItem, setExpandedItem] = useState<ContentItem | null>(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(null);
  const [wsModalOpen, setWsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "a-z" | "z-a">("newest");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const token = localStorage.getItem("token");

  const { results: searchResults, loading: searchLoading } = useDebouncedSearch(query, token, 300);
  const { workspaces, createWorkspace, deleteWorkspace } = useWorkspaces();

  const { contents, refresh } = useContent();
  const dataToDisplay: ContentItem[] =
    query.trim().length > 0
      ? searchResults || []
      : contents || [];

  const filtered = dataToDisplay.filter((item) => {
    const matchesType = !filter || item.type === filter;
    const matchesWorkspace = !selectedWorkspace || item.workspaceId === selectedWorkspace;
    const matchesTag = !activeTag || (item.tags && item.tags.includes(activeTag));
    return matchesType && matchesWorkspace && matchesTag;
  });

  const displayed = [...filtered].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    switch (sortBy) {
      case "oldest":
        return new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime();
      case "a-z":
        return (a.title || "").localeCompare(b.title || "");
      case "z-a":
        return (b.title || "").localeCompare(a.title || "");
      case "newest":
      default:
        return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
    }
  });

  async function handlePin(id: string) {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${BACKEND_URL}/api/v1/content/${id}/pin`, {}, {
        headers: { Authorization: token },
      });
      refresh();
    } catch (error) {
      console.error("Pin error:", error);
    }
  }

  function handleFilterSelect(type: string) {
    setFilter(prev => (prev === type ? null : type));
  }

  async function handleCopy(text: string) {
    await navigator.clipboard.writeText(text);
    showCopyToast();
  }

  return (
    <div className="min-h-screen bg-paper">
      <div className="block lg:hidden">
        <Navbar />
      </div>
      <SideBar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        onFilterSelect={handleFilterSelect}
        selectedType={filter}
        workspaces={workspaces}
        selectedWorkspace={selectedWorkspace}
        onWorkspaceSelect={setSelectedWorkspace}
        onCreateWorkspace={() => setWsModalOpen(true)}
        onDeleteWorkspace={async (id) => {
          await deleteWorkspace(id);
          if (selectedWorkspace === id) setSelectedWorkspace(null);
        }}
      />
      <div
        className={`min-h-screen mt-16 lg:mt-0 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"
          }`}
      >

        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          onContentAdded={() => {
            refresh();
          }}
          workspaces={workspaces}
          defaultWorkspaceId={selectedWorkspace}
        />

        <CreateWorkspaceModal
          open={wsModalOpen}
          onClose={() => setWsModalOpen(false)}
          onCreate={async (name, color) => {
            await createWorkspace(name, color);
          }}
        />

        {expandedItem && (
          <ContentDetailModal
            open={!!expandedItem}
            onClose={() => setExpandedItem(null)}
            id={expandedItem._id}
            title={expandedItem.title}
            content={expandedItem.content ?? ""}
            type={expandedItem.type ?? ""}
            link={expandedItem.link ?? ""}
            tags={expandedItem.tags}
            onUpdated={() => {
              refresh();
              setExpandedItem(null);
            }}
          />
        )}

        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-2xl">
              <SearchBar value={query} onChange={setQuery} placeholder="Search your brain..." />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="a-z">Title A → Z</option>
                <option value="z-a">Title Z → A</option>
              </select>

              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                  title="Grid view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
                  title="List view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              <ButtonCustom
                onClick={() => setModalOpen(true)}
                varient="primary"
                text="Add"
                icon={<PlusIcon />}
              />
              <ButtonCustom
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    const response = await axios.post(
                      `${BACKEND_URL}/api/v1/brain/share`,
                      { share: true },
                      { headers: { Authorization: token } }
                    );
                    const shareUrl = `${window.location.origin}/brain/${response.data.hash}`;
                    handleCopy(shareUrl);
                  } catch (error) {
                    console.error("error", error);
                  }
                }}
                varient="secondary"
                text="Share"
                icon={<ShareIcon />}
              />
            </div>
          </div>

          {activeTag && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-gray-500">Filtering by tag:</span>
              <span className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-full">
                #{activeTag}
                <button
                  onClick={() => setActiveTag(null)}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            </div>
          )}
        </div>
        <div className="px-6 py-8">
          {searchLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              {displayed.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {query ? "No results found" : "Your brain is empty"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {query ? "Try a different search term" : "Start by adding your first content"}
                  </p>
                  {!query && (
                    <ButtonCustom
                      onClick={() => setModalOpen(true)}
                      varient="primary"
                      text="Add your first content"
                      icon={<PlusIcon />}
                    />
                  )}
                </div>
              ) : (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayed.map((item) => {
                      const { type, link, title, content, tags, _id, isPinned, createdAt } = item;

                      return (
                        <div key={_id} className="h-full">
                          <Card
                            id={_id}
                            title={title}
                            type={type}
                            link={link ?? ""}
                            content={content ?? ""}
                            tags={tags}
                            isPinned={isPinned}
                            createdAt={createdAt}
                            onDelete={() => refresh()}
                            onExpand={() => setExpandedItem(item)}
                            onPin={handlePin}
                            onTagClick={(tag) => setActiveTag(prev => prev === tag ? null : tag)}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {displayed.map((item) => {
                      const { type, title, tags, _id, isPinned, createdAt } = item;
                      return (
                        <div
                          key={_id}
                          onClick={() => setExpandedItem(item)}
                          className={`group flex items-center gap-4 px-4 py-3 rounded-lg border bg-white hover:shadow-md transition-all cursor-pointer ${isPinned ? "border-amber-300 ring-1 ring-amber-100" : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                          {isPinned && (
                            <svg className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                              <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                            </svg>
                          )}

                          <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                            {type === "youtube" ? <Youtube /> : type === "twitter" ? <XIcon /> : type === "link" ? <ShareLink /> : <DocIcon />}
                          </div>

                          <span className="text-sm font-medium text-gray-900 flex-1 truncate">{title}</span>

                          {tags && tags.length > 0 && (
                            <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                              {tags.slice(0, 3).map((tag: string, i: number) => (
                                <button
                                  key={i}
                                  onClick={(e) => { e.stopPropagation(); setActiveTag(prev => prev === tag ? null : tag); }}
                                  className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded font-medium hover:bg-gray-900 hover:text-white transition-colors"
                                >
                                  #{tag}
                                </button>
                              ))}
                              {tags.length > 3 && <span className="text-xs text-gray-400">+{tags.length - 3}</span>}
                            </div>
                          )}

                          <span className="text-xs text-gray-400 capitalize flex-shrink-0 hidden md:block">{type}</span>

                          <span className="text-xs text-gray-400 flex-shrink-0 hidden md:block w-20 text-right">
                            {createdAt ? new Date(createdAt).toLocaleDateString() : ""}
                          </span>

                          <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                            <button
                              onClick={(e) => { e.stopPropagation(); handlePin(_id); }}
                              className={`p-1.5 rounded-md transition-colors ${isPinned ? "text-amber-500" : "text-gray-400 hover:text-amber-500"}`}
                              title={isPinned ? "Unpin" : "Pin"}
                            >
                              <svg className="w-3.5 h-3.5" fill={isPinned ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                              </svg>
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); axios.delete(`${BACKEND_URL}/api/v1/content/${_id}`, { headers: { Authorization: localStorage.getItem("token") } }).then(() => refresh()); }}
                              className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

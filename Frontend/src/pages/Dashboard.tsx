import { ButtonCustom } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/ContentModal";
import { ContentDetailModal } from "../components/ContentDetailModal";
import { useState } from "react";
import { SideBar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { BACKEND_URL } from "../components/config";
import { showCopyToast } from "../components/CopyToast";
import Navbar from "../components/Navbar";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [expandedItem, setExpandedItem] = useState<any | null>(null);
  const token = localStorage.getItem("token");

  const { results: searchResults, loading: searchLoading } = useDebouncedSearch(query, token, 300);

  const { contents, refresh } = useContent();
  const dataToDisplay =
    query.trim().length > 0
      ? searchResults || []
      : contents || [];

  const displayed = dataToDisplay.filter(
    (item: any) => !filter || item.type === filter
  );

  function handleFilterSelect(type: string) {
    setFilter(prev => (prev === type ? null : type));
  }

  async function handleCopy(text: string) {
    await navigator.clipboard.writeText(text);
    showCopyToast();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="block lg:hidden">
        <Navbar />
      </div>
      <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onFilterSelect={handleFilterSelect} selectedType={filter} />
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
        />

        {expandedItem && (
          <ContentDetailModal
            open={!!expandedItem}
            onClose={() => setExpandedItem(null)}
            id={expandedItem._id}
            title={expandedItem.title}
            content={expandedItem.content}
            type={expandedItem.type}
            link={expandedItem.link}
            tags={expandedItem.tags}
            onUpdated={() => {
              refresh();
              setExpandedItem(null);
            }}
          />
        )}

        {/* Modern TOP BAR */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search on left */}
            <div className="flex-1 max-w-2xl">
              <SearchBar value={query} onChange={setQuery} placeholder="Search your brain..." />
            </div>

            {/* Action Buttons on right */}
            <div className="flex gap-3">
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
        </div>
        {/* Content Grid */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayed.map((item) => {
                    const { type, link, title, content, tags, _id } = item;

                    return (
                      <div key={_id} className="h-fit">
                        <Card
                          id={_id}
                          title={title}
                          type={type}
                          link={link}
                          content={content}
                          tags={tags}
                          onDelete={() => refresh()}
                          onExpand={() => setExpandedItem(item)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}

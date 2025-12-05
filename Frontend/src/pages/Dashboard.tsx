import { ButtonCustom } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/ContentModal";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [query, setQuery] = useState("");
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
    <div>
      <div className="block lg:hidden">
        <Navbar />
      </div>
      <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onFilterSelect={handleFilterSelect} selectedType={filter} />
      <div
        className={`min-h-screen mt-16 lg:mt-0 bg-white px-4 py-6 transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : "lg:ml-16"
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

        {/* TOP BAR: Search on left, Buttons on right */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">

          {/* Search box */}
          <div className="w-full sm:flex-1 sm:max-w-md">
            <SearchBar value={query} onChange={setQuery} placeholder="Search notes..." />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 sm:gap-4">
            <ButtonCustom
              onClick={() => setModalOpen(true)}
              varient="primary"
              text="Add content"
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
              text="Share brain"
              icon={<ShareIcon />}
            />
          </div>
        </div>
        <div className="pt-8">
          {searchLoading ? (
            <div className="text-center text-gray-500 py-8">Searching...</div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
              {displayed.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  {query ? "No results found" : "No content yet"}
                </div>
              ) : (
                displayed.map((item) => {
                  const { type, link, title, content, tags, _id } = item;

                  return (
                    <div key={_id} className="mb-4 break-inside-avoid-column">
                      <Card
                        id={_id}
                        title={title}
                        type={type}
                        link={link}
                        content={content}
                        tags={tags}
                        onDelete={() => refresh()}
                      />
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;

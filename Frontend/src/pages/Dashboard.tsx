import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/ContentModal";
import { useEffect, useState } from "react";
import { SideBar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../components/config";
import { showCopyToast } from "../components/CopyToast";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { contents, refresh } = useContent();

  async function handleCopy(text: string) {
    await navigator.clipboard.writeText(text);
    showCopyToast();
  }
  useEffect(() => {
    refresh();
  }, [modalOpen]);

  return (
    <div>
      <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div 
      className={`min-h-screen bg-white p-4 transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-16"}`}>
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            varient="primary"
            text="Add content"
            icon={<PlusIcon />}
          />
          <Button
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  {
                    share: true,
                  },
                  {
                    headers: {
                      Authorization: token,
                    },
                  }
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
        <div className="pt-8 ">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 ">
            {contents.map(({ type, link, title, tags, _id }) => (
              <div key={_id} className="break-inside-avoid mb-4">
                <Card 
                  id={_id} 
                  title={title} 
                  type={type} 
                  link={link} 
                  tags={tags}
                  onDelete={() => {
                    refresh();
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

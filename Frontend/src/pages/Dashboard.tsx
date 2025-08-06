import { ButtonCustom } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/ContentModal";
import { useState } from "react";
import { SideBar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../components/config";
import { showCopyToast } from "../components/CopyToast";
import { isMobile } from "react-device-detect";
import Navbar from "../components/Navbar";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { contents, refresh } = useContent();

  async function handleCopy(text: string) {
    await navigator.clipboard.writeText(text);
    showCopyToast();
  }

  return (
    <div>
      <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      {isMobile && (
        <Navbar />
      )}
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
        <div className="flex justify-center lg:justify-end gap-4">
          <ButtonCustom
            onClick={() => {
              setModalOpen(true);
            }}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {contents.map((item) => {
              const { type, link, title, content, tags, _id } = item;
              return (
                <div key={_id} className="break-inside-avoid mb-4">
                  <Card
                    id={_id}
                    title={title}
                    type={type}
                    link={link}
                    content={content}
                    tags={tags}
                    onDelete={() => {
                      refresh();
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

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
export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  useEffect(() => {
    refresh();

  }, [modalOpen, refresh]);
  return (
    <div>
      <SideBar />
      <div className="min-h-screen bg-white p-4 ml-72">
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
                if (!token) {
                  throw new Error("No authentication token found");
                }

                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  { share: true },
                  {
                    headers: {
                      Authorization: token,
                    },
                  }
                );

                const shareUrl = `${window.location.origin}/api/v1/brain/share/${response.data.hash}`;

                await navigator.clipboard.writeText(shareUrl);
              } catch (error) {
                console.error("Failed to share brain:", error);
              }
            }}
            varient="secondary"
            text="Share brain"
            icon={<ShareIcon />}
          />{" "}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
          {contents.map(({ type, link, title, tags }, index) => (
            <Card
              key={`${title}-${index}`}
              title={title}
              type={type}
              link={link}
              tags={tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

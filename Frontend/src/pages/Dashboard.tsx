import { Button } from "../components/Button"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/ContentModal"
import { useEffect, useState } from "react"
import { SideBar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import axios from "axios"
import { BACKEND_URL } from "../components/config"
import { showCopyToast } from "../components/CopyToast"

export function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  async function handleCopy(text:string) {
      await navigator.clipboard.writeText(text);
      showCopyToast();
  }



  useEffect(() => {
    refresh();

  }, [modalOpen]);

  return (
    <div>
      <SideBar />
      <div className="min-h-screen bg-white p-4 ml-72">
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false);
        }} />
        <div className="flex justify-end gap-4">
          <Button onClick={() => {
            setModalOpen(true);
          }} varient="primary" text="Add content" icon={<PlusIcon />} />
          <Button onClick={
            async () => {
            try {
              const token = localStorage.getItem("token");
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
              share: true
            }, {
              headers: {
                "Authorization": token
              }
            });
            const shareUrl = `http://localhost:5173/api/v1/brain/share/${response.data.hash}`;
            handleCopy(shareUrl); 
          } catch(error){
            console.error("error", error);
          }
          }} 
          varient="secondary" text="Share brain" icon={< ShareIcon />} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
          {contents.map(({ type, link, title, tags }) => {
            return <Card
              title={title}
              type={type}
              link={link}
              tags={tags}
            />
          })}


        </div>



      </div>
    </div>

  )
}

export default Dashboard

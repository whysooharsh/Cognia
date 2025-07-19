import { Button } from "./components/Button"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"
import { Card } from "./components/Card"
import { CreateContentModal } from "./components/ContentModal"
import { useState } from "react"
import { SideBar } from "./components/Sidebar"
function App() {

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <SideBar/>
      <div className="min-h-screen bg-white p-4 ml-72">
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false);
        }} />
        <div className="flex justify-end gap-4">
          <Button onClick={() => {
            setModalOpen(true);
          }} varient="primary" text="Add content" icon={<ShareIcon />} />
          <Button varient="secondary" text="Share brain" icon={<PlusIcon />} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
          <Card
            title="Peaceful Tweet"
            type="twitter"
            link="https://x.com/whysooharsh/status/1940243863488405659"
            tags={["sunrise", "mindset"]}
          />

          <Card
            title="Cool Video"
            type="youtube"
            link="https://www.youtube.com/embed/7ExE8DkcOzE"
            tags={["music", "calm"]}
          />
          <Card
            title="Deep Thought"
            type="twitter"
            link="https://twitter.com/whysooharsh/status/1892672134888997340"
            tags={["poetry", "feels"]}
          />


        </div>



      </div>
    </div>

  )
}

export default App

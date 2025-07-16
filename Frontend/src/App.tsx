import { Button } from "./components/Button"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"
import { Card } from "./components/Card"
import { CreateContentModal } from "./components/ContentModal"
function App() {


  return (
    <div className="min-h-screen bg-zinc-900 p-4">
      <CreateContentModal open={false}/>
      <div className="flex justify-end gap-4">


        <Button varient="primary" text="Add content" icon={<ShareIcon />} />
        <Button varient="secondary" text="Share brain" icon={<PlusIcon />} />
      </div>
      <div className="flex gap-4">
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

  )
}

export default App

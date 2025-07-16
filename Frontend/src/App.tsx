import { Button } from "./components/Button"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"
import { Card } from "./components/Card"
function App() {


  return (
    <div className="min-h-screen bg-zinc-900 flex gap-8">
      <Button varient="primary" text="Add content" icon={<ShareIcon />} />
      <Button varient="secondary" text="Share brain" icon={<PlusIcon />} />
      <Card
        title="Peaceful Tweet"
        type="twitter"
        link="https://x.com/whysooharsh/status/1940243863488405659"
        tags={["sunrise", "mindset"]}
      />

      <Card
        title="Cool Video"
        type="youtube"
        link="https://www.youtube.com/watch?v=gA6r7iVzP6M"
        tags={["learning", "inspiration"]}
      />

      <Card
        title="My Todo"
        type="todo"
        link=""
        tasks={[
          "Build a personal knowledge base",
          "Create a habit tracker",
          "Design a minimalist todo app",
        ]}
        tags={["tasks", "planning"]}
      />


    </div>

  )
}

export default App

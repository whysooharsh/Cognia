import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import Home from "./pages/LandingPage"
import SharedBrain from "./pages/SharedBrain"
import { ProtectedRoute } from "./components/ProtectedRoute"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={
          <ProtectedRoute >
            <Dashboard/>
          </ProtectedRoute>
          } />
        <Route path="/brain/:shareLink" element={<SharedBrain/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App



// react hook forms, react query, swr 
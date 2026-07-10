import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "./components";
import { Dashboard, LandingPage, SharedBrain, Signin, Signup } from "./pages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
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
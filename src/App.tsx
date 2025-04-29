import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { Root } from "./pages/Root.tsx";
import { Home } from "./pages/Home.tsx";
import { Login } from "./pages/Login.tsx";
import { SecretPage } from "./pages/SecretPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/secrets"
          element={
            <ProtectedRoute>
              <SecretPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

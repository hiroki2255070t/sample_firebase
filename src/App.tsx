import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { SecretPage } from "./pages/SecretPage.tsx";
import { Root } from "./pages/Root.tsx";
import { Login } from "./pages/Login.tsx";
import { Home } from "./pages/Home.tsx";
import { Header } from "./components/Header.tsx";
import { Search } from "./pages/Search.tsx";
import { HistoryPage } from "./pages/History.tsx";
import { JobPage } from "./pages/Job/JobPage.tsx";
import { JobDetail } from "./pages/Job/JobDetail.tsx";
import { Books } from "./pages/Book/Books.tsx";
import { BookDetail } from "./pages/Book/BookDetail.tsx";
import { HobbyPage } from "./pages/Hobby/HobbyPage.tsx";
import { HobbyDetail } from "./pages/Hobby/HobbyDetail.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/detail/:id" element={<BookDetail />} />
        <Route path="/hobby" element={<HobbyPage />} />
        <Route path="/hobby/detail/:id" element={<HobbyDetail />} />
        <Route path="/job" element={<JobPage />} />
        <Route path="/job/detail/:id" element={<JobDetail />} />
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

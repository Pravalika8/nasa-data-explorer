import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ApodPage from "./pages/ApodPage";
import ApodDetailPage from "./pages/ApodDetailPage";
import NasaMedia from "./pages/NasaMedia";
import NeoPage from "./pages/NeoPage";
import EpicPage from "./pages/EpicPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/apod" element={<ApodPage />} />
            <Route path="/apod/:date" element={<ApodDetailPage />} />
            <Route path="/neo" element={<NeoPage />} />
            <Route path="/media" element={<NasaMedia />} />
            <Route path="/epic" element={<EpicPage />} />
        </Routes>
    );
}

export default AppRoutes;
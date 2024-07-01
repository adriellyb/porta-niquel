import { Route, BrowserRouter, Routes } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Cadastro from "../pages/Cadastro/Cadastro";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../components/NotFound";

function AppRoutes () {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
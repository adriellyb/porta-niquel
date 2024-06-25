import { Route, BrowserRouter, Routes } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Cadastro from "../pages/Cadastro/Cadastro";

function AppRoutes () {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
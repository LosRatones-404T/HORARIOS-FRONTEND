import { BrowserRouter, Routes, Route } from "react-router-dom";

//Importar las vistas

import Login from "../pages/Login";
import Error from "../pages/Error";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Error/>} />
            </Routes>
        </BrowserRouter>
    );
}       

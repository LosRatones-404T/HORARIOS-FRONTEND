import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Páginas 
import Login from "../screens/Login";
import NotFound from "../screens/NotFound";



export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/*Ruta de Login*/}
                <Route path="/" element={<Login />} />


                {/*Ruta de página de Error 404 - Redirección a Login*/ }
                <Route path="*" element={< NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
}
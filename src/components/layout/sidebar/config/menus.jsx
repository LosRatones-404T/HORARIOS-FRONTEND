import { MdDashboard } from "react-icons/md";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import { IoBook } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";

export const menuOptions = {
  admin: [
    { label: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
    { label: "Profesores", icon: <FaUsers />, path: "/profesores" },
    { label: "Materias", icon: <IoBook />, path: "/materias" },
  ],
  
  jefe: [
    { label: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
    { label: "Generar", icon: <IoMdAddCircle />, path: "/generar" },
    { label: "Horarios", icon: <FaCalendarAlt />, path: "/horarios" },
  ],
  
  secretaria: [
    { label: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
    { label: "Horarios", icon: <FaCalendarAlt />, path: "/horarios" },
  ],
};

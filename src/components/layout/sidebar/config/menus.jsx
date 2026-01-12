import {FiHome} from "react-icons/fi"; //Icono de Home
import {LuUser} from "react-icons/lu"; //Icono de Usuario
import { GiBookshelf } from "react-icons/gi"; //Icono de Materias
import { LuSchool } from "react-icons/lu";  //Icono de Aulas
import { TbCalendarCheck } from "react-icons/tb"; //Icono de Horarios
import { LuSettings } from "react-icons/lu"; //Icono de Configuración
import { LuCalendarCog } from "react-icons/lu"; //Icono de Generar Exámenes
import { MdOutlineGrade } from "react-icons/md"; //Icono de Preferencias


export const menuOptions = {
  admin: [
    { label: "Dashboard", icon: <FiHome/>, path: "/dashboard" },
    { label: "Profesores", icon: <LuUser/>, path: "/profesores" },
    { label: "Materias", icon: <GiBookshelf/>, path: "/materias" },
    { label: "Aulas", icon: <LuSchool/>, path: "/aulas" },
    { label: "Horarios", icon: <TbCalendarCheck/>, path: "/horarios" },
    { label: "Preferencias", icon: <MdOutlineGrade/>, path: "/preferencias" },
    { label: "Ajustes", icon: <LuSettings/>, path: "/configuracion" },
  ],
  
  jefe: [
    { label: "Dashboard", icon: <FiHome/>, path: "/dashboard" },
    { label: "Generar", icon: <LuCalendarCog/>, path: "/generar" },
    { label: "Horarios", icon: <TbCalendarCheck/>, path: "/horarios" },
    { label: "Preferencias", icon: <MdOutlineGrade/>, path: "/preferencias" },
    { label: "Ajustes", icon: <LuSettings/>, path: "/configuracion" },
  ],
  
  secretaria: [
    { label: "Dashboard", icon: <FiHome/>, path: "/dashboard" },
    { label: "Generar", icon: <LuCalendarCog/>, path: "/generar" },
    { label: "Horarios", icon: <TbCalendarCheck/>, path: "/horarios" }, 
    { label: "Preferencias", icon: <MdOutlineGrade/>, path: "/preferencias" },
    { label: "Ajustes", icon: <LuSettings/>, path: "/configuracion" },
  ],
};

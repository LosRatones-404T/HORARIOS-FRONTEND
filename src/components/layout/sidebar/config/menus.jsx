import {FiHome} from "react-icons/fi"; //Icono de Home
import {LuUser} from "react-icons/lu"; //Icono de Usuario
import { LuCalendarCog } from "react-icons/lu"; //Icono de Generar Exámenes
import { MdOutlineGrade } from "react-icons/md"; //Icono de Preferencias
import { MdCalendarMonth } from "react-icons/md"; //Icono de Calendario
import { MdRateReview } from "react-icons/md"; //Icono de Revisión
import { MdSettings } from "react-icons/md"; //Icono de Período Académico


export const menuOptions = {
  admin: [
    { label: "Home", icon: <FiHome/>, path: "/home" },
    { label: "Usuarios", icon: <LuUser/>, path: "/usuarios" },
  ],
  
  jefe: [
    { label: "Home", icon: <FiHome/>, path: "/home" },
    { label: "Preferencias", icon: <MdOutlineGrade/>, path: "/preferencias" },
    { label: "Generar", icon: <LuCalendarCog/>, path: "/generar" },
    { label: "Calendario", icon: <MdCalendarMonth/>, path: "/calendario" },
  ],
  
  escolares: [
    { label: "Home", icon: <FiHome/>, path: "/home" },
    { label: "Período Académico", icon: <MdSettings/>, path: "/periodo-academico" },
    { label: "Revisión", icon: <MdRateReview/>, path: "/revision" },
    { label: "Calendario", icon: <MdCalendarMonth/>, path: "/calendario" },
  ],
};

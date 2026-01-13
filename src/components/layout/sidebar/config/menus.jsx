import {FiHome} from "react-icons/fi"; //Icono de Home
import {LuUser} from "react-icons/lu"; //Icono de Usuario
import { GiBookshelf } from "react-icons/gi"; //Icono de Materias
import { LuSchool } from "react-icons/lu";  //Icono de Aulas
import { TbCalendarCheck } from "react-icons/tb"; //Icono de Horarios
import { LuSettings } from "react-icons/lu"; //Icono de Configuración
import { LuCalendarCog } from "react-icons/lu"; //Icono de Generar Exámenes
import { MdOutlineGrade } from "react-icons/md"; //Icono de Preferencias
import { MdCalendarMonth } from "react-icons/md"; //Icono de Calendario
import { MdRateReview } from "react-icons/md"; //Icono de Revisión


export const menuOptions = {
  admin: [
    { label: "Home", icon: <FiHome/>, path: "/home" },
    { label: "Profesores", icon: <LuUser/>, path: "/profesores" },
    { label: "Aulas", icon: <LuSchool/>, path: "/aulas" },
    { label: "Materias", icon: <GiBookshelf/>, path: "/materias" },
  ],
  
  jefe: [
    { label: "Home", icon: <FiHome/>, path: "/home" },
    { label: "Preferencias", icon: <MdOutlineGrade/>, path: "/preferencias" },
    { label: "Generar", icon: <LuCalendarCog/>, path: "/generar" },
    { label: "Calendario", icon: <MdCalendarMonth/>, path: "/calendario" },
  ],
  
  secretaria: [
    { label: "Home", icon: <FiHome/>, path: "/home" },
    { label: "Revisión", icon: <MdRateReview/>, path: "/revision" },
    { label: "Calendario", icon: <MdCalendarMonth/>, path: "/calendario" },
  ],
};

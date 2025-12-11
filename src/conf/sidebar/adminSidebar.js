import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";

export const adminSidebar = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Profesores", icon: <GroupIcon />, path: "/profesores" },
  { label: "Materias", icon: <SchoolIcon />, path: "/materias" },
];

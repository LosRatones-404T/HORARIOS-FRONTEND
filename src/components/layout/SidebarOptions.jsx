import { Stack } from "@mui/material";
import SidebarOptionButton from "../../common/buttons/SidebarOptionButton";

export default function SidebarOptions({ collapsed, options }) {
  return (
    <Stack spacing={1} px={2}>
      {options.map((item, index) => (
        <SidebarOptionButton
          key={index}
          icon={item.icon}
          label={item.label}
          collapsed={collapsed}
          onClick={() => console.log("Ir a:", item.path)}
        />
      ))}
    </Stack>
  );
}

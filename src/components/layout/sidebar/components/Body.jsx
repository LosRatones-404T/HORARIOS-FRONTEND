import { Stack } from "@mui/material";
import OptionButton from "./OptionButton.jsx";

export default function Body({ collapsed, options }) {
  return (
    <Stack spacing={1} px={2}>
      {options.map((item, index) => (
        <OptionButton
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

import { Stack, Paper } from "@mui/material";
import OptionButton from "./OptionButton.jsx";

export default function Body({ collapsed, options }) {
  return (
    <Paper
      elevation={2}
      sx={{
        flex: 1,
        bgcolor: "background.paper",
        borderRadius: 0,
        overflow: "auto",
      }}
    >
      <Stack spacing={2} px={2} mt={3} pb={3}>
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
    </Paper>
  );
}

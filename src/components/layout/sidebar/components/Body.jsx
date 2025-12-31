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
      <Stack 
        spacing={{ xs: 1.5, sm: 2 }} 
        px={{ xs: 1.5, sm: 2 }} 
        mt={{ xs: 2, sm: 3 }} 
        pb={{ xs: 2, sm: 3 }}
      >
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

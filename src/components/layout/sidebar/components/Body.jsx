import { Stack, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OptionButton from "./OptionButton.jsx";

export default function Body({ collapsed, options }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        bgcolor: "background.default",
        borderRadius: 0,
        overflow: "auto",
      }}
    >
      <Stack 
        spacing={{ xs: 1.5, sm: 2 }} 
        px={{ xs: 2, sm: 2.5 }} 
        py={{ xs: 2.5, sm: 3 }}
      >
        {options.map((item, index) => (
          <OptionButton
            key={`${item.path}-${item.label}`}
            icon={item.icon}
            label={item.label}
            path={item.path}
            collapsed={collapsed}
            onClick={() => handleNavigation(item.path)}
          />
        ))}
      </Stack>
    </Paper>
  );
}

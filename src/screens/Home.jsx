import { Sidebar, menuOptions } from "../components/layout/sidebar";
import { Box } from "@mui/material";

function Home() {
    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar menu={menuOptions.admin} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <h1>Home Page</h1>
            </Box>
        </Box>
    );
}

export default Home;
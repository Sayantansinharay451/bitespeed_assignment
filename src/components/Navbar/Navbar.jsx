import { Button, Toolbar, useTheme } from "@mui/material";

const Navbar = () => {
    const theme = useTheme();
    console.log(theme);
    return (
        <Toolbar
            sx={{
                background: (theme) => theme.palette.white.dark,
                boxShadow: (theme) => theme.shadows[1],
            }}
        >
            <Button
                sx={{
                    margin: "auto 2rem",
                    marginLeft: "auto",
                    textTransform: "none",
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    background: "#fff",
                    borderWidth: "0.2rem",
                    borderRadius: "0.5rem",
                    padding: "0.2rem 1.5rem",
                }}
                disableRipple
                aria-details="Save the chat flow"
                variant="outlined"
                color="blue"
            >
                Save Changes
            </Button>
        </Toolbar>
    );
};

export default Navbar;

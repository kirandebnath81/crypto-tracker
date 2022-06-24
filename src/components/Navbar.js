import React, { useContext } from "react";

//mui
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

//component
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./sidebar/UserSidebar";

//router
import { Link } from "react-router-dom";

//context
import { CryptoContext } from "../context/Context";

//select styling
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1.5px solid #ced4da",
    fontSize: 16,
    padding: "6px 26px 6px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: "Montserrat",
    fontWeight: "bold",
  },
}));

const Navbar = () => {
  const { currency, setCurrency, user } = useContext(CryptoContext);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontFamily: "Montserrat", fontWeight: "bold", color: "gold" }}
        >
          <Link to="/">Crypto Tracker</Link>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ minWidth: 90 }} mr={2}>
            <FormControl fullWidth size="small">
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={currency}
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {user ? <UserSidebar /> : <AuthModal />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

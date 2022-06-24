import { useContext, useState } from "react";

//mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";

//components
import Login from "./Login";
import Signup from "./Signup";

//context
import { CryptoContext } from "../../context/Context";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: 450,
};

export default function AuthModal() {
  const { open, setOpen } = useContext(CryptoContext);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>LOGIN</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={styles}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: "rgb(32, 32, 33)",
                padding: "0px 50px",
              }}
            >
              <Tabs value={value} onChange={handleChange}>
                <Tab value="1" label="LOGIN" sx={{ width: "50%" }} />
                <Tab value="2" label="SIGNUP " sx={{ width: "50%" }} />
              </Tabs>
            </Box>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: "rgb(32, 32, 33)",
              }}
            >
              <TabPanel value="1">
                <Login />
              </TabPanel>
              <TabPanel value="2">
                <Signup />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
}

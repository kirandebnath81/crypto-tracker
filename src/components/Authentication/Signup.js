import React, { useContext, useState } from "react";

import { toast } from "react-toastify";

//mui
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

//icon
import { FcGoogle } from "react-icons/fc";

//firebase
import { auth } from "../../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

//context
import { CryptoContext } from "../../context/Context";

const Signup = () => {
  const { setOpen } = useContext(CryptoContext);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const { email, password, confirmPassword } = userData;

    if (!email || !password || !confirmPassword) {
      toast.warning("Please fill the fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Password do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success(`Sign up successfully`, { theme: "colored" });
      setOpen(false);
    } catch (error) {
      toast.error(error.message, { theme: "colored" });
    }
  };

  const googleSubmit = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      setOpen(false);
      toast.success(`Sign in successfully`, { theme: "colored" });
    } catch (error) {
      toast.error(error.message, { theme: "colored" });
    }
  };

  return (
    <div>
      <TextField
        sx={{ marginBottom: 3 }}
        fullWidth
        type="email"
        label="Email"
        variant="outlined"
        name="email"
        value={userData.email}
        onChange={changeHandler}
      ></TextField>
      <TextField
        sx={{ marginBottom: 3 }}
        fullWidth
        type="password"
        label="Password"
        variant="outlined"
        name="password"
        value={userData.password}
        onChange={changeHandler}
      ></TextField>
      <TextField
        sx={{ marginBottom: 3 }}
        fullWidth
        type="password"
        label="Confirmed Password"
        variant="outlined"
        name="confirmPassword"
        value={userData.confirmPassword}
        onChange={changeHandler}
      ></TextField>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "120px",
        }}
      >
        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "gold" }}
        >
          signup
        </Button>
        <span>OR</span>
        <Button
          startIcon={<FcGoogle />}
          fullWidth
          color="primary"
          variant="contained"
          onClick={googleSubmit}
          sx={{ color: "black", backgroundColor: "white" }}
        >
          SIGN UP WITH GOOGLE
        </Button>
      </Box>
    </div>
  );
};

export default Signup;

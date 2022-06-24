import React, { useContext, useState } from "react";

import { toast } from "react-toastify";

//mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

//icon
import { FcGoogle } from "react-icons/fc";

//firebase
import { auth } from "../../config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

//context
import { CryptoContext } from "../../context/Context";

const Login = () => {
  const { setOpen } = useContext(CryptoContext);

  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setLoginInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { email, password } = loginInput;

    if (!email || !password) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
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
        variant="outlined"
        type="text"
        fullWidth
        label="Enter Email"
        sx={{ marginBottom: 3 }}
        name="email"
        onChange={changeHandler}
      ></TextField>
      <TextField
        variant="outlined"
        fullWidth
        type="password"
        label="Enter Password"
        sx={{ marginBottom: 3 }}
        name="password"
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
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "gold" }}
          onClick={handleSubmit}
        >
          login
        </Button>
        <span>OR</span>
        <Button
          startIcon={<FcGoogle />}
          fullWidth
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

export default Login;

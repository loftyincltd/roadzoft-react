import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Logo from "../assets/images/logo.png";
import { API_BASE } from "../utils/Api";
import {useHistory} from 'react-router-dom'

export default function Login() {
  const history = useHistory()
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    console.log(email)
    console.log(password)
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: email,
        password: password,
        auth_type: "phone",
      }),
    });
    const result = await response.json();
    if (result) {
      localStorage.setItem("token", result.access_token)
      localStorage.setItem("user", result.data.id)
      history.push("/dashboard")
    }
    console.log("Login", result);
  };

  return (
    <div className="login-container flex justify-center items-center">
      <div className="overlay p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space">
        <div className="flex flex-col justify-between items-center mb-5">
          <img src={Logo} width="90" alt="Ferma Logo" />
          <h2 className="text-3xl font-bold my-2">ROADZOFT</h2>
          <h4>FERMA Monotoring and Evaluation Portal</h4>
        </div>
        <div className="flex flex-col justify-center items-center mb-5 w-full">
          <TextField
            className="w-full"
            onChange={(e) => setEmail(e.target.value)}
            required
            id="outlined-required"
            type="text"
            label="Satff ID"
            defaultValue="Phone Number"
          />
        </div>
        <div className="flex justify-center items-center mb-5 w-full">
          <TextField
            className="w-full"
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </div>
        <Button
          onClick={handleLogin}
          className="w-full bg-green-900 mb-3"
          color="success"
          variant="contained"
        >
          Log In
        </Button>
        <p className="my-5">Don't have an account? Contact Admin.</p>
      </div>
    </div>
  );
}

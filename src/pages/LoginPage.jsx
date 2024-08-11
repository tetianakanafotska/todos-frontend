import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "@context/authContext.jsx";
import authService from "@services/auth.service.js";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { signup } from "@/assets";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
        const errorDescription = error.response
          ? error.response.data.message
          : error.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Stack direction="row">
      <Box sx={{ height: "100vh", width: "30%" }}>
        <img
          src={signup}
          alt=""
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </Box>
      <Box
        ml="8%"
        mt="10%"
        sx={{
          width: {
            sx: "97%",
            sm: "40%",
            md: "33%",
            lg: "27%",
            xl: "20%",
          },
        }}
      >
        <Typography variant="h5" component="h1" mb="20px">
          Login to Todo
        </Typography>
        <Box component="form" display="flex" flexDirection="column">
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmail}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
          {errorMessage && (
            <Alert
              severity="error"
              onClose={() => {
                setErrorMessage(null);
              }}
            >
              {errorMessage}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="black"
            onClick={handleLoginSubmit}
            sx={{ padding: "11px 16px" }}
          >
            Login
          </Button>
        </Box>

        <Typography variant="body2" mt="20px" align="center">
          Don't have an account? <Link to="/signup">Sign up for free</Link>
        </Typography>
      </Box>
    </Stack>
  );
}

export default LoginPage;

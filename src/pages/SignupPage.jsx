import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "@services/auth.service";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { signup } from "@/assets";
import { Stack } from "@mui/material";

function SignupPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    authService
      .signup(data)
      .then((createdUser) => {
        console.log(createdUser), navigate("/login");
      })
      .catch((err) => {
        console.error("Error while creating a user", err);
        const errorDescription = err.response.data.message
          ? err.response.data.message
          : err.request.statusText;
        setErrorMessage(errorDescription);
      });
  };

  const handleOnChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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
            sx: "90%",
            sm: "30%",
            md: "27%",
            lg: "27%",
            xl: "20%",
          },
        }}
      >
        <Typography variant="h5" component="h1" mb="20px">
          Sign up to Todo
        </Typography>
        <Box component="form" display="flex" flexDirection="column">
          <TextField
            id="name"
            label="Name"
            type="text"
            variant="outlined"
            value={data.name}
            onChange={handleOnChange}
            required
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            value={data.email}
            onChange={handleOnChange}
            required
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={data.password}
            onChange={handleOnChange}
            required
          />
          {errorMessage && (
            <Alert
              severity="error"
              onClose={() => {
                setErrorMessage(null);
              }}
              sx={{ mb: "20px" }}
            >
              {errorMessage}
            </Alert>
          )}
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="black"
            sx={{ padding: "11px 16px" }}
          >
            Sign up
          </Button>
        </Box>

        <Typography variant="body2" mt="20px" align="center">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Stack>
  );
}

export default SignupPage;

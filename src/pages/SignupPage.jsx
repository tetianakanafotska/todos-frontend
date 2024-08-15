import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "@context/authContext.jsx";
import authService from "@services/auth.service";
import {
  Button,
  Alert,
  Typography,
  Box,
  Stack,
  TextField,
  CircularProgress,
} from "@mui/material";
import { signup } from "@/assets";
import { logoWhite } from "@/assets";

function SignupPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    authService
      .signup(data)
      .then((response) => {
        storeToken(response.data.authToken);
        return authenticateUser();
      })
      .then(() => {
        setLoading(false);
        navigate("/dashboard", { state: { newUser: true } });
      })
      .catch((err) => {
        console.error("Error while creating a user", err);
        const errorDescription = err.response.data.message
          ? err.response.data.message
          : err.request.statusText;
        setErrorMessage(errorDescription);
        setLoading(false);
      });
  };

  const handleOnChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <Stack direction="row" sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          width: "30%",
          height: "100vh",
          display: {
            xs: "none",
            lg: "block",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "100px",
            left: "40px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <img src={logoWhite} alt="Logo" width="170" loading="lazy" />
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "200",
            }}
          >
            Your personal productivity space
          </Typography>
        </Box>

        <img
          src={signup}
          alt=""
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          loading="lazy"
        />
      </Box>
      <Box
        sx={{
          m: {
            xs: "10% auto",
            lg: "10% 0 10% 8%",
          },
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
            {loading ? <CircularProgress size={25} /> : "Sign up"}
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

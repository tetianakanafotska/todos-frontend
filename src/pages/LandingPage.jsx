import React, { useRef } from "react";
import { Box, Container, Typography, Stack, Divider } from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { useNavigate } from "react-router-dom";
import { useTheme, alpha } from "@mui/material/styles";
import CustomButton from "@components/CustomButton";
import {
  bgBlack,
  bgGreen,
  logoWhite,
  logoBlack,
  mockup,
  dragscreen,
  tagsscreen,
} from "@/assets";

function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const featuresRef = useRef();

  return (
    <Box component="main" className="landing-page">
      <Box
        component="header"
        sx={{
          bgcolor: "primary.main",
        }}
      >
        <Stack component="nav">
          <Box sx={{ width: "100px" }}>
            <img src={logoWhite} alt="Logo" className="img-styling" />
          </Box>

          <CustomButton
            onClick={() => navigate("/login")}
            endIcon={<CallMadeIcon sx={{ fontSize: "17px !important" }} />}
          >
            Login
          </CustomButton>
        </Stack>

        <Box className="title">
          <Typography variant="h1" component="h1">
            Your personal productivity space — simple and free of fuss.
          </Typography>
          <Box sx={{ margin: "30px 0 50px" }}>
            <CustomButton
              onClick={() => navigate("/login")}
              color="white"
              variant="contained"
              endIcon={<CallMadeIcon sx={{ fontSize: "17px !important" }} />}
              styling={{ boxShadow: "0 0 4px 1px rgba(160, 160, 160, 0.3)" }}
            >
              Try now
            </CustomButton>
            <CustomButton
              onClick={() =>
                featuresRef.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              color="white"
              variant="outlined"
            >
              More
            </CustomButton>
          </Box>
        </Box>
        <Box sx={{ width: "80%" }}>
          <img
            src={mockup}
            alt="dashboard screenshot"
            className="img-styling"
          />
        </Box>
      </Box>

      <Box
        className="features"
        ref={featuresRef}
        sx={{
          pt: {
            xs: "5rem",
            sm: "11rem",
            md: "18rem",
            lg: "35rem",
          },
        }}
      >
        <Typography variant="h2" className="title">
          Designed for Individuals Like You
        </Typography>

        <Typography variant="h3" className="description" sx={{ mb: "70px" }}>
          Todo is crafted with the solo user in mind. No complicated setups, no
          team management — just you and your tasks.
        </Typography>
        <Box
          className="container"
          sx={{
            flexDirection: { xs: "column", sm: "column", lg: "row" },
          }}
        >
          <Container
            component="article"
            sx={{
              bgcolor: alpha(theme.palette.black.main, 1),
              color: "#fff",
            }}
          >
            <Typography variant="h3">Effortless Drag and Drop</Typography>
            <Typography className="description" sx={{ mb: "30px" }}>
              Organize tasks by dragging and dropping them into place. It's
              fast, intuitive, and gives you full control.
            </Typography>
            <CustomButton
              endIcon={<CallMadeIcon />}
              onClick={() => navigate("/dashboard")}
              color="white"
              variant="outlined"
              styling={{
                mb: "30px",
              }}
            >
              Try for free
            </CustomButton>
            <Box sx={{ width: "100%" }}>
              <img
                src={dragscreen}
                alt="drag and drop depiction"
                className="img-styling"
              />
            </Box>
          </Container>
          <Container
            component="article"
            sx={{
              backgroundImage: `url(${bgGreen})`,
              backgroundSize: "cover",
              color: "white.main",
              textShadow: "2px 2px 3px rgba(160, 160, 160, 0.15)",
            }}
          >
            <Typography variant="h3">Priority Tags for Clear Focus</Typography>
            <Typography className="description" sx={{ mb: "30px" }}>
              Quickly tag tasks as «High», «Medium», or «Low» to stay focused on
              what needs your attention first.
            </Typography>
            <CustomButton
              endIcon={<CallMadeIcon />}
              color="white"
              variant="outlined"
              onClick={() => navigate("/dashboard")}
              styling={{
                mb: "30px",
              }}
            >
              Try for free
            </CustomButton>
            <Box>
              <img
                src={tagsscreen}
                alt="tagging depiction"
                className="img-styling"
              />
            </Box>
          </Container>
        </Box>
      </Box>
      <Box
        className="features"
        sx={{
          m: "3% 5% 2%",
        }}
      >
        <Typography variant="h2" className="cta">
          It's easy to get started
        </Typography>
        <Typography
          className="description"
          sx={{ mt: "20px", maxWidth: "50rem !important" }}
        >
          Sign up and start organizing your tasks in seconds.
        </Typography>
        <CustomButton
          variant="contained"
          color="primary"
          endIcon={<CallMadeIcon />}
          onClick={() => navigate("/dashboard")}
          styling={{ m: "40px 0" }}
        >
          Try for free
        </CustomButton>
      </Box>
      <Divider />
      <Stack component="footer" direction="row" spacing={3}>
        <Box sx={{ width: "100px", ml: "7% !important" }}>
          <img src={logoBlack} alt="logo-black" className="img-styling" />
        </Box>
        <Typography variant="body2">By Tetiana Kanafotska</Typography>
      </Stack>
    </Box>
  );
}

export default LandingPage;

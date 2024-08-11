import React, { useRef } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { useNavigate } from "react-router-dom";
import { useTheme, alpha } from "@mui/material/styles";
import CustomButton from "@components/CustomButton";
import {
  bgBlack,
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

        {/* heading */}
        <Box className="title">
          <Typography variant="h2" component="h1">
            Your personal productivity space — simple and free of fuss.
          </Typography>
          <Box sx={{ margin: "30px 0 50px" }}>
            <CustomButton
              onClick={() => navigate("/dashboard")}
              color="white"
              variant="contained"
              endIcon={<CallMadeIcon sx={{ fontSize: "17px !important" }} />}
              sx={{ boxShadow: "0 0 4px 1px rgba(160, 160, 160, 0.3)" }}
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
          color: "black.main",
          mt: {
            xs: "5rem",
            sm: "15rem",
            md: "20rem",
            lg: "35rem",
          },
        }}
      >
        <Typography variant="h2">Features</Typography>

        <Typography className="description">
          Sleek design that keeps you focused on what matters. No clutter, no
          distractions — just a clean, intuitive space tailored for you.
        </Typography>
        <Box
          sx={{
            gap: "40px",
            display: "flex",
            flexDirection: { xs: "column", sm: "column", lg: "row" },
            m: "0 5%",
          }}
        >
          <Container
            sx={{
              backgroundImage: `url(${bgBlack})`,
              backgroundSize: "cover",
              p: "70px 8% !important",
              borderRadius: "20px",
              maxWidth: "700px !important",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" sx={{ textAlign: "center", mb: "30px" }}>
              Effortless Drag and Drop
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "200",
                fontSize: "1.1rem",
                mb: "30px",
              }}
            >
              Easily organize tasks by dragging and dropping them across your
              workflow. It's fast, intuitive, and keeps you in control.
            </Typography>
            <Button
              disableRipple
              endIcon={<CallMadeIcon />}
              onClick={() => navigate("/dashboard")}
              color="white"
              variant="outlined"
              size="large"
              sx={{
                textTransform: "none",
                fontWeight: "600",
                p: "12px 25px",
                mb: "30px",
              }}
            >
              Try for free
            </Button>
            <Box sx={{ width: "100%" }}>
              <img
                src={dragscreen}
                alt=""
                style={{ objectFit: "cover", width: "100%" }}
              />
            </Box>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: alpha(theme.palette.secondary.main, 0.1),
              //bgcolor: "primary.main",
              color: "black.main",
              p: "70px 8% !important",
              borderRadius: "20px",
              maxWidth: "700px !important",
              textShadow: "2px 2px 3px rgba(160, 160, 160, 0.15)",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                mb: "30px",
              }}
            >
              Priority Tags for Focused Workflow
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "200",
                fontSize: "1.1rem",
                mb: "30px",
              }}
            >
              Quickly tag tasks as "High," "Medium," or "Low" to stay focused on
              what needs your attention first.
            </Typography>
            <Button
              disableRipple
              endIcon={<CallMadeIcon />}
              color="black"
              variant="outlined"
              onClick={() => navigate("/dashboard")}
              size="large"
              sx={{
                textTransform: "none",
                fontWeight: "600",
                p: "12px 25px",
                mb: "30px",
              }}
            >
              Try for free
            </Button>
            <Box>
              <img
                src={tagsscreen}
                alt=""
                style={{
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </Box>
          </Container>
        </Box>
      </Box>
      <Divider />
      <Stack
        direction="row"
        spacing={3}
        sx={{
          height: "7rem",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Box sx={{ width: "100px", ml: "7% !important" }}>
          <img
            src={logoBlack}
            alt="logo-black"
            style={{ width: "100%", objectFit: "contain" }}
          />
        </Box>
        <Typography
          variant="body2"
          sx={{
            display: "block",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Created by Tetiana Kanafotska
        </Typography>
      </Stack>
    </Box>
  );
}

export default LandingPage;

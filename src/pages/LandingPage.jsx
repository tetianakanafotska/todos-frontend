import React, { useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  Grid,
  Container,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";
import mockup from "@/assets/mockup.png";
import dragscreen from "@/assets/dragscreen.png";
import tagsscreen from "@/assets/tagsscreen.png";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { useNavigate } from "react-router-dom";
import { useTheme, alpha, duration } from "@mui/material/styles";

function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const featuresRef = useRef();

  return (
    //landing page
    <Box>
      {/* hero */}
      <Box
        sx={{
          bgcolor: "primary.main",
          height: "100vh",
          p: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%", p: "10px 50px 0" }}
        >
          <Box sx={{ width: "100px" }}>
            <img
              src={logoWhite}
              alt="Logo"
              style={{ width: "100px", objectFit: "contain" }}
            />
          </Box>

          <Button
            onClick={() => navigate("/login")}
            disableRipple
            size="large"
            endIcon={<CallMadeIcon sx={{ fontSize: "17px !important" }} />}
            sx={{
              textTransform: "none",
              mr: "10px",
              p: "12px 25px",
              boxShadow: "none",
              bgcolor: "rgba(255, 255, 255, 0.15)",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
              color: "#fff",
            }}
          >
            Login
          </Button>
        </Stack>

        {/* heading */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "950px",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: "#fff",
              textAlign: "center",
              mt: "100px",
              fontWeight: "650",
              textShadow: "2px 2px 3px rgba(160, 160, 160, 0.2)",
            }}
          >
            Your personal productivity space — simple and free of fuss.
          </Typography>
          <Box sx={{ margin: "30px 0 50px" }}>
            <Button
              onClick={() => navigate("/dashboard")}
              disableRipple
              color="white"
              variant="contained"
              size="large"
              endIcon={<CallMadeIcon sx={{ fontSize: "17px !important" }} />}
              sx={{
                textTransform: "none",
                fontWeight: "600",
                mr: "10px",
                p: "12px 25px",
                boxShadow: "0 0 4px 1px rgba(160, 160, 160, 0.3)",
              }}
            >
              Try now
            </Button>
            <Button
              onClick={() =>
                featuresRef.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              disableRipple
              color="white"
              variant="outlined"
              size="large"
              sx={{
                textTransform: "none",
                fontWeight: "600",
                p: "12px 25px",
              }}
            >
              More
            </Button>
          </Box>
        </Box>
        <Box>
          <img src={mockup} alt="dashboard screenshot" width="1100px" />
        </Box>
      </Box>

      <Box
        ref={featuresRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#fff",
          mt: "550px",
          pb: "80px",
          color: "black.main",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: "30px",
            fontWeight: "800",
          }}
        >
          Features
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            maxWidth: "600px",
            mb: "60px",
            fontWeight: "200",
            fontSize: "1.1rem",
          }}
        >
          Sleek design that keeps you focused on what matters. No clutter, no
          distractions — just a clean, intuitive space tailored for you.
        </Typography>
        <Box
          sx={{
            gap: "40px",
            display: "flex",
            flexDirection: "row",
            m: "0 70px",
          }}
        >
          <Container
            sx={{
              //bgcolor: alpha(theme.palette.black.main, 0.1),
              bgcolor: "black.main",
              p: "70px 80px !important",
              borderRadius: "20px",
              maxWidth: "700px !important",
              //color: "black.main",
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
              workflow. It's intuitive, and keeps you in control.
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
              p: "70px 80px !important",
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
        spacing={5}
        sx={{
          height: "7rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100px", position: "absolute", left: "70px" }}>
          <img
            src={logoBlack}
            alt="logo-black"
            style={{ width: "100%", objectFit: "contain" }}
          />
        </Box>
        <Typography variant="body2" sx={{ display: "block" }}>
          Created by Tetiana Kanafotska
        </Typography>
      </Stack>
    </Box>
  );
}

export default LandingPage;

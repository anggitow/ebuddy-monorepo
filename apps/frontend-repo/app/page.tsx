"use client";
import { Box, Button, Container, Typography, Paper, Grid } from "@mui/material";
import { Google } from "@mui/icons-material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseClient";

export default function Login() {
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      console.log("User signed in:", user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid width="100%" size={{ xs: 6 }}>
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
              mb={3}
            >
              Sign in to continue
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
              <Button
                variant="outlined"
                startIcon={<Google />}
                size="large"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 500,
                }}
                fullWidth
                onClick={loginWithGoogle}
              >
                Continue with Google
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Box, Button, Container, Typography, Paper, Grid } from "@mui/material";
import { Google } from "@mui/icons-material";
import { auth } from "../firebase/firebaseClient";

export default function Login() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      const token = await user?.getIdToken();

      await fetch("/api/set-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      await fetch("http://localhost:3001/api/update-user-data", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
        }),
      });

      router.push("/home");
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

"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const Home = () => {
  const allUsers = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    photoUrl: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i + 1}.jpg`,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    numberOfRents: Math.floor(Math.random() * 30),
    lastActiveAt: new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30
    ).toISOString(),
  }));

  const fetchUsers = async (page: number, pageSize: number) => {
    const start = page * pageSize;
    const end = start + pageSize;
    const slice = allUsers.slice(start, end);

    return new Promise<any[]>((resolve) =>
      setTimeout(() => {
        resolve(slice);
      }, 800)
    );
  };

  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 9;

  const loadMore = async () => {
    setLoading(true);
    const newUsers = await fetchUsers(page, pageSize);
    setUsers((prev) => [...prev, ...newUsers]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadMore(); // Fetch pertama
  }, []);

  const isAllLoaded = users.length >= allUsers.length;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Home Page
      </Typography>

      <Grid container spacing={3} mt={2}>
        {users.map((user) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={user.id}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    src={user.photoUrl}
                    alt={user.name}
                    sx={{ width: 56, height: 56 }}
                  />
                }
                title={<Typography fontWeight={600}>{user.name}</Typography>}
                subheader={`Rating: ${user.rating} • Rents: ${user.numberOfRents}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Last Active: {user.lastActiveAt}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {!isAllLoaded && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            onClick={loadMore}
            disabled={loading}
            size="large"
            sx={{ borderRadius: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Load More"
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;

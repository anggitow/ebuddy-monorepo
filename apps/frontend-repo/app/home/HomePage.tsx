'use client';
import { useState } from 'react';
import { LogoutOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardContent, CardHeader, CircularProgress, Grid, Typography } from '@mui/material';
import { redirect } from 'next/navigation';

const HomePage = ({ token, name }: { token: string; name: string }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const pageSize = 9;

  const fetchUserData = async (page: number, pageSize: number) => {
    const response = await fetch(`http://localhost:3001/api/fetch-user-data?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (data.responseData.length < pageSize) {
      setIsAllLoaded(true);
    }
    return data.responseData;
  };

  const loadMore = async () => {
    setLoading(true);
    const newUsers = await fetchUserData(page, pageSize);
    setUsers((prev) => [...prev, ...newUsers]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  const logout = async () => {
    await fetch('/api/remove-cookie', { method: 'PATCH' });
    redirect('/');
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Home Page
        </Typography>
        <Box display="flex" gap={2} alignItems="flex-start">
          <Typography variant="subtitle1" fontWeight="bold" mb={3}>
            {name}
          </Typography>
          <Button variant="outlined" color="error" endIcon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} mt={2}>
        {users.map((user) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={user.email}>
            <Card>
              <CardHeader
                avatar={<Avatar src={user.photoUrl} alt={user.name} sx={{ width: 56, height: 56 }} />}
                title={<Typography fontWeight={600}>{user.name}</Typography>}
                subheader={`Rating: ${user.totalAverageWeightRatings} • Rents: ${user.numberOfRents}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Last Active: {user.recentlyActiveDate}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {!isAllLoaded && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" onClick={loadMore} disabled={loading} size="large" sx={{ borderRadius: 2 }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : `Load ${users.length == 0 ? 'Users' : 'More'}`}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;

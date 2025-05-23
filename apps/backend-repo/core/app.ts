import express from 'express';
import userRoutes from '../routes/userRoutes';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    responseCode: true,
    responseMessage: 'Success',
    responseSystemMessage: '',
    responseData: []
  });
});

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

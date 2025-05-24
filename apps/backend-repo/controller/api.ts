import { Request, Response } from 'express';
import { getAllUsers, upsertUserById } from '../repository/userCollection';

export const fetchUserData = (req: Request, res: Response): void => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 9;

  getAllUsers(page, pageSize)
    .then((users) => {
      res.status(200).json({
        responseCode: true,
        responseMessage: 'Success',
        responseSystemMessage: '',
        responseData: users
      });
    })
    .catch((error) => {
      res.status(500).json({
        responseCode: false,
        responseMessage: 'Internal server error',
        responseSystemMessage: error instanceof Error ? error.message : '',
        responseData: []
      });
    });
};

export const updateUserData = (req: Request, res: Response): void => {
  req.body.totalAverageWeightRatings = parseFloat((Math.random() * 2 + 3).toFixed(1));
  req.body.numberOfRents = Math.floor(Math.random() * 31) + 20;
  req.body.recentlyActive = Math.floor(Date.now() / 1000);

  const { uid, ...userData } = req.body;

  if (!uid) {
    res.status(400).json({
      responseCode: false,
      responseMessage: 'Bad request',
      responseSystemMessage: 'Missing uid in request body',
      responseData: []
    });
    return;
  }

  upsertUserById(uid, userData)
    .then(() => {
      res.status(200).json({
        responseCode: true,
        responseMessage: 'Success',
        responseSystemMessage: '',
        responseData: []
      });
    })
    .catch((error) => {
      res.status(500).json({
        responseCode: false,
        responseMessage: 'Internal server error',
        responseSystemMessage: error instanceof Error ? error.message : '',
        responseData: []
      });
    });
};

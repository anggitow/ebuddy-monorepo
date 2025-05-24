import { firestore } from '../config/firebaseConfig';
import { User } from '../entities/user';

const USERS_COLLECTION = 'USERS';

export const upsertUserById = async (userId: string, data: Partial<User>): Promise<void> => {
  const docRef = firestore.collection(USERS_COLLECTION).doc(userId);
  const existingDoc = await docRef.get();

  if (existingDoc.exists) {
    const existingData = existingDoc.data() as User;

    // Jangan timpa jika sudah ada
    if (existingData.totalAverageWeightRatings !== undefined) {
      delete data.totalAverageWeightRatings;
    }

    if (existingData.numberOfRents !== undefined) {
      delete data.numberOfRents;
    }
  }

  await docRef.set(data, { merge: true });
};

export const getAllUsers = async (page: number = 1, pageSize: number = 9): Promise<User[]> => {
  const snapshot = await firestore.collection(USERS_COLLECTION).get();
  const users: User[] = snapshot.docs.map((doc) => doc.data() as User);

  // Normalize values before scoring
  const maxRating = Math.max(...users.map((u) => u.totalAverageWeightRatings));
  const maxRents = Math.max(...users.map((u) => u.numberOfRents));
  const maxActivity = Math.max(...users.map((u) => u.recentlyActive));

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const scoredUsers = users
    .map((user) => {
      const score =
        (user.totalAverageWeightRatings / maxRating) * 0.5 +
        (user.numberOfRents / maxRents) * 0.3 +
        (user.recentlyActive / maxActivity) * 0.2;

      const date = new Date(user.recentlyActive * 1000);
      const recentlyActiveDate = date.toLocaleString('en-GB', options);

      return { ...user, score, recentlyActiveDate };
    })
    .sort((a, b) => b.score - a.score);

  // Apply pagination
  const startIndex = (page - 1) * pageSize;
  const paginatedUsers = scoredUsers.slice(startIndex, startIndex + pageSize);

  return paginatedUsers;
};

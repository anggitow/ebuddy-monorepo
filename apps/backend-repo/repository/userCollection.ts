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

export const getAllUsers = async (): Promise<User[]> => {
  const snapshot = await firestore.collection(USERS_COLLECTION).get();
  return snapshot.docs.map((doc) => doc.data() as User);
};

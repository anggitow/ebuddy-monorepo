import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAsm4EMHBXeQQ-ndS0LeonsjbUdYcki5NI',
  authDomain: 'anggitow-fccf0.firebaseapp.com',
  projectId: 'anggitow-fccf0',
  storageBucket: 'anggitow-fccf0.firebasestorage.app',
  messagingSenderId: '411861434904',
  appId: '1:411861434904:web:1d131f7adaa4e1ce73796d',
  measurementId: 'G-SQQZ2V1J84'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

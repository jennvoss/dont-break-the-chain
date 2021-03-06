import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDirjagpIy54zoML0dL8TyMTAm1SANuKMc',
  authDomain: 'the-chain-55045.firebaseapp.com',
  databaseURL: 'https://the-chain-55045.firebaseio.com'
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.database();
export const firebaseAuth = firebase.auth;
export const authKey = 'authToken';

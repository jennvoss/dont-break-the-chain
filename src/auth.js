import {firebaseAuth, googleProvider} from "./constants";

export function loginWithGoogle() {
  return firebaseAuth().signInWithRedirect(googleProvider);
}

export function logout() {
  return firebaseAuth().signOut();
}

export function loggedIn() {
  firebaseAuth().onAuthStateChanged(function(user) {
    console.log('user', user);
    return user;
  });
}
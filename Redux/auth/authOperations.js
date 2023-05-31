import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from "../../FireBase/config";
import { uploadImage } from "../post/postOperation";
import { updateUserProfile, authStateChange, authSignOut } from "./authReducer";

export const authSignInUser =
  ({ email, password }) =>
  async () => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return credentials.user;
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignUpUser =
  ({ login, email, password, avatar }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const avatarUri = await uploadImage(avatar, "avatar/");

      const userCurrent = auth.currentUser;
      await updateProfile(userCurrent, {
        displayName: login,
        photoURL: avatarUri,
      });

      const updateUserSuccess = auth.currentUser;

      dispatch(
        updateUserProfile({
          id: updateUserSuccess.uid,
          login: updateUserSuccess.displayName,
          avatar: updateUserSuccess.photoURL,
          email: updateUserSuccess.email,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignOutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log("error", error.message);
  }
};

export const authStateChangeUser = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        id: user.uid,
      };
      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

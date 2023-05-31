import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { privateRoute } from "../router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FireBase/config";
import { updateUserProfile, authStateChange } from "../Redux/auth/authReducer";
const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userUpdateProfile = {
          id: user.uid,
          login: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        };
        dispatch(updateUserProfile(userUpdateProfile));
        dispatch(authStateChange({ stateChange: true }));
      }
    });
  }, []);

  const routing = privateRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;

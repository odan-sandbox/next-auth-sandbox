"use client";

import { signIn, useSession } from "next-auth/react";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

import { getApp } from "../lib/firebase";
const app = getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const GoogleLogin = () => {
  const { data: session } = useSession();

  console.log({ session });
  const handleOAuthSignIn = () => {
    signInWithPopup(auth, googleProvider)
      // 認証に成功したら ID トークンを NextAuth に渡す
      .then((credential) => credential.user.getIdToken(true))
      .then((idToken) => {
        signIn("credentials", { idToken });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>client: {session ? "ログイン済み" : "未ログイン"}</div>
      <button onClick={handleOAuthSignIn}>ログインしてね</button>
    </div>
  );
};

import "server-only";
import * as admin from "firebase-admin";

import type { ServiceAccount } from "firebase-admin";

const cert: ServiceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

const initializeFirebaseAdmin = () => {
  admin.initializeApp({ credential: admin.credential.cert(cert) });
};

const getApp = () => {
  if (admin.apps.length === 0) {
    initializeFirebaseAdmin();
  }
  return admin.app();
};

export { initializeFirebaseAdmin, getApp };

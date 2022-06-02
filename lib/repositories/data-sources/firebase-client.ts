import { initializeApp, FirebaseApp } from "firebase/app";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  User,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  DocumentSnapshot,
  getFirestore,
  setDoc,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  QueryConstraint,
  where,
  deleteDoc
} from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import { getStorage, UploadResult, uploadBytes, ref, getDownloadURL } from "firebase/storage";

class FirebaseClient {
  private static firebaseClient: FirebaseClient;
  private app: FirebaseApp;

  private constructor() {
    this.app = initializeApp({
      apiKey: "AIzaSyD6MN9wM0dLWpo-2ynMrdTUZtfsiaeD5Fw",
      authDomain: "poli-news-77c19.firebaseapp.com",
      projectId: "poli-news-77c19",
      storageBucket: "poli-news-77c19.appspot.com",
      messagingSenderId: "274299796406",
      appId: "1:274299796406:web:024475ea1a70c1a8a0df17",
      measurementId: "G-LHVY9JGKT6",
    });
  }

  public static getInstance(): FirebaseClient {
    if (!Boolean(this.firebaseClient))
      this.firebaseClient = new FirebaseClient();
    return this.firebaseClient;
  }

  public login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(getAuth(this.app), email, password);
  }
  public logout = (): Promise<void> => signOut(getAuth(this.app));

  public currentUser() {
    return getAuth(this.app).currentUser;
  }

  public setDocument(path: string, data: any): Promise<void> {
    return setDoc(doc(getFirestore(this.app), path), data);
  }

  public addDocument(path: string, data: any): Promise<DocumentReference<any>> {
    return addDoc(collection(getFirestore(this.app), path), data);
  }

  public async getDocument(path: string): Promise<DocumentSnapshot> {
    return getDoc(doc(getFirestore(this.app), path));
  }
  public async getDocuments(path: string, queries: Array<QueryConstraint>): Promise<QuerySnapshot> {
    const ref = collection(getFirestore(this.app), path);
    const q = query(ref, ...queries);

    return getDocs(q);
  }

  public deleteDocument(path: string): Promise<void> {
    return deleteDoc(doc(getFirestore(this.app), path));
  }

  public uploadFile(file: File, path: string): Promise<UploadResult> {
    return uploadBytes(ref(getStorage(), path), file);
  }

  public getFileUrl(path: string): Promise<string> {
    return getDownloadURL(ref(getStorage(), path));
  }

  public initializeMessaging() {
    const messaging = getMessaging(this.app);
    const token = getToken(messaging, {
      vapidKey:
        "BPRbiUKXJMqUgGZVQ1ppH5KDu5jMNEJ01RWsPowgwf2xithpoon_fUQfhaAiecCBthyblm-gVA6X4Vv7rv_MoQc",
    });
    if (token && this.currentUser()) {
      this.setDocument(`messagingTokens/${this.currentUser().uid}`, { token });
    } else {
      console.log("invalid FCM token");
    }
  }

  public subscribeToTokenChange(callback: (user: User | null) => void) {
    getAuth(this.app).onIdTokenChanged(callback);
  }

  public resetPassword = async (email: string = "") => {
    const user = this.currentUser();
    return sendPasswordResetEmail(getAuth(this.app), user?.email || email);
  };

  public verifyPasswordResetCode = async (code: string) =>
    verifyPasswordResetCode(getAuth(this.app), code);

  public confirmPasswordReset = async (code: string, newPassword: string) =>
    confirmPasswordReset(getAuth(this.app), code, newPassword);
}

export default FirebaseClient;
function sendPasswordResetEmail(firebaseAuth: any, arg1: string) {
  throw new Error("Function not implemented.");
}

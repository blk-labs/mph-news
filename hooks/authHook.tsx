import nookies from "nookies";
import { User } from "../lib/models/UserModel";
import {
  Context,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { userService } from "../lib/services";

type AuthContextData = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  verifyPasswordResetCode: (code: string) => Promise<string>;
  confirmPasswordReset: (code: string, newPassword: string) => Promise<void>;
};

const AuthContext: Context<AuthContextData> = createContext({
  user: null,
} as AuthContextData);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    userService.onTokenChanged(async (firebaseUser) => {
      if (firebaseUser == null) {
        setUser(null);
        nookies.set(undefined, "__session", "", { path: "/" });
      } else {
        const token = await firebaseUser.getIdToken();
        nookies.set(undefined, "__session", token, { path: "/" });
        let c = (await firebaseUser.getIdTokenResult()).claims;
        const u = { user: firebaseUser, claims: c };
        setUser(u);
      }
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = userService.signedInUser();
      if (user) await user.getIdToken(true);
    }, 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      let user = await userService.signIn(email, password);
      let claims = (await user.getIdTokenResult()).claims;
      if (claims.role !== "admin") {
        await userService.signOut();
        return false;
      }
      return Boolean(user);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const signOut = async () => userService.signOut();

  const sendPasswordResetEmail = async (email: string) =>
    userService.resetPassword(email);
  const verifyPasswordResetCode = async (code: string): Promise<string> =>
    userService.verifyPasswordResetCode(code);
  const confirmPasswordReset = async (code: string, newPassword: string) =>
    userService.confirmPasswordReset(code, newPassword);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        sendPasswordResetEmail,
        verifyPasswordResetCode,
        confirmPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

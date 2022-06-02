import ErrorService from "../services/ErrorService";
import FirebaseClient from "./data-sources/firebase-client";

class UserRepo {
  private idTokenChangeListeners: Array<(user: any) => void> = [];
  constructor(private dataClient: FirebaseClient) {}

  async signIn(email: string, password: string) {
    try {
      const userCred = await this.dataClient.login(email, password);
      return Promise.resolve(userCred.user);
    } catch (e: any) {
      return Promise.reject(ErrorService.resolveCode(e.code));
    }
  }

  async signOut() {
    return this.dataClient.logout();
  }

  private idTokenChangeCallback = (user: any) => {
    console.log("token changed: ", user);
    if (this.idTokenChangeListeners.length > 0) {
      this.idTokenChangeListeners.forEach((listener) => listener(user));
    }
  };

  public subscribeToIDTokenChange = (callback: (user: any) => void) => {
    if (this.idTokenChangeListeners.length === 0) {
      this.dataClient.subscribeToTokenChange(this.idTokenChangeCallback);
    }
    this.idTokenChangeListeners.push(callback);
  };

  public currentUser() {
    return this.dataClient.currentUser();
  }

  public resetPassword = async (email: string = "") => {
    return this.dataClient.resetPassword(email);
  };

  public verifyPasswordResetCode = async (code: string) =>
    this.dataClient.verifyPasswordResetCode(code);

  public confirmPasswordReset = async (code: string, newPassword: string) =>
    this.dataClient.confirmPasswordReset(code, newPassword);

  public async getUserDocument() {
    const response = await this.dataClient.getDocument(
      `users/${this.currentUser().email}`
    );
    return { ...response.data(), id: response.id };
  }

  public async uploadImage(file: File) {
    const path = `${file.name}`;
    await this.dataClient.uploadFile(file, path);
    return { message: 'Image uploaded successfully', imgName: await this.dataClient.getFileUrl(path)  };
  }

  public async uploadDoc(file: File) {
    const path = `${file.name}`;
    await this.dataClient.uploadFile(file, path);
    return { message: 'File uploaded successfully', doc: await this.dataClient.getFileUrl(path)  };
  }
}

export default UserRepo;

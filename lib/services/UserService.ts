import UserRepo from "../repositories/UserRepo";

type UserServiceDependencies = {
  repo: UserRepo;
};

class UserService {
  constructor(private dependencies: UserServiceDependencies) {}

  signIn(email: string, password: string) {
    return this.dependencies.repo.signIn(email, password);
  }

  onTokenChanged(callback: any) {
    this.dependencies.repo.subscribeToIDTokenChange(callback);
  }

  signedInUser() {
    return this.dependencies.repo.currentUser();
  }

  async signOut() {
    return this.dependencies.repo.signOut();
  }

  public async resetPassword(email: string = "") {
    return this.dependencies.repo.resetPassword(email);
  }

  public async verifyPasswordResetCode(code: string) {
    return this.dependencies.repo.verifyPasswordResetCode(code);
  }

  public async confirmPasswordReset(code: string, newPassword: string) {
    return this.dependencies.repo.confirmPasswordReset(code, newPassword);
  }
}

export default UserService;

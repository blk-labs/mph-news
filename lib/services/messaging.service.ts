import { MessagingInterface, MessagingRepo } from "../repositories/messaging.repo";

export class MessagingService implements MessagingInterface {
    constructor(private repo: MessagingRepo){
    }
    onBackgroundMessageRecieved(callback: (message: any) => void): void {
        this.repo.onBackgroundMessageRecieved(callback);
    }

    onForegroundMessageRecieved(callback: (message: any) => void): void {
        this.repo.onForegroundMessageRecieved(callback);
    }

    init() {
        return this.repo.initialize();
    }
}
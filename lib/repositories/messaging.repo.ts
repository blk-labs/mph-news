import FirebaseClient from "./data-sources/firebase-client";

export interface MessagingInterface {
    onForegroundMessageRecieved (callback: (message: any) => void): void;
    onBackgroundMessageRecieved (callback: (message: any) => void): void;
}

export class MessagingRepo implements MessagingInterface {
    constructor(private db: FirebaseClient){}
    onBackgroundMessageRecieved(callback: (message: any) => void): void {
        this.db.subscribeToForegroundMessage(callback);
    }
    onForegroundMessageRecieved(callback: (message: any) => void): void {
        this.db.subscribeToForegroundMessage(callback);
    }
    async initialize() {
        try {
            const status = await Notification.requestPermission();
            if(status && status === "granted") {
                this.db.initializeMessaging();
            }
        } catch (e) {
            console.log(e);
        }
    }
}
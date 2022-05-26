import { User as FBUser } from "firebase/auth";
type IUserModel = {
    name: string;
    email: string;
    uid: string;
    role: 'admin' | 'user';
}

export default IUserModel;
export type User = {
    user: FBUser;
    claims: any
};
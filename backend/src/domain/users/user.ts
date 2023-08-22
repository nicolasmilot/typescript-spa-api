import { Invitation } from "../invitations/invitation";

export interface User {
    fullName: string;
    email: string;
    invitations: Array<Invitation>|null;
}
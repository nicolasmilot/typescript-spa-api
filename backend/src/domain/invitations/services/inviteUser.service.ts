import { InvitationRepository } from "@lib/invitations/invitation.repository";
import { Invitation } from "../invitation";
import { v4 as uuidv4 } from 'uuid';

export class InviteUserService {
    public constructor(
        private repository: InvitationRepository,
        private email: string,
    ) {}

    public async inviteUser(): Promise<Invitation> {
        const invitationId: string = uuidv4();
        return this.repository.create({ id: invitationId, email: this.email });
    }
}
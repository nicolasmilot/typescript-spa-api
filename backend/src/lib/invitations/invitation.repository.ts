import { Invitation } from "../../domain/invitations/invitation";
import {PrismaClient} from "@prisma/client";

export interface InvitationRepository {
    findById(id: string): Promise<Invitation|null>
    create(invitation: Invitation): Promise<Invitation>
}

export class PostgresInvitationRepository implements InvitationRepository {
    public constructor(
        private database: PrismaClient
    ) {}

    public async findById(id: string): Promise<Invitation|null> {
        return this.database.user_invitations.findUnique({ where: { id } })
    }

    public async create(invitation: Invitation): Promise<Invitation> {
        return this.database.user_invitations.create({ data: invitation })
    }
}

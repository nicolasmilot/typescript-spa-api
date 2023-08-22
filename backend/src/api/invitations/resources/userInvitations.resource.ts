import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PostgresUserRepository, UserRepository } from '@lib/users/user.repository';
import { InvitationRepository, PostgresInvitationRepository } from '@lib/invitations/invitation.repository';
import { InviteUserService } from '@domain/invitations/services/inviteUser.service';
import { Invitation } from '@domain/invitations/invitation';
import { InvitationNotFoundError } from '@domain/invitations/invitationError';
import { User } from '@domain/users/user';
import { InviteUserRequest, InviteUserRequestContent } from '@api/invitations/resources/requests/InviteUserRequest';
import { RequestHandlerMiddleware } from '@lib/requests/requestHandler';
import {
    GetInvitationByIdRequest, GetInvitationByIdRequestParams,
} from '@api/invitations/resources/requests/GetInvitationByIdRequest';

const client: PrismaClient = new PrismaClient()

const router = Router();

router.post('',
    RequestHandlerMiddleware(InviteUserRequest),
    async (req: Request<{}, {}, InviteUserRequestContent>, res: Response) => {
        const { email }: InviteUserRequestContent = req.body;

        const userRepository: UserRepository = new PostgresUserRepository(client)
        const user: User|null = await userRepository.findByEmail(email);

        if (user) {
            return res.status(422).send('Error Inviting User')
        }

        const service: InviteUserService = new InviteUserService(
            new PostgresInvitationRepository(client),
            req.body.email,
        );

        return service.inviteUser()
            .then((invitation: Invitation) => {
                return res.status(202).send(invitation);
            });
    }
);

router.get('/id/:id',
    RequestHandlerMiddleware(GetInvitationByIdRequest),
    async (req: Request<{ id: string }> , res: Response) => {
        const { id }: GetInvitationByIdRequestParams = req.params;

        const repository: InvitationRepository = new PostgresInvitationRepository(client);
        const invitation: Invitation|null = await repository.findById(id);

        if (!invitation) {
            const error: InvitationNotFoundError = new InvitationNotFoundError()
            return res.status(error.code).send(error.message);
        }

        return res.status(200).send(invitation);
    }
)

export default router;
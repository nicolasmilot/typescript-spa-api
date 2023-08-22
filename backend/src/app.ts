import express from 'express';
import bodyParser from 'body-parser';

import usersResource from '@api/users/resources/users.resource'
import userInvitationsResource from '@api/invitations/resources/userInvitations.resource'

const app = express();

declare global {
    namespace Express {
        interface Request {
            validatedBody: any;
        }
    }
}

app.use(bodyParser.json({ type: 'application/json' }))

app.use('/api/v1/users', usersResource);
app.use('/api/v1/user-invitations', userInvitationsResource);

app.get('/', (req, res) => {
    res.send('Hello, Express, how are you today ?');
});

export { app };

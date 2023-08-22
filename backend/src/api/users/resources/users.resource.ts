import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const client: PrismaClient = new PrismaClient()

const router = Router();

router.get('/id/:id', (req, res) => {
    return client.users.findUnique({ where: {id: parseInt(req.params.id, 10) } }).then((user) => {
        console.log(user)
        return res.status(200).send(user)
    }).catch(() => {
        return res.status(500).send('Internal Server Error')
    })
});

router.get('/email/:email', (req, res) => {
    return client.users.findUnique({ where: { email: req.params.email } } ).then((user) => {
        console.log(user)
        return res.status(200).send(user)
    }).catch(() => {
        return res.status(500).send('Internal Server Error')
    })
});

export default router;
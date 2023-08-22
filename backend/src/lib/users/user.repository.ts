import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/users/user";


export interface UserRepository {
    findById(id: number): Promise<User|null>
    findByEmail(email: string): Promise<User|null>
}

export class PostgresUserRepository implements UserRepository{
    public constructor(
        private database: PrismaClient
    ) {}

    public async findById(id: number): Promise<User|null> {
        return this.database.users.findUnique({ where: { id } })
            .then((user) => {
                return mapUserModelToUser(user);
            })
    }

    public async findByEmail(email: string): Promise<User|null> {
        return this.database.users.findUnique({ where: { email } })
            .then((user) => {
                return mapUserModelToUser(user);
            })
    }
}

const mapUserModelToUser = (user): User|null => {
    if (!user) return null;

    return {
        fullName: `${user.first_name} ${user.last_name}`,
        email: user.email,
        invitations: null,
    }
}
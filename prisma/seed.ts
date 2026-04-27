import {PrismaClient} from '@prisma/client';
import {hash} from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const adminExists = await prisma.user.findUnique({
        where: { email: 'admin@teleios.ae' },
    });

    if (!adminExists) {
        await prisma.user.create({
            data: {
                username: 'admin',
                email: 'admin@teleios.ae',
                password: await hash('admin123', 10),
                role: 'ADMIN',
            },
        });

        console.log('✅ Admin user created');
    } else {
        console.log('ℹ️ Admin user already exists');
    }
}

main()
    .catch((e) => {
        console.error('Seed error:', e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
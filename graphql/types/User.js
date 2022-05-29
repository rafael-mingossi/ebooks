import { enumType, objectType, extendType } from 'nexus';
import { Book } from './Book';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('userId');
    t.string('email');
    t.string('firstName');
    t.string('lastName');
    t.string('image');
    t.int('phoneNo');
    t.field('role', { type: Role });
    t.list.field('favouriteBooks', {
      type: Book,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              userId: parent.userId,
            },
          })
          .favouriteBooks();
      },
    });
  },
});

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN'],
});

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.user.findMany();
      },
    });
  },
});

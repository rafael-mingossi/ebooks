import { enumType, objectType, extendType } from 'nexus';

export const Feed = objectType({
  name: 'Feed',
  definition(t) {
    t.string('fbId');
    t.string('email');
    t.string('firstName');
    t.string('lastName');
    t.string('message');
    t.int('phoneNo');
  },
});

export const FeedQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('feed', {
      type: 'Feed',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.feed.findMany();
      },
    });
  },
});

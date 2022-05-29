import { objectType, extendType, stringArg, nonNull, intArg } from 'nexus';

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

// export const createFeed = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.field('createFeed', {
//       type: FeedResponse,
//       args: { credentials: Inputs },
//     });
//   },
// });

export const FeedMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('feed', {
      type: 'Feed',
      args: {
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        message: nonNull(stringArg()),
        email: nonNull(stringArg()),
        phoneNo: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        const feed = {
          firstName: args.firstName,
          lastName: args.lastName,
          message: args.message,
          email: args.email,
          phoneNo: args.phoneNo,
        };
        return ctx.prisma.feed.create({ data: feed });
        // return feed;
      },
    });
  },
});

// const Inputs = inputObjectType({
//   name: 'feedInputs',
//   definition: (t) => {
//     t.nonNull.string('firstName');
//     t.nonNull.string('lasttName');
//     t.nonNull.string('email');
//     t.nonNull.string('message');
//     t.nonNull.int('phoneNo');
//   },
// });

// const FeedResponse = objectType({
//   name: 'feedResponse',
//   definition: (t) => {
//     t.nonNull.string('message');
//     t.nonNull.boolean('error');
//   },
// });

import prisma from "../lib/prisma";

export const resolvers = {
  Query: {
    users: async (_parent, args, context) => await prisma.users.findMany(),
  },
};

// export const resolvers = {
//   Query: {
//     users: () => [
//       {
//         userId: "1",
//         firstName: "User Name 1",
//         lastName: "User Last Name 1",
//         phoneNo: 1234,
//         email: "user1@email.com",
//         password: "123",
//       },
//       {
//         userId: "2",
//         firstName: "User Name 2",
//         lastName: "User Last Name 2",
//         phoneNo: 12345,
//         email: "user2@email.com",
//         password: "123",
//       },
//       {
//         userId: "3",
//         firstName: "User Name 3",
//         lastName: "User Last Name 3",
//         phoneNo: 12345,
//         email: "user3@email.com",
//         password: "123",
//       },
//     ],
//   },
// };

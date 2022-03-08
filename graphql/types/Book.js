import { extendType, objectType } from "nexus";
import { User } from "./User";

export const Book = objectType({
  name: "Book",
  definition(t) {
    t.string("bookId");
    t.string("cover");
    t.string("title");
    t.string("category");
    t.string("content");
    t.string("description");
    t.int("year");
    t.int("totalPages");
    t.list.field("users", {
      type: User,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.book
          .findUnique({
            where: {
              bookId: parent.bookId,
            },
          })
          .users();
      },
    });
  },
});

export const BooksQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("books", {
      type: "Book",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.book.findMany();
      },
    });
  },
});

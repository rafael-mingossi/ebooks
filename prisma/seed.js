// import pkg from "@prisma/client";
// const { PrismaClient } = pkg;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "tes444@email.com",
      role: "USER",
      firstName: "test555",
      lastName: "test555 sruname",
      phoneNo: 1232,
    },
  });

  await prisma.book.createMany({
    data: [
      {
        cover: "cover1111",
        title: "title 311111",
        category: "cat3111",
        content: "content31111",
        description: "descrp3111",
        totalPages: 100,
        year: 1991,
      },
      {
        cover: "cover245",
        title: "title 245",
        category: "cat245",
        content: "content245",
        description: "descrp245",
        totalPages: 95,
        year: 1994,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

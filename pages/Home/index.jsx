import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export default function Home() {
  return (
    <div>
      <h1>
        Logged In As
        <button>Sign Out</button>
      </h1>
    </div>
  );
}

// export async function getServerSideProps({ req }) {
//   const book = await prisma.book.findMany({});
//   const users = await prisma.user.findMany({});
//   // const session = await getSession(context);
//   // //console.log('sesss ->>', session);
//   // if (!session) {
//   //   context.res.writeHead(302, { Location: '/' });
//   //   context.res.end();
//   //   return {};
//   // }

//   const session = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   const books = book?.map((item) => ({
//     bookId: item?.bookId,
//     cover: item?.cover,
//     title: item?.title,
//     category: item?.category,
//     year: item?.year,
//   }));

//   //console.log(session);
//   return {
//     props: {
//       user: session.user,
//       books: books,
//     },
//   };
// }

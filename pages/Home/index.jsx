import { useSession, getSession, signOut } from 'next-auth/react';
import prisma from '../../lib/prisma';

export default function Home({ user, books }) {
  const { data: session, status } = useSession();
  console.log('see ->>', status);

  return (
    <div>
      <p style={{ fontSize: '10rem' }}>Welcome user {session && user.name}</p>
      <br />
      <button onClick={() => signOut('google')}>Sign out</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const book = await prisma.book.findMany({});
  const users = await prisma.user.findMany({});
  const session = await getSession(context);
  //console.log('sesss ->>', session);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    return {};
  }

  const books = book?.map((item) => ({
    bookId: item?.bookId,
    cover: item?.cover,
    title: item?.title,
    category: item?.category,
    year: item?.year,
  }));

  //console.log(session);
  return {
    props: {
      user: session.user,
      books: books,
    },
  };
}

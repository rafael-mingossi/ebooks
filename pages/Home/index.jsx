import { useState, useEffect, useContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import prisma from '../../lib/prisma';
import { ViewContext } from '../_app';

export default function Home() {
  const [viewContext, setViewContext] = useContext(ViewContext);
  const { handleLogout, getItem } = useLocalStorage({});

  const [token, setToken] = useState(getItem({ key: 'token' }));
  const [user, setUser] = useState(getItem({ key: 'user' }));

  //const { user, token, isLogged } = viewContext;
  return (
    <div>
      <h1>Logged In As {user?.firstName || ''}</h1>
      <h1>Token: {token || ''}</h1>
      <button onClick={() => handleLogout()}>Log out</button>
    </div>
  );
}

// export async function getServerSideProps({ req }) {
//   const book = await prisma.book.findMany({});
//   const users = await prisma.user.findMany({});

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
//       users: users,
//       books: books,
//     },
//   };
// }

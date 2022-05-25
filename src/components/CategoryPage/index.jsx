import styles from './styles.module.scss';
import { BookCard } from '/src/components';
import { useState, useEffect, useContext } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const Category = ({ category, url }) => {
  const [favourites, setFavourites] = useState([]);
  const [user, setUser] = useState();
  const { getUserItem, getItem } = useLocalStorage({});

  useEffect(() => {
    const userId = getUserItem({ key: 'user' });
    setUser(userId?.userId.toString());
  }, []);

  useEffect(() => {
    const booksLocalStorage = getItem({ key: user });
    setFavourites(booksLocalStorage);
  }, []);

  return (
    <div className={styles.cards}>
      {category?.map((book, index) => (
        <BookCard
          key={index}
          img={book?.image || book?.cover}
          title={book?.title || book?.name}
          // clicks={() => alert(index)}
          isbn13={book?.isbn13 || book?.bookId}
          favourites={favourites}
          setFavourites={setFavourites}
          index={index}
          url={url}
        />
      ))}
    </div>
  );
};

export default Category;

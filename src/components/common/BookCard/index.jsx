import styles from './styles.module.scss';
import { useContext } from 'react';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import Link from 'next/link';
import { ViewContext } from '../../../../pages/_app';

const icons = {
  norm: '/fav.svg',
  filled: '/favFull.svg',
};

const BookCard = ({
  img,
  title,
  clicks,
  favourites,
  setFavourites,
  index,
  isbn13,
  url,
}) => {
  const { setItem, getUserItem } = useLocalStorage({});
  const [viewContext, setViewContext] = useContext(ViewContext);
  const user = viewContext?.user?.userId;

  const exists = (fav) => {
    return favourites?.includes(fav);
  };

  const saveLocalStorage = (book) => {
    setItem({ key: user, value: book });
  };

  const addFavourite = (movie) => {
    const newFavouriteList =
      favourites?.length > 0 ? [...favourites, movie] : [movie];
    setFavourites(newFavouriteList);
    saveLocalStorage(newFavouriteList);
  };

  const removeFavourite = (book) => {
    const newFavouriteList = favourites.filter((title) => title !== book);
    setFavourites(newFavouriteList);
    saveLocalStorage(newFavouriteList);
  };

  return (
    <div className={styles.bookWrapper}>
      <div className={styles.cover} onClick={clicks}>
        <Link href={`/category/${url}/${isbn13}`}>
          <img src={img} alt='book image' className={styles.img} />
        </Link>
      </div>

      {!exists(title) ? (
        <img
          src={icons.norm}
          alt='icon image'
          className={styles.icon}
          onClick={() => addFavourite(title)}
        />
      ) : (
        <img
          src={icons.filled}
          alt='icon image'
          className={styles.icon}
          onClick={() => removeFavourite(title)}
        />
      )}
    </div>
  );
};

export default BookCard;

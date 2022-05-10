import styles from './styles.module.scss';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import Link from 'next/link';

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
  const { setItem, getItem } = useLocalStorage({});

  const exists = (fav) => {
    return favourites?.includes(fav);
  };

  const saveLocalStorage = (book) => {
    setItem({ key: 'fav-books', value: book });
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
          <img src={img} className={styles.img} />
        </Link>
      </div>

      {!exists(index) ? (
        <img
          src={icons.norm}
          className={styles.icon}
          onClick={() => addFavourite(index)}
        />
      ) : (
        <img
          src={icons.filled}
          className={styles.icon}
          onClick={() => removeFavourite(index)}
        />
      )}
    </div>
  );
};

export default BookCard;

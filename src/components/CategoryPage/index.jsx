import styles from './styles.module.scss';
import { BookCard } from '/src/components';

const Category = ({ category, url }) => {
  return (
    <div className={styles.cards}>
      {category?.books?.map((book, index) => (
        <BookCard
          key={index}
          img={book.image}
          title={book.title}
          // clicks={() => alert(index)}
          isbn13={book.isbn13}
          //favourites={favourites}
          //setFavourites={setFavourites}
          index={index}
          url={url}
        />
      ))}
    </div>
  );
};

export default Category;

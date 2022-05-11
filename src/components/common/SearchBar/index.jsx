import { useState } from 'react';
import styles from './styles.module.scss';
import { others } from '../../../../utils/category';

function Search({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [filteredIsbn, setFilteredIsbn] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [enteredValue, setEnteredValue] = useState('');

  const res = data.books;

  //console.log('resss-->>', res);

  const categories = [
    { id: 1, category: 'Drama' },
    { id: 2, category: 'Suspense' },
    { id: 3, category: 'Comedy' },
    { id: 4, category: 'Fiction' },
    { id: 5, category: 'Action' },
    { id: 6, category: 'Horror' },
    { id: 7, category: 'Php' },
    { id: 8, category: 'Css' },
    { id: 9, category: 'Python' },
    { id: 10, category: 'Java' },
    { id: 11, category: 'Database' },
    { id: 12, category: 'Cloud' },
  ];

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setEnteredValue(searchWord);

    if (searchWord.length >= 3) {
      const filterTitle = res.filter((value) => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      });

      const filterIsbn = res.filter((value) => {
        return value.isbn13.toLowerCase().includes(searchWord.toLowerCase());
      });

      const filterCategory = categories.filter((value) => {
        return value.category.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord <= 2) {
        setFilteredData([]);
        setFilteredIsbn([]);
        setFilteredCategory([]);
      } else {
        setFilteredData(filterTitle);
        setFilteredIsbn(filterIsbn);
        setFilteredCategory(filterCategory);
      }
    }

    if (searchWord <= 2) {
      setFilteredData([]);
      setFilteredIsbn([]);
      setFilteredCategory([]);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setFilteredIsbn([]);
    setFilteredCategory([]);
    setEnteredValue('');
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputs}>
        <input
          type='text'
          placeholder={placeholder}
          onChange={handleFilter}
          value={enteredValue}
        />
        <div className={styles.searchIcon}>
          {enteredValue.length === 0 ? (
            <img src='/search.svg' className={styles.icon} />
          ) : (
            <img
              src='/close2.svg'
              className={styles.icon}
              onClick={clearInput}
            />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className={styles.dataResult}>
          <p className={styles.titles}>TITLES</p>
          {filteredData.map((value, index) => {
            return (
              <a
                key={value.isbn13}
                className={styles.dataItem}
                href={`book/${value.isbn13}`}
              >
                <p>{value.title}</p>
              </a>
            );
          })}
        </div>
      )}
      {filteredIsbn.length !== 0 && (
        <div className={styles.dataResult}>
          <p className={styles.titles}>ISBN + TITLE</p>
          {filteredIsbn.map((value, index) => {
            return (
              <a
                key={value.isbn13}
                className={styles.dataItem}
                href={`book/${value.isbn13}`}
              >
                <p>
                  {value.isbn13} - {value.title}
                </p>
              </a>
            );
          })}
        </div>
      )}
      {filteredCategory.length !== 0 && (
        <div className={styles.dataResult}>
          <p className={styles.titles}>CATEGORY</p>
          {filteredCategory.map((value, index) => {
            return (
              <a
                key={value.id}
                className={styles.dataItem}
                href={`category/${value.category.toLowerCase()}`}
              >
                <p>{value.category}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;

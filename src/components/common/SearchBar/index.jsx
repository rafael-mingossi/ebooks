import { useState } from 'react';
import styles from './styles.module.scss';

function Search({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [filteredIsbn, setFilteredIsbn] = useState([]);
  const [enteredValue, setEnteredValue] = useState('');

  const res = data.books;

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

      console.log(filterIsbn);

      if (searchWord <= 2) {
        setFilteredData([]);
        setFilteredIsbn([]);
      } else {
        setFilteredData(filterTitle);
        setFilteredIsbn(filterIsbn);
      }
    }

    if (searchWord <= 2) {
      setFilteredData([]);
      setFilteredIsbn([]);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
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
                //href={`movie/${value.uid}`}
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
                //href={`movie/${value.uid}`}
              >
                <p>
                  {value.isbn13} - {value.title}
                </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;

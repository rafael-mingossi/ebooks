import { useState } from 'react';
import styles from './styles.module.scss';

function Search({ placeholder, data }) {
  //console.log('dat -->', data);
  const [filteredData, setFilteredData] = useState([]);
  const [enteredValue, setEnteredValue] = useState('');

  const res = data.books;

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setEnteredValue(searchWord);
    const newFilter = res.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
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
    </div>
  );
}

export default Search;

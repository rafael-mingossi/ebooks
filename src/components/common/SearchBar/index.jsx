import { useState } from 'react';
import styles from './styles.module.scss';
import { useBreakpoint } from '../../../../hooks/useBreakPoint';

function Search({ placeholder, data, data2 }) {
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataNews, setFilteredDataNews] = useState([]);
  const [filteredIsbn, setFilteredIsbn] = useState([]);
  const [filteredIsbnNews, setFilteredIsbnNews] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [enteredValue, setEnteredValue] = useState('');
  const { xsm } = useBreakpoint();

  const res = data.books; //cloud
  const res2 = data2.books; //news

  //console.log('res -->', data);
  //console.log('res2 -->', data2);

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
      //TITLES
      const filterTitle = res.filter((value) => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      });

      const filterTitleNews = res2.filter((value) => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      });

      //ISBN
      const filterIsbn = res.filter((value) => {
        return value.isbn13.toLowerCase().includes(searchWord.toLowerCase());
      });

      const filterIsbnNews = res2.filter((value) => {
        return value.isbn13.toLowerCase().includes(searchWord.toLowerCase());
      });

      //CATEGORIES
      const filterCategory = categories.filter((value) => {
        return value.category.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord <= 2) {
        setFilteredData([]);
        setFilteredIsbn([]);
        setFilteredCategory([]);
        setFilteredDataNews([]);
        setFilteredIsbnNews([]);
      } else {
        setFilteredData(filterTitle);
        setFilteredIsbn(filterIsbn);
        setFilteredCategory(filterCategory);
        setFilteredDataNews(filterTitleNews);
        setFilteredIsbnNews(filterIsbnNews);
      }
    }

    if (searchWord.length <= 2) {
      setFilteredData([]);
      setFilteredIsbn([]);
      setFilteredCategory([]);
      setFilteredDataNews([]);
      setFilteredIsbnNews([]);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setFilteredDataNews([]);
    setFilteredIsbn([]);
    setFilteredCategory([]);
    setFilteredIsbnNews([]);
    setEnteredValue('');
  };

  // console.log('ress11-->>', big);
  // console.log('ress22-->>', big);

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
            <img src='/search.svg' alt='search image' className={styles.icon} />
          ) : (
            <img
              src='/close2.svg'
              alt='close image'
              className={styles.icon}
              onClick={clearInput}
            />
          )}
        </div>
      </div>
      <div className={styles.dataResult}>
        {(filteredData.length !== 0 || filteredDataNews.length !== 0) && (
          <>
            <div className={styles.titleDiv}>
              <p className={styles.titles}>TITLES</p>
            </div>
            {filteredData.map((value, index) => {
              return (
                <a
                  key={value.isbn13}
                  className={styles.dataItem}
                  href={`category/cloud/${value.isbn13}`}
                >
                  <p>
                    {xsm
                      ? value?.title.length > 44
                        ? value?.title.substring(0, 43 - 3) + '...'
                        : value?.title
                      : value?.title}
                  </p>
                </a>
              );
            })}
            {filteredDataNews.map((value, index) => {
              return (
                <a
                  key={value.isbn13}
                  className={styles.dataItem}
                  href={`category/newTitles/${value.isbn13}`}
                >
                  <p>
                    {xsm
                      ? value?.title.length > 44
                        ? value?.title.substring(0, 43 - 3) + '...'
                        : value?.title
                      : value?.title}
                  </p>
                </a>
              );
            })}
          </>
        )}
        {(filteredIsbn.length !== 0 || filteredIsbnNews.length !== 0) && (
          <>
            <div className={styles.titleDiv}>
              <p className={styles.titles}>ISBN + TITLE</p>
            </div>

            {filteredIsbn.map((value, index) => {
              return (
                <a
                  key={value.isbn13}
                  className={styles.dataItem}
                  href={`category/cloud/${value.isbn13}`}
                >
                  <p>
                    {value.isbn13} - {value.title}
                  </p>
                </a>
              );
            })}
            {filteredIsbnNews.map((value, index) => {
              return (
                <a
                  key={value.isbn13}
                  className={styles.dataItem}
                  href={`category/cloud/${value.isbn13}`}
                >
                  <p>
                    {value.isbn13} - {value.title}
                  </p>
                </a>
              );
            })}
          </>
        )}
        {filteredCategory.length !== 0 && (
          <>
            <div className={styles.titleDiv}>
              <p className={styles.titles}>CATEGORY</p>
            </div>

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
          </>
        )}
      </div>
    </div>
  );
}

export default Search;

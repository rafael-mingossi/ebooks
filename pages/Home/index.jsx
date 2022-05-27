import prisma from '../../lib/prisma';
import Link from 'next/link';
import styles from './styles.module.scss';
import { category, others } from '../../utils/category';
import { requireAuthentication } from '../../utils/requireAuthentication';

import { CatCard, SearchBar, MarqueeWrapper } from '/src/components';

export default function Home({ data, cloud }) {
  //const news = [...data.books, ...cloud.books];

  return (
    <div className={styles.main}>
      <Link href={`category/newTitles`}>
        <h1 className={styles.title} style={{ cursor: 'pointer' }}>
          LAST ADDED
        </h1>
      </Link>
      <MarqueeWrapper>
        {data?.books?.map((book, index) => (
          <div className={styles.marquee} key={index}>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <Link href={`category/newTitles/${book.isbn13}`}>
              <img src={book.image} alt='book image' className={styles.img} />
            </Link>
          </div>
        ))}
      </MarqueeWrapper>

      <SearchBar
        placeholder='Enter a book Title, ISBN, Category'
        data={cloud}
        data2={data}
      />

      <h1 className={styles.title}>POPULAR TECH CATEGORIES</h1>
      <div className={styles.line} />
      <div className={styles.categories}>
        {category.map((cat) => (
          <CatCard
            key={cat?.id}
            img1={cat?.img1}
            img2={cat?.img2}
            img3={cat?.img3}
            title={cat?.title}
            link={cat?.link}
          />
        ))}
      </div>

      <h1 className={styles.title}>OTHER BOOKS CATEGORIES</h1>
      <div className={styles.line} />
      <div className={styles.categories}>
        {others.map((cat) => (
          <CatCard
            key={cat?.id}
            img1={cat?.img1}
            img2={cat?.img2}
            img3={cat?.img3}
            title={cat?.title}
            link={cat?.link}
          />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = requireAuthentication(async (context) => {
  // Fetch data from external API
  const res = await fetch(`https://api.itbook.store/1.0/new`);
  const data = await res.json();
  const clo = await fetch(`https://api.itbook.store/1.0/search/cloud`);
  const cloud = await clo.json();

  // Pass data to the page via props
  return { props: { data, cloud } };
});

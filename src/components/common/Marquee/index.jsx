import Marquee from 'react-fast-marquee';
import styles from './styles.module.scss';

const MarqueeWrapper = ({ children }) => {
  return (
    <Marquee gradient={false} className={styles.container} speed={70}>
      {children}
    </Marquee>
  );
};

export default MarqueeWrapper;

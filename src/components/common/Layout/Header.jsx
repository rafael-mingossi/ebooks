import styles from "./layout.module.scss";

import React from "react";

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerH1Wrapper}>
        <span className={styles.allLib}>All Library</span>
        <span className={styles.cloud}>Cloud-based Learning Platform</span>
        <button className={styles.btnDisc}>Discover More</button>
      </div>
    </div>
  );
};

export default Header;

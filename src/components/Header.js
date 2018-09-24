import React from 'react';
import styles from './Header.css';

const Header = () => (
  <div className={styles.Header}>
    <img className={styles.logo} src="src/images/icon.svg"/>
    <div className={styles.title}>Phorg</div>
    <div className={styles.subtitle}>A photo organisation app</div>
    <div className={styles.info}>Organises JPEG photos based on the date they were taken. Non-destructive, and creates directories as they are needed.</div>
  </div>
);

export default Header;

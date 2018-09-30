import React from 'react';
import styles from './Help.css';

const Help = ({display, toggleDisplay}) => (
  <div className={`${styles.box} ${display ? styles.shown : ''}`} onClick={toggleDisplay}>
    <div className={styles.Help}>
      <h3>Rules</h3>
      <div className={styles.key}>
        <div>$Y</div>
        <div>Full Year</div>
        <div>$y</div>
        <div>Year</div>
        <div>$M</div>
        <div>Month</div>
        <div>$D</div>
        <div>Day</div>
        <div>$H</div>
        <div>Hours</div>
        <div>$m</div>
        <div>$Minutes</div>
        <div>$S</div>
        <div>Seconds</div>
      </div>
      <div className={styles.folderInfo}>Use / to create subfolders. For example, given the datetime '2015-05-16 16:46:22', the pattern '$Y/$M/' will create subfolders named '2015/05/'</div>
      <div className={styles.notAllowed}>The following characters are not allowed in file names and will be replaced with underscores &lt;, &gt;, :, ", \, |, ?, *</div>
    </div>
  </div>
);

export default Help;

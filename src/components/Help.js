import React from 'react';
import styles from './Help.css';

const Help = ({display}) => (
  <div className={`${styles.Help} ${display ? styles.shown : ''}`}>
    <table className={styles.rules}>
      <thead>
      <tr>
        <th colSpan="14">Rules</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>$Y</td>
        <td>Full Year</td>
        <td>$y</td>
        <td>Year</td>
        <td>$M</td>
        <td>Month</td>
        <td>$D</td>
        <td>Day</td>
        <td>$H</td>
        <td>Hours</td>
        <td>$m</td>
        <td>$Minutes</td>
        <td>$S</td>
        <td>Seconds</td>
      </tr>
      </tbody>
    </table>
    <div className={styles.folderInfo}>Use / to create subfolders. For example, given the datetime '2015-05-16 16:46:22', the pattern '$Y/$M/' will create subfolders named '2015/05/'</div>
    <div className={styles.notAllowed}>The following characters are not allowed in file names and will be replaced with underscores &lt;, &gt;, :, ", \, |, ?, *</div>
  </div>
);

export default Help;

import React from 'react';
import styles from './Main.css'

const Main = ({toggleHelp}) => (
  <table className={styles.Main}>
    <tbody>
      <tr>
        <td className={styles.label}>Source</td>
        <td>
          <div className={`${styles.textbox} ${styles.srcText}`}>
            <em style={{color:'#555'}}>Please select a source directory</em>
          </div>
        </td>
        <td>
          <div className={`${styles.button} ${styles.srcButton}`} onclick="openFile('src')">
            <img src="src/images/folder.svg"/>
          </div>
        </td>
      </tr>
      <tr>
        <td className={styles.label}>Destination</td>
        <td>
          <div className={`${styles.textbox} ${styles.destText}`}>
            <em style={{color:'#555'}}>Please select a destination directory</em>
          </div>
        </td>
        <td>
          <div className={`${styles.button} ${styles.destButton}`} onclick="openFile('dest')">
            <img src="src/images/folder.svg"/>
          </div>
        </td>
      </tr>
      <tr>
        <td className={styles.label}>Format</td>
        <td><input className={styles.patternBox} type="text" name="pattern" placeholder="Please set the file pattern"/></td>
        <td>
          <div className={`${styles.button} ${styles.help}`}>
            <img src="src/images/info.svg" onClick={toggleHelp}/>
          </div>
        </td>
      </tr>
      <tr>
        <td className={styles.label}>Demo</td>
        <td><div className={styles.patternDemo}></div></td>
        <td></td>
      </tr>
    </tbody>
  </table>
);

export default Main;

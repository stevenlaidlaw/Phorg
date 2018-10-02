import React from 'react';
import styles from './Main.css'

const Main = ({toggleHelp, srcDir, destDir, pattern, example, onSrcDir, onDestDir, onPatternChange, processFiles}) => (
  <div className={styles.Main}>
    <div className={styles.row}>
      <div className={styles.label}>Source</div>
      <input disabled value={srcDir} placeholder="Please select a source directory"/>
      <div className={styles.button} onClick={onSrcDir}>
        <img src="src/images/folder.svg"/>
      </div>
    </div>
    <div className={styles.row}>
      <div className={styles.label}>Destination</div>
      <input disabled value={destDir} placeholder="Please select a destination directory"/>
      <div className={styles.button} onClick={onDestDir}>
        <img src="src/images/folder.svg"/>
      </div>
    </div>
    <div className={styles.row}>
      <div className={styles.label}>Format</div>
      <input className={styles.editable} value={pattern} placeholder="Please set the file pattern" onChange={onPatternChange}/>
      <div className={styles.button} onClick={toggleHelp}>
        <img src="src/images/info.svg"/>
      </div>
    </div>
    <div className={styles.row}>
      <div className={styles.label}>Demo</div>
      <input disabled className={styles.patternDemo} value={example} placeholder="Update the file pattern to see an example here"/>
    </div>
    <div className={styles.row}>
      <button onClick={processFiles}>Start</button>
    </div>
  </div>
);

export default Main;

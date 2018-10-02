import React, {Component} from 'react';
import styles from './App.css';
import {remote} from 'electron';

import {patternDateReplace, processFiles} from '../utils';

import Header from './Header';
import Help from './Help';
import Main from './Main';

class App extends Component {
  constructor() {
    super();

    this.toggleHelp = this.toggleHelp.bind(this);
    this.onSrcDir = this.onSrcDir.bind(this);
    this.onDestDir = this.onDestDir.bind(this);
    this.onPatternChange = this.onPatternChange.bind(this);
    this.processFiles = this.processFiles.bind(this);

    this.state = {
      displayHelp: false,
      srcDir: '',
      destDir: '',
      pattern: '',
      example: ''
    }
  }

  toggleHelp() {
    this.setState({
      displayHelp: !this.state.displayHelp
    })
  }

  onSrcDir() {
    remote.dialog.showOpenDialog({properties:['openDirectory']}, (data) => {
      if (data !== undefined) {
        this.setState({
          srcDir: data[0]
        })
      }
    });
  }

  onDestDir() {
    remote.dialog.showOpenDialog({properties:['openDirectory']}, (data) => {
      if (data !== undefined) {
        this.setState({
          destDir: data[0]
        })
      }
    });
  }

  onPatternChange(e) {
    const pattern = e.target.value;
    const example = patternDateReplace(pattern, new Date());

    this.setState({
      pattern,
      example
    });
  }

  async processFiles() {
    const {srcDir, destDir, pattern} = this.state;

    if (srcDir.length < 1) {
      alert("Please enter a source directory");
    } else if (destDir.length < 1) {
      alert("Please enter a destination directory");
    } else if (srcDir === destDir) {
      alert("Source and destination directories must not be the same")
    } else {
      await processFiles(srcDir, destDir, pattern);
    }
  }

  render() {
    const {displayHelp, srcDir, destDir, pattern, example} = this.state;
    return (
      <div className={styles.App}>
        <Header/>
        <Main 
          srcDir={srcDir}
          destDir={destDir}
          pattern={pattern}
          example={example}
          onSrcDir={this.onSrcDir}
          onDestDir={this.onDestDir}
          onPatternChange={this.onPatternChange}
          processFiles={this.processFiles}
          toggleHelp={this.toggleHelp}
        />
        <Help display={displayHelp} toggleDisplay={this.toggleHelp}/>
      </div>
    )
  }
}

export default App;

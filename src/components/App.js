import React, {Component} from 'react';
import styles from './App.css';
import fs from 'fs-extra';
import path from 'path';
import {ExifImage} from 'exif';
import {remote} from 'electron';

import Header from './Header';
import Help from './Help';
import Main from './Main';

class App extends Component {
  constructor() {
    super();

    this.toggleHelp = this.toggleHelp.bind(this);

    this.state = {
      displayHelp: false,
    }
  }

  toggleHelp() {
    this.setState({
      displayHelp: !this.state.displayHelp
    })
  }

  render() {
    const {displayHelp} = this.state;
    return (
      <div className={styles.App}>
        <Header/>
        <Main toggleHelp={this.toggleHelp}/>
        <Help display={displayHelp} toggleDisplay={this.toggleHelp}/>
      </div>
    )
  }
}

export default App;

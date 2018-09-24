import React, {Component} from 'react';
import styles from './App.css';

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
        <Help display={displayHelp}/>
      </div>
    )
  }
}

export default App;

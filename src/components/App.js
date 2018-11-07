import React, {Component} from 'react';
import 'react-dates/initialize';
import '../styles.scss';

import Header from './header/Header';
import Main from './Main';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}

export default App;
import { BrowserRouter } from 'react-router';
import React from 'react';
import Main from './Main';
import Footer from './layout/Footer';
import Header from './layout/Header';

const App = React.createClass({
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Main />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
});

export default App;

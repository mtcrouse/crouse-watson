import { BrowserRouter } from 'react-router';
import React from 'react';
import Main from './Main';
import Footer from './layout/Footer';

const App = React.createClass({
  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
});

export default App;

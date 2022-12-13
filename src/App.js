import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Components from './components/Components';

class App extends React.Component {
  render() {
    return (
      <section>
        <h1>TrybeTunes</h1>
        <BrowserRouter>
          <Components />
        </BrowserRouter>
      </section>
    );
  }
}

export default App;

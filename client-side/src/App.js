import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'semantic-ui-react';
import Header from './component/header/Header';
import Widgets from './component/Widgets/Widget';
import Home from './component/Home/Home';
import NewWidget from './component/Widgets/NewWidget';
import configureStore from './store';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path="/" component={Home} />
              <Route path="/widgets" component={Widgets} />
              <Route path="/widget/new" component={NewWidget} />
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './apollo/client';
import AuthorsList from './components/AuthorsList';
import CreateAuthorForm from './components/CreateAuthorForm';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <CreateAuthorForm />
          <AuthorsList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

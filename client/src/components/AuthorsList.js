import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const AuthorQuery = gql`
  query authors{
    authors{
      id
      name
      yearOfBirth
      gender
    }
  }
`;

const AuthorsList = () => {
  return (
    <Query query={AuthorQuery}>
      {({data, loading}) => {
        if (loading) {
          return (<div>Loading</div>)
        }
        return (
          <ul>
            {data.authors.map(author => (
              <li key={author.id}>
                <p>Author name: {author.name}</p>
                <p>Year of Birth: {author.yearOfBirth}</p>
                <p>Gender: {author.gener ? 'male' : 'female'}</p>
              </li>
            ))}
          </ul>
        )
      }}
    </Query>
  )
};

export default AuthorsList;
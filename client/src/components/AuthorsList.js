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

const CreateAuthorSubscription = gql`
  subscription authorCreated {
    authorCreated {
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
      {({data, loading, subscribeToMore}) => {
        if (loading) {
          return (<div>Loading</div>)
        }
        const more = () => subscribeToMore({
          document: CreateAuthorSubscription,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newAuthor = subscriptionData.data.authorCreated;
            return {
              authors: [...prev.authors, newAuthor],
            }
          }
        })
        return (<Authors authors={data.authors} subscribeToNewAuthor={more} />)
      }}
    </Query>
  )
};

class Authors extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewAuthor();
  }
  render() {
    const { authors } = this.props;
    return (
      <ul>
        {authors.map(author => (
          <li key={author.id}>
            <p>Author name: {author.name}</p>
            <p>Year of Birth: {author.yearOfBirth}</p>
            <p>Gender: {author.gender ? 'Male' : 'Female'}</p>
          </li>
        ))}
      </ul>
    )
  }
}

export default AuthorsList;
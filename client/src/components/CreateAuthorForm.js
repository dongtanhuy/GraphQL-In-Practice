import React from 'react';
import {
  compose,
  withState,
  withHandlers,
} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const CreateAuthorMutation = gql`
  mutation createAuthor(
    $name: String!,
    $yearOfBirth: Int!,
    $gender: Boolean
  ) {
    createAuthor(
      name: $name,
      yearOfBirth: $yearOfBirth,
      gender: $gender
    ) {
      id
      name
      yearOfBirth
      gender
    }
  }
`;

const CreateAuthorForm = ({
  onSubmit,
  name,
  yearOfBirth,
  gender,
  onChangeName,
  onChangeYOB,
  onChangeGender
}) => {
  return (
    <div>
      <fieldset>
        <legend><label htmlFor="name">Name:</label></legend>
        <input type="text" id="name" value={name} onChange={e => onChangeName(e.target.value)} />
      </fieldset>
      <fieldset>
        <legend><label htmlFor="yob">Year of Birth:</label></legend>
        <input type="number" id="yob" value={yearOfBirth} onChange={e => onChangeYOB(e.target.value)} />
      </fieldset>
      <fieldset>
        <legend><label htmlFor="gender">Gender:</label></legend>
        <input type="checkbox" name="gender" checked={gender} onChange={e => onChangeGender(Boolean(e.target.checked))} /> Male
      </fieldset>
      <button onClick={() => onSubmit()}>Create Author</button>
    </div>
  )
}

const CreateAuthorFormContainer = compose(
  graphql(CreateAuthorMutation, {name: 'createAuthor'}),
  withState('name', 'setName', ''),
  withState('yearOfBirth', 'setYOB', 1900),
  withState('gender', 'setGender', true),
  withHandlers({
    onChangeName: ({ setName }) => val => setName(val),
    onChangeYOB: ({ setYOB }) => val => setYOB(parseInt(val)),
    onChangeGender: ({ setGender }) => val => setGender(val),
    onSubmit: ({
      createAuthor,
      name,
      yearOfBirth,
      gender,
    }) => async () => {
      try {
        await createAuthor({
          variables: {
            name, yearOfBirth, gender,
          }
        });
      } catch(error) {
        console.log(error);
        alert(error.message);
      }
    },
  }),
);
export default CreateAuthorFormContainer(CreateAuthorForm);

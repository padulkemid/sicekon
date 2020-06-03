import gql from "graphql-tag";

export const REGISTER = gql`
mutation register($input: UserRegister!) {
    register(input: $input) {
        result
    }
}`;

export const LOGIN = gql`
mutation login($input: UserLogin!) {
    login(input: $input) {
        username
        email
        sex
        age
        result
    }
}`;

export const LOGOUT = gql`
mutation logout {
    logout {
        result
    }
}`;

export const GET_HISTORY = gql`
query getHistory {
    getHistory {
      email
      conditions
      date
    }
}`;

export const CREATE_HISTORY = gql`
mutation createHistory($input: NewHistory!) {
    createHistory(input: $input) {
      email
      conditions
      date
    }
}`;
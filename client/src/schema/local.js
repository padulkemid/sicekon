import gql from "graphql-tag";

export const GET_USER_DATA = gql`
    {
        userData @client{
            email
            username
            sex
            age
        }
    }
`

export const SET_USER_DATA = gql`
    mutation setUserData($userData: USERDATA){
        setUserData(userData: $userData) @client{
            userData
        }
    }
`

export const GET_AGE_GENDER = gql`
    {
        ageGender @client{
            id
            label
        }
    }
`

export const SET_AGE_GENDER = gql`
    mutation setAgeGender($ageGender: AGEGENDER){
        setAgeGender(ageGender: $ageGender) @client{
            ageGender
        }
    }
`

export const GET_SYMPTOMS = gql`
    {
        symptoms @client{
            id
            label
        }
    }
`

export const SET_SYMPTOMS = gql`
    mutation setSymptoms($symptoms: SYMPTOMS){
        setSymptoms(symptoms: $symptoms) @client{
            symptoms
        }
    }
`
import { gql } from "@apollo/client";

export const ME_QUERY = gql`
query MeQuery {
    me {
        id
        email
        name
        phone
        nickname
        role
        verified
        hasChannel
        profile
    }
}
`;

export const CHECK_OPEN_ALERT_QUERY = gql`
    query CheckOpenAlertQuery($input: CheckOpenAlertInput!){
        checkOpenAlert(
            input: $input
        )
    }
`
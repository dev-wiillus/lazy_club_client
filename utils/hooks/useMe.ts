import { gql, useQuery } from "@apollo/client";
import { MeQuery } from "../../__generated__/MeQuery";

const ME_QUERY = gql`
query MeQuery {
    me {
        id
        email
        name
        phone
        nickname
        role
        verified
    }
}
`;

const useMe = () => {
    return useQuery<MeQuery>(ME_QUERY);
}

export default useMe
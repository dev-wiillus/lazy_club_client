import { useQuery } from "@apollo/client";
import { ME_QUERY } from "services/user/gql";
import { MeQuery } from "../../__generated__/MeQuery";

const useMe = () => {
    return useQuery<MeQuery>(ME_QUERY);
}

export default useMe
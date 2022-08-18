import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from "apollo-upload-client";
import { LOCALSTORAGE_TOKEN } from './utils/constants';
import { UserRoleType } from './__generated__/globalTypes';

const token = typeof window !== 'undefined' ? localStorage.getItem(LOCALSTORAGE_TOKEN) : null

export const isLoggedInVar = makeVar(Boolean(token));
export const authToken = makeVar(token);
export const roleModeVar = makeVar<UserRoleType | null>(null)
export const modaleVar = makeVar<boolean>(false)

const httpLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`
})

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "x-jwt": authToken() || ''
  }
}))

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            }
          },
          token: {
            read() {
              return authToken();
            }
          },
          roleMode: {
            read() {
              return roleModeVar()
            }
          },
        }
      }
    }
  }),
});
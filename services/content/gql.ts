import { gql } from "@apollo/client";

export const FIND_CONTENT_QUERY = gql`
	query FindContent($input: FindContentInput!) {
		findContent(input: $input) {
			ok
			error
			results {
				id
				title
				content
				status
			}
		}
	}
`;

export const CREATE_CONTENT_MUTATION = gql`
	mutation CreateContent($input: CreateContentInput!) {
		createContent(input: $input) {
			ok
			error
			results {
				id
				title
				content
				status
			}
		}
	}
`;

export const EDIT_CONTENT_MUTATION = gql`
	mutation EditContent($input: EditContentInput!) {
		editContent(input: $input) {
			ok
			error
			results {
				id
				title
				content
				status
			}
		}
	}
`;

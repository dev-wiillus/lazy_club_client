import { gql } from "@apollo/client";

export const CREATE_CONTENT_FILE_MUTATION = gql`
	mutation CreateContentFile($input: CreateContentFileInput!) {
		createContentFile(input: $input) {
			ok
			error
			result {
				id
				file
				isPreview
			}
		}
	}
`;

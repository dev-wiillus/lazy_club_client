import { gql } from "@apollo/client";

export const FIND_ALL_CHANNEL_QUERY = gql`
    query FindAllChannel($input: FindAllChannelInput!) {
        findAllChannel(input: $input) {
            ok 
            error
            totalPages
            totalResults
            results {
                id
                title
                thumbnail
                operators {
                    user {
                        name
                        nickname
                    }
                }
                categories {
                    tag {
                        name
                    }
                }
            }
        }
    }
`;


export const FIND_CHANNEL_QUERY = gql`
	query FindChannel($input: FindChannelInput!) {
		findChannel(input: $input) {
			ok
			error
			results {
				id
				title
				description
				thumbnail
				operators {
					user {
						name
						nickname
					}
				}
				categories {
					tag {
						id
						name
					}
				}
				contents {
					id
					title
					category
					hit
					contentFiles {
						file
						isPreview
					}
				}
				agentNickname
				agentProfile
				agentIntroduction
				termsOfService
				agreements
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

export const FIND_ALL_TAG_OPTIONS = gql`
	query FindAllTagOptions {
		findAllTagOptions {
			ok
			error
			results {
				value
				label
			}
		}
	}
`;

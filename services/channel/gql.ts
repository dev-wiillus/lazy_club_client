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
				agentIntroduction
				termsOfService
				agreements
			}
		}
	}
`;

export const CREATE_CHANNEL_MUTATION = gql`
	mutation CreateChannel(
		$channelInput: CreateChannelInput!
		$channelOperatorInput: InviteChannelOperatorInput!
	) {
		createChannel(
			channelInput: $channelInput
			channelOperatorInput: $channelOperatorInput
		) {
			ok
			error
			result {
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
				agentIntroduction
				termsOfService
				agreements
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

export const OPEN_ALERT_MUTATION = gql`
	mutation OpenAlert(	$input: OpenAlertInput!) { 
		openAlert(input: $input	) {
			ok
			error
		}
	}
`;

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
				description
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
				alertsCount
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
				hasDraftContent
				alertsCount
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
				hasDraftContent
				alertsCount
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

export const UPLOAD_USER_FILE_MUTATION = gql`
	mutation UploadUserFile($input: UploadUserFileInput!){
		uploadUserFile(input: $input){
			ok
			error
			filePath
		}
	}
`

export const UPLOAD_CHANNEL_FILE_MUTATION = gql`
	mutation UploadChannelFile($input: UploadChannelFileInput!){
		uploadChannelFile(input: $input){
			ok
			error
			filePath
		}
	}
`
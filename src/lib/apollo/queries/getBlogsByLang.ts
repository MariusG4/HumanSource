import { gql } from "@apollo/client";

const query = gql`
	query Blogs($where: BlogWhereInput!) {
		blogs(where: $where) {
			id
			slug
			dateCreated
			title
			author {
				name
			}
			tags {
				name
			}
			categories {
				name
			}

			content {
				document
			}
			photo {
				altText
				filename
				id
				image {
					url
					height
					filesize
					extension
					id
					width
				}
			}
		}
	}
`;
export default query;
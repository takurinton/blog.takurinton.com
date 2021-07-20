import { gql } from '@apollo/client/core/core.cjs.js';

export const POST_QUERY = gql`
	query postQuery($id: Int) {
		getPost(id: $id) {
			id
			title
			contents
			pub_date
			category
		}
	}
`;

export const POSTS_QUERY = gql`
	query postsQuery($pages: Int, $category: String) {
		getPosts(page: $pages, category: $category) {
			current
			next
			previous
			category
			results {
				id
				title
				contents
				category
				pub_date
			}
		}
	}
`;

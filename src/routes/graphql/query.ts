import { gql } from '@apollo/client/core';

export const POST_QUERY = gql`
query postQuery($id: Int){
  getPost (id: $id){
    id
    title
    contents
    pub_date
  }
}
`

export const POSTS_QUERY = gql`
query postQuery($page: Int, $category: String){
  getPosts (page: $page, category: $category){
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
`
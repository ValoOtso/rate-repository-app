import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          fullName
          forksCount
          ownerAvatarUrl
          id
          language
          name
          description
          ownerName
          ratingAverage
          reviewCount
          stargazersCount
          url
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      fullName
      forksCount
      ownerAvatarUrl
      id
      language
      name
      description
      ownerName
      ratingAverage
      reviewCount
      stargazersCount
      url
    }
  }
`;

export const GET_REVIEWS = gql`
  query ($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation ($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation ($user: CreateUserInput!) {
    createUser(user: $user) {
      createdAt
      id
      username
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      repositoryId
      text
      rating
      createdAt
      user {
        id
        username
      }
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;

export const ME = gql`
  query me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            createdAt
            user {
              username
            }
            id
            rating
            text
            repository {
              name
              ownerName
              id
            }
          }
        }
      }
    }
  }
`;

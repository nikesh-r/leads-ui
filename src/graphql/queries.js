import { gql } from "@apollo/client";

export const GET_ALL_PROFILES = gql`
  query GetAllProfiles(
    $orderBy: globalOrderBy
    $searchString: String
    $rows: Int
    $page: Int
  ) {
    getAllProfiles(
      orderBy: $orderBy
      searchString: $searchString
      rows: $rows
      page: $page
    ) {
      size
      profiles {
        id
        first_name
        last_name
        email
        is_verified
        image_url
        description
      }
    }
  }
`;

export const GET_PROFILE_BY_ID = gql`
  query GetProfileById($getProfileByIdId: String!) {
    getProfileById(id: $getProfileByIdId) {
      id
      first_name
      last_name
      email
      is_verified
      image_url
      description
    }
  }
`;

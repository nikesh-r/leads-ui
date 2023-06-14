import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ALL_PROFILES } from "../graphql/queries";
import Header from "./Header";
import { TextField } from "@mui/material";
import ListView from "./ListView";
import { DELETE_PROFILE } from "../graphql/mutations";

const Home = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { data: allUsers, loading } = useQuery(GET_ALL_PROFILES, {
    variables: {
      orderBy: {
        key: "is_verified",
        sort: "desc",
      },
      rows: rowsPerPage,
      page: page,
      searchString: "",
    },
  });

  const [
    handleDeleteProfile,
    {
      data: deleteProfileData,
      loading: deleteProfileLoading,
      error: deleteProfileError,
    },
  ] = useMutation(DELETE_PROFILE);
  console.log({ deleteProfileData });

  const [search, setSearch] = useState("");
  return (
    <div className="w-full">
      <Header />

      {loading && (
        <div className="h-[500px] w-full p-10 flex justify-center items-center">
          ...loading
        </div>
      )}
      {!loading && allUsers && (
        <div className="w-4/5 mx-auto p-10 flex flex-col items-center">
          <div className="w-full flex items-center">
            <input
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ListView
            allUsers={allUsers}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
            handleRemoveProfile={handleDeleteProfile}
          />
        </div>
      )}
    </div>
  );
};

export default Home;

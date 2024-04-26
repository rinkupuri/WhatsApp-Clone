import React from "react";
import UserHeaders from "../Headers/UserHeaders";
import SearchBar from "../SearchBar/SearchBar";
import Chats from "../Chats/Chats";

const UserPart = () => {
  return (
    <>
      <UserHeaders />
      <SearchBar />
      <Chats />
    </>
  );
};

export default UserPart;

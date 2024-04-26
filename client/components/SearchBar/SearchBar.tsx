"use client";
import { GoSearch } from "react-icons/go";
import { IoIosMailUnread } from "react-icons/io";
import { Separator } from "../ui/separator";
import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "@/redux/Apis/users.api";
import { Avatar } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetUserQuery(search);
  const [users, setUsers] = useState([
    {
      name: "",
      email: "",
    },
  ]);
  useEffect(() => {
    setUsers(data);
  }, [data, isLoading]);
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearch(text);
  };
  return (
    <div className="w-full flex flex-col justify-center items-center h-[60px]">
      <div className="w-full flex  justify-center items-center h-[60px]">
        <div className="flex relative p-2 w-9/12 rounded-md ring-1 ring-black/80">
          <GoSearch size={20} />
          <input
            value={search}
            onChange={handelChange}
            type="text"
            placeholder="Search"
            className="w-full bg-transparent border-none outline-none focus:outline-none h-full px-4"
          />
          <Card className="absolute hidden z-[99999] top-[35px] rounded-sm left-0 w-full h-[350px]">
            <CardContent>
              {users?.map((value, index) => (
                <div key={index} className="flex cursor-pointer mt-4 w-full">
                  <Avatar className="w-10 z-[999999] h-10 rounded-full  flex justify-center items-center">
                    <AvatarFallback>
                      {value?.name
                        ?.split(" ")
                        .map((value) => {
                          const v = value.split("")[0];
                          return v;
                        })
                        .toString()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex mt-2 justify-normal items-start h-full w-full">
                    <p>{value?.name}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex m-2 ml-4 bg-slate-500 p-2 rounded-full">
          <IoIosMailUnread className="cursor-pointer" size={22} />
        </div>
      </div>

      <Separator />
    </div>
  );
};

export default SearchBar;

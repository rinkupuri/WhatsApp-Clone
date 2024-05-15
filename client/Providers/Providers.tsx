"use client";

import { useGetChatsQuery } from "@/redux/Apis/chat.api";
import { useGetUserQuery, useMeQuery } from "@/redux/Apis/users.api";
import { RootState } from "@/redux/Store";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user }: { user: any } = useSelector((state: RootState) => state.auth);
  const { data, isLoading } = useGetChatsQuery({});
  const { data: dataMe, isError, isLoading: meLoading } = useMeQuery({});
  useEffect(() => {
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register" &&
      !meLoading &&
      !dataMe?.id &&
      !isError
    ) {
      return redirect("/login");
    }
  }, [dataMe]);
  return <>{!isLoading && !meLoading && children}</>;
};

export default ProtectedRoute;

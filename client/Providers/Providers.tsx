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
  const { data: dataMe, isLoading: meLoading } = useMeQuery({});
  useEffect(() => {
    if (!meLoading) if (!dataMe?.id) return redirect("/login");
  }, [dataMe, meLoading]);
  return <>{!isLoading && !meLoading && user?.id ? children : ""}</>;
};

export default ProtectedRoute;

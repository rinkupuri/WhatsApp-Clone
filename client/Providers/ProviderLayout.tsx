"use client";

import { Provider } from "react-redux";
import React from "react";
import { Store } from "@/redux/Store";

const ProviderLayout = ({ children }: { children: any }) => {
  return (
    <>
      <Provider store={Store}>{children}</Provider>
    </>
  );
};

export default ProviderLayout;

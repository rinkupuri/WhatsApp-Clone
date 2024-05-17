import React from "react";
import { motion } from "framer-motion";

const FramerDiv = ({
  children,
  props,
}: {
  children: React.ReactNode;
  props: any;
}) => {
  return <motion.div {...props}></motion.div>;
};

export default FramerDiv;

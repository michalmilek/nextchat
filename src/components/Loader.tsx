import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarLoader } from "react-spinners";

const Loader = ({ loading }: { loading: boolean }) => {
  const loaderVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading)
    return (
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={loaderVariants}>
        <BarLoader
          color="#ffffff"
          loading={loading}
        />
      </motion.div>
    );

  return null;
};

export default Loader;

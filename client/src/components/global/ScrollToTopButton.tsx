import { motion } from "framer-motion";
import { BsArrowUpCircle } from "react-icons/bs";

export const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      onClick={scrollToTop}
      className="fixed top-4 z-50 right-4 p-2 bg-secondary text-white rounded-full shadow-lg transition-opacity hover:opacity-70"
    >
      <BsArrowUpCircle size={24} />
    </motion.button>
  );
};

import { motion } from "framer-motion";

export default function IntroScreen() {
  return (
    <motion.div
      className="intro"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.55, ease: "easeOut" },
      }}
    >
      <div className="intro-rings" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <motion.div
        className="intro-brand"
        initial={{ scale: 0.94 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.35, duration: 1.6, ease: "easeOut" }}
      >
        <motion.img
          className="intro-sax"
          src="/saxophone-neon.png"
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 1.8, ease: "easeOut" }}
        />
        <motion.span
          className="intro-name"
          initial={{ opacity: 0, y: 54 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 1.45, ease: "easeOut" }}
        >
          Ola the Saxophonist
        </motion.span>
      </motion.div>
      <img
        className="intro-equalizer"
        src="/equalizer.gif"
        alt=""
        aria-hidden="true"
      />
    </motion.div>
  );
}

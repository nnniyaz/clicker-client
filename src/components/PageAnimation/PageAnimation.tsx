import {motion} from "framer-motion";

const AnimatedPage = ({children}: { children: JSX.Element }) => {
    const animations = {
        initial: {opacity: 0},
        animate: {opacity: 1},
        exit: {opacity: 0},
    };

    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: .5}}
            className={"App"}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage;

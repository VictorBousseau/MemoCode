// Animation variants for Framer Motion
// Reusable across the entire application

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3 }
    }
};

export const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

export const slideRight = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export const scaleOnHover = {
    rest: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: {
        scale: 0.98
    }
};

export const pageTransition = {
    initial: { opacity: 0, x: 20 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: {
        opacity: 0,
        x: -20,
        transition: { duration: 0.3 }
    }
};

export const modalBackdrop = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.2 }
    }
};

export const drawer = {
    closed: { x: "-100%" },
    open: {
        x: 0,
        transition: {
            type: "spring",
            damping: 30,
            stiffness: 300
        }
    }
};

export const bottomSheet = {
    closed: { y: "100%" },
    open: {
        y: 0,
        transition: {
            type: "spring",
            damping: 30,
            stiffness: 300
        }
    }
};

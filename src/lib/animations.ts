// Shared animation variants for motion (framer-motion v12+)
// Standard easing: expo out [0.19, 1, 0.22, 1]

export const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;

export const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.8, ease: EASE_SMOOTH },
  },
};

export const fadeUpLarge = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 2.0, ease: EASE_SMOOTH },
  },
};

export const fadeUpSubtle = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.8, ease: EASE_SMOOTH },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.8, ease: EASE_SMOOTH },
  },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.8, ease: EASE_SMOOTH },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const staggerContainerWide = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

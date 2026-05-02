// Shared animation variants for motion (framer-motion v12+)
// Standard easing: expo out [0.19, 1, 0.22, 1]

export const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;

export const EASE_SMOOTH = [0.33, 1, 0.68, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_SMOOTH },
  },
};

export const fadeUpSubtle = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const staggerContainerWide = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Snappy ease-out for performance-critical sections (350–450ms range)
export const EASE_OUT_SNAPPY = [0.25, 0.46, 0.45, 0.94] as const;

export const fadeUpFast = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT_SNAPPY },
  },
};

export const fadeUpSubtleFast = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_OUT_SNAPPY },
  },
};

export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const useTransition = (options) => {
    let transitionStart = null;
    return () => {
        const time = new Date().getTime();
        if (!transitionStart) transitionStart = time;

        let transitionProgress = 100;
        if (transitionStart) transitionProgress = Math.round(((time - transitionStart) / options.duration) * 100);
        if (transitionProgress >= 100) transitionStart = null;

        const res = transitionProgress / 100;
        if (res > 1) return 1;
        return res;
    };
};

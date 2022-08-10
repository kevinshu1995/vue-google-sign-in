export default (isDebug: Boolean = false) => {
    // TODO detect environment is production or development
    if (window === undefined) return;
    if (isDebug === false) return;
    const _console: Console | undefined = window.console;

    return {
        ...Object.entries({ ...console }).reduce((acc, [key, value]) => {
            return {
                ...acc,
                [key]: value,
            };
        }, {}),
    };
};


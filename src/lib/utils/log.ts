export interface CustomConsole {
    [key: string]: Function;
}

export const Log = (isDebug: Boolean = false): CustomConsole | null => {
    // TODO detect environment is production or development
    if (window === undefined) return null;
    if (isDebug === false) return null;

    return {
        ...Object.entries({ ...console }).reduce((acc, [key, value]) => {
            return {
                ...acc,
                [key]: value,
            };
        }, {}),
    };
};

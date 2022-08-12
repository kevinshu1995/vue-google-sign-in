// abcdEfg -> abcd_efg
// AbcAAA -> abc_a_a_a (input is not camel)
// AbcAAA -> abc_a_a_a (input is not camel)
export const camelToSnake = (camelStr: string) => {
    return camelStr
        .split(/(?=[A-Z])/)
        .join("_")
        .toLowerCase();
};


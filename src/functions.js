export const getValues = (data, value) => {
    return data.map((item) => {
        return item[value];
    });
};

export const getUnique = (data, value) => {
    return [...new Set(getValues(data, value))];
};
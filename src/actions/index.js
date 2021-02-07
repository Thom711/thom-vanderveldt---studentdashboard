export const add_data = (data) => {
    return {
        type: "ADD_DATA",
        payload: data
    };
};

export const add_diff_ratings = (data) => {
    return {
        type: "ADD_DIFF_RATINGS",
        payload: data
    };
};

export const clear_diff_ratings = () => {
    return {
        type: "CLEAR_DIFF_RATINGS"
    };
};

export const add_fun_ratings = (data) => {
    return {
        type: "ADD_FUN_RATINGS",
        payload: data
    };
};

export const clear_fun_ratings = () => {
    return {
        type: "CLEAR_FUN_RATINGS"
    };
};

export const add_name_list = (data) => {
    return {
        type: "ADD_NAME_LIST",
        payload: data
    };
};

export const clear_name_list = () => {
    return {
        type: "CLEAR_NAME_LIST"
    };
};

export const change_filters = (value, checked) => {
    return {
        type: "FILTERS",
        payload: value,
        checked: checked
    };
};
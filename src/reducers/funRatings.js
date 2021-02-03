const funRatingsReducer = (state = [], action) => {
    switch(action.type) {
        case "ADD_FUN_RATINGS" :
            return  [...state, action.payload];
        case "CLEAR_FUN_RATINGS" :
            return [];
        default :
            return state;
    };
};

export default funRatingsReducer;
const difficultyRatingsReducer = (state = [], action) => {
    switch(action.type) {
        case "ADD_DIFF_RATINGS" :
            return  [...state, action.payload];
        case "CLEAR_DIFF_RATINGS" :
            return [];
        default :
            return state;
    };
};

export default difficultyRatingsReducer;
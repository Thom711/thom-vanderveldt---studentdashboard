const nameListReducer = (state = [], action) => {
    switch(action.type) {
        case "ADD_NAME_LIST" :
            return  [...state, action.payload];
        case "CLEAR_NAME_LIST" :
            return [];
        default :
            return state;
    };
};

export default nameListReducer;
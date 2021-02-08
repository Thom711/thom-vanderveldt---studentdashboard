const filtersReducer = (state = [], action) => {
    switch(action.type) {
        case "FILTERS" :
            if(action.checked) {
                return [...state, action.payload];
            };

            const newState = state.filter((item) => {
                return item !== action.payload;
            });

            return newState;
        default :
            return state;    
    };
};

export default filtersReducer;
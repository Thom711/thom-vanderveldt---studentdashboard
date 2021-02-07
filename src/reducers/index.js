import { combineReducers } from 'redux';
import studentDataReducer from './studentData';
import difficultyRatingsReducer from './difficultyRatings';
import funRatingsReducer from './funRatings';
import nameListReducer from './nameList';
import filtersReducer from './filters';

const allReducers = combineReducers({
    studentData: studentDataReducer,
    difficultyRatings: difficultyRatingsReducer,
    funRatings: funRatingsReducer,
    nameList: nameListReducer,
    filters: filtersReducer,
});

export default allReducers;
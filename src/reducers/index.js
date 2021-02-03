import { combineReducers } from 'redux';
import studentDataReducer from './studentData';
import difficultyRatingsReducer from './difficultyRatings';
import funRatingsReducer from './funRatings';
import nameListReducer from './nameList';

const allReducers = combineReducers({
    studentData: studentDataReducer,
    difficultyRatings: difficultyRatingsReducer,
    funRatings: funRatingsReducer,
    nameList: nameListReducer,
});

export default allReducers;
import { useDispatch, useSelector } from 'react-redux';
import Chart from '../components/Chart';
import { useEffect } from 'react/cjs/react.development';
import { add_diff_ratings, clear_diff_ratings, add_fun_ratings, clear_fun_ratings } from '../actions';
import { getUnique } from '../functions';

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const studentData = props.studentData;

    const difficultyRatings = useSelector(state => state.difficultyRatings);
    const funRatings = useSelector(state => state.funRatings);

    const getRatingPerAssignment = (assignment, whatRating) => {
        let length = 0;
        let totalRating = 0;
        studentData.forEach((item) => {
            if(item["Welke opdracht of welk project lever je nu in?"] === assignment) {
                const currentRating = parseInt(item[whatRating]);
                length++;
                totalRating = totalRating + currentRating;
            };
        });

        const averageRating = totalRating / length;

        return averageRating;
    };

    const setAverageRatings = () => {
        const uniqueAssignments = getUnique(studentData, "Welke opdracht of welk project lever je nu in?");

        dispatch(clear_diff_ratings());
        dispatch(clear_fun_ratings());

        uniqueAssignments.forEach((assignment) => {
            const difficultyRating = getRatingPerAssignment(assignment, "Hoe moeilijk vond je deze opdracht?");
            const funRating = getRatingPerAssignment(assignment, "Hoe leuk vond je deze opdracht?");

                dispatch(add_diff_ratings({
                    assignment: assignment,
                    difficultyRating: difficultyRating
                }));
    
                dispatch(add_fun_ratings({
                    assignment: assignment,
                    funRating: funRating
                }));
        });
    };

    useEffect(() => {
        if(studentData) {
            setAverageRatings();
        };
    }, [studentData]);

    return (
        <div>
            <Chart difficultyRatings={difficultyRatings} funRatings={funRatings}/>
        </div>
    );
};

export default Dashboard;
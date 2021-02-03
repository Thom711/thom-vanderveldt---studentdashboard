import { useDispatch, useSelector } from 'react-redux';
import Chart from '../components/Chart';
import { useEffect } from 'react/cjs/react.development';
import { add_diff_ratings, clear_diff_ratings, add_fun_ratings, clear_fun_ratings } from '../actions';

const StudentPage = (props) => {
    const dispatch = useDispatch();
    const studentName = props.student;
    const studentData = props.studentData;

    const difficultyRatings = useSelector(state => state.difficultyRatings);
    const funRatings = useSelector(state => state.funRatings);

    useEffect(() => {
        if(studentData) {
            dispatch(clear_diff_ratings());
            dispatch(clear_fun_ratings());

            studentData.filter((student) => {
                return student["Wie ben je?"] === studentName;
            }).forEach((item) => {
                dispatch(add_diff_ratings({
                    assignment: item["Welke opdracht of welk project lever je nu in?"],
                    difficultyRating: item["Hoe moeilijk vond je deze opdracht?"]
                }));

                dispatch(add_fun_ratings({
                    assignment: item["Welke opdracht of welk project lever je nu in?"],
                    funRating: item["Hoe leuk vond je deze opdracht?"]
                }));
            });
        };
    }, [studentData, studentName]);

    return (
        <div>
            <div>
                Hi {props.student}
            </div>
            <div>
                <Chart difficultyRatings={difficultyRatings} funRatings={funRatings}/>
            </div>
        </div>
        
    );
};

export default StudentPage;
import { useDispatch, useSelector } from 'react-redux';
import Chart from '../components/Chart';
import { useEffect } from 'react/cjs/react.development';
import { add_diff_ratings, clear_diff_ratings, add_fun_ratings, clear_fun_ratings, change_filters } from '../actions';
import { getUnique } from '../functions';

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const studentData = props.studentData;
    const nameList = props.nameList;
    const filters = useSelector(state => state.filters);

    const difficultyRatings = useSelector(state => state.difficultyRatings);
    const funRatings = useSelector(state => state.funRatings);

    const getRatingPerAssignment = (assignment, whatRating) => {
        let length = 0;
        let totalRating = 0;
        studentData.forEach((item) => {
            if (item["Welke opdracht of welk project lever je nu in?"] === assignment && filters.includes(item["Wie ben je?"])) {
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
        if (studentData) {
            setAverageRatings();
        };
    }, [studentData, filters]);

    const handleChange = (event) => {
        const checked = event.target.checked;
        const name = event.target.name;
        dispatch(change_filters(name, checked))
    };

    const mappedNames = nameList.map((name) => {
        return <label for={name.name}>
                    <input 
                        type="checkbox" 
                        name={name.name} 
                        onChange={handleChange} 
                        key={name.name} 
                        checked={filters.includes(name.name)}
                    />
                    {name.name}
                </label>
    });

    return (
        <div>
            <div>
                Zie de data van: {mappedNames} <br/>
                Selectbox voor sorteren van de bar chart op cijfers 0-9 of 9-0. <br/>
                Alternatieve barchart per opdracht met op de assen de cijfers en de namen van de studenten. <br/>
                Deze kan vervolgens gesorteerd worden op cijfers 0-9 of 9-0. <br/>
                Extra link in de header naar een tabel view.

            </div>
            <div>
                <Chart difficultyRatings={difficultyRatings} funRatings={funRatings}/>
            </div>
        </div>
    );
};

export default Dashboard;
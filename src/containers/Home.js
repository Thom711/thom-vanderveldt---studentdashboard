import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
import { add_diff_ratings, clear_diff_ratings, add_fun_ratings, clear_fun_ratings, add_name_list, clear_name_list } from '../actions';
import Chart from '../components/chart';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Home = (props) => {
    const dispatch = useDispatch();
    const studentData = props.studentData[0];

    const nameList = useSelector(state => state.nameList);
    const difficultyRatings = useSelector(state => state.difficultyRatings);
    const funRatings = useSelector(state => state.funRatings);

    const getValues = (value) => {
        return studentData.map((item) => {
            return item[value];
        });
    };

    const getUnique = (value) => {
        return [...new Set(getValues(value))];
    };

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
        const uniqueAssignments = getUnique("Welke opdracht of welk project lever je nu in?");

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

    const setStudentNames = () => {
        const uniqueNames = getUnique("Wie ben je?");

        dispatch(clear_name_list());

        uniqueNames.forEach((name) => {
            dispatch(add_name_list({
                name: name
            }));
        });
    };

    useEffect(() => {
        if(studentData) {
            setAverageRatings();
            setStudentNames();
        };
    }, [studentData]);

    const mappedLinks = nameList.map((item) => {
        return <li><Link to={`/${item.name}`} className="link" key={item.name}>{item.name}</Link></li>
    })

    return(
        <div>            
            <Router>
                <div className="container">
                    <nav>
                        <Link to="/" className="link" key="Home">Home</Link>
                        <ul className="links"> 
                            Ga naar: 
                                {mappedLinks}
                        </ul>
                    </nav>
                    <main>
                        <Switch>
                            <Route path="/">
                                <Chart difficultyRatings={difficultyRatings} funRatings={funRatings}/>
                            </Route>
                        </Switch>
                    </main>
                </div>
        </Router>
        </div>
    );
};

export default Home;
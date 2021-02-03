import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
import { add_name_list, clear_name_list } from '../actions';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getUnique } from '../functions';
import StudentPage from '../components/StudentPage';
import Dashboard from './Dashboard';

const Home = (props) => {
    const dispatch = useDispatch();
    const studentData = props.studentData[0];

    const nameList = useSelector(state => state.nameList);

    const setStudentNames = () => {
        const uniqueNames = getUnique(studentData, "Wie ben je?");

        dispatch(clear_name_list());

        uniqueNames.forEach((name) => {
            dispatch(add_name_list({
                name: name
            }));
        });
    };

    useEffect(() => {
        if(studentData) {
            setStudentNames();
        };
    }, [studentData]);

    const mappedLinks = nameList.map((item) => {
        return <li><Link to={`/${item.name}`} className="link" key={item.name}>{item.name}</Link></li>;
    });

    const mappedRoutes = nameList.map((item) => {
        return <Route path={`/${item.name}`}><StudentPage student={item.name} studentData={studentData}/></Route>
    });

    return(
        <div>            
            <Router>
                <div className="container">
                    <nav>
                        <Link to="/" className="link" key="Home">Home / Dashboard</Link>
                        <ul className="links"> 
                            Studenten Paginas: 
                                {mappedLinks}
                        </ul>
                    </nav>
                    <main>
                        <Switch>
                            {mappedRoutes}
                            <Route path="/">
                                <Dashboard studentData={studentData}/>
                            </Route>
                        </Switch>
                    </main>
                </div>
        </Router>
        </div>
    );
};

export default Home;
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
import { add_name_list, clear_name_list, change_filters } from '../actions';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getUnique } from '../functions';
import StudentPage from './StudentPage';
import Dashboard from './Dashboard';
import TableContainer from './TableContainer';

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

            dispatch(change_filters(name, true));
        });
    };

    useEffect(() => {
        if (studentData) {
            setStudentNames();
        };
    }, [studentData]);

    const mappedLinks = nameList.map((item) => {
        return <li><Link to={`/${item.name}`} className="link" key={item.name}>{item.name}</Link></li>;
    });

    const mappedRoutes = nameList.map((item) => {
        return <Route path={`/${item.name}`}><StudentPage student={item.name} studentData={studentData} /></Route>
    });

    return (
        <div>
            <Router>
                <div className="container">
                    <div className="nav-bar">
                        <nav>
                            <Link to="/" className="link" key="Home">Home / Dashboard</Link>
                            <Link to="/table" className="link right" key="table">Zie data als tabel</Link>
                            <ul className="links">
                                Persoonlijke Pagina's:
                                    {mappedLinks}
                            </ul>
                        </nav>
                    </div>

                    <main>
                        <Switch>
                            {mappedRoutes}
                            <Route path="/table">
                                <TableContainer studentData={studentData} nameList={nameList} key="table" />
                            </Route>
                            <Route path="/">
                                <Dashboard studentData={studentData} nameList={nameList} key="dashboard" />
                            </Route>
                        </Switch>
                    </main>
                </div>
            </Router>
        </div>
    );
};

export default Home;
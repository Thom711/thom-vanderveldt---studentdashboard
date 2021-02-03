import Papa from 'papaparse';
import { useSelector, useDispatch } from 'react-redux';
import { add_data } from '../actions';
import { useEffect } from 'react/cjs/react.development';
import '../App.css';
import Home from './Home';

const App = () => {
    const dispatch = useDispatch();
    const studentData = useSelector(state => state.studentData);

    useEffect(() => {
        async function getData() {
            const response = await fetch('studentData.csv');
            const reader = response.body.getReader();
            const result = await reader.read(); // raw array
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value); // the csv text
            const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta } 
            const rows = results.data // array of objects
            dispatch(add_data(rows));
        };

        getData();
    }, []);

    return (
        <div>
            <Home studentData={studentData}/>
        </div>
    );
};

export default App;

/* <Router>
<div className="container">
    <nav>
        <Link to="/" className="link">Home</Link>
        <ul className="links"> 
            Ga naar: 
            <li><Link to="/evelyn" className="link">Evelyn</Link></li>
            <li><Link to="/aranka" className="link">Aranka</Link></li>
            <li><Link to="/floris" className="link">Floris</Link></li>
            <li><Link to="/hector" className="link">Hector</Link></li>
            <li><Link to="/martina" className="link">Martina</Link></li>
            <li><Link to="/maurits" className="link">Maurits</Link></li>
            <li><Link to="/rahima" className="link">Rahima</Link></li>
            <li><Link to="/sandra" className="link">Sandra</Link></li>
            <li><Link to="/wietske" className="link">Wietske</Link></li>
            <li><Link to="/storm" className="link">Storm</Link></li>
        </ul>
    </nav>
    <main>
        <Switch>
            <Route path="/">
                <Home studentData={studentData}/>
            </Route>
        </Switch>
    </main>
</div>
</Router> */
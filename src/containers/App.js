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
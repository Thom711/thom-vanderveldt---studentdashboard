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
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value);
            const results = Papa.parse(csv, { header: true });
            const rows = results.data;
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
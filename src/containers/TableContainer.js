import Table from '../components/Table';
import { change_filters } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

const TableContainer = (props) => {
    const dispatch = useDispatch();
    const studentData = props.studentData;
    const nameList = props.nameList;
    const filters = useSelector(state => state.filters);

    const handleChange = (event) => {
        const checked = event.target.checked;
        const name = event.target.name;
        dispatch(change_filters(name, checked));
    };

    const mappedNames = nameList.map((name) => {
        return <label className="filter">
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
            <div className="flex">
                <div className="filters">
                    Filter op: {mappedNames} <br />
                </div>
            </div>

            <div className="table-container">
                <Table studentData={studentData} filters={filters} />
            </div>
        </div>
    );
};

export default TableContainer;
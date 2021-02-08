import React, { useState } from 'react';
import { setNewSortingMethod } from '../functions';

const Table = (props) => {
    const studentData = props.studentData;
    const filters = props.filters;

    const [sortingMethod, setSortingMethod] = useState('none');

    const handleChange = (event) => {
        setSortingMethod(event.target.value);
    };

    const mappedStudentData = studentData.sort((a, b) => {
       return setNewSortingMethod(sortingMethod, a, b);
    }).map((item) => {
        if (filters.includes(item["Wie ben je?"])) {
            return <tr>
                <td>{item["Wie ben je?"]}</td>
                <td>{item["Welke opdracht of welk project lever je nu in?"]}</td>
                <td>{item["Hoe moeilijk vond je deze opdracht?"]}</td>
                <td>{item["Hoe leuk vond je deze opdracht?"]}</td>
            </tr>
        };   
    });

    return (
        <div>
            <div className="flex chart-filters">
                Sorteer op: <select name="sort" onChange={handleChange}>
                    <option value="none">Niet sorteren</option>
                    <option value="name-az">Voornaam A-Z</option>
                    <option value="name-za">Voornaam Z-A</option>
                    <option value="assignment-az">Opdracht A-Z</option>
                    <option value="assignment-za">Opdracht Z-A</option>
                    <option value="diff-lowhigh">Hoe moeilijk? 1-5</option>
                    <option value="diff-highlow">Hoe moeilijk? 5-1</option>
                    <option value="fun-lowhigh">Hoe leuk? 1-5</option>
                    <option value="fun-highlow">Hoe leuk? 5-1</option>
                </select>
            </div>
            

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Wie ben je?</th>
                            <th>"Welke opdracht of welk project lever je nu in?"</th>
                            <th>"Hoe moeilijk vond je deze opdracht?"</th>
                            <th>"Hoe leuk vond je deze opdracht?"</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {mappedStudentData}
                    </tbody>
                </table>
            </div>
        </div>
        
    );
};

export default Table;
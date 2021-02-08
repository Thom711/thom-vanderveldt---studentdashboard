import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup, VictoryLine, VictoryLabel, VictoryLegend, Point } from 'victory';
import React, { useState } from 'react';

const Chart = (props) => {
    const difficultyRatings = props.difficultyRatings;
    const funRatings = props.funRatings;

    const [difficulty, setDifficulty] = useState(true);
    const [fun, setFun] = useState(true);
    const [line, setLine] = useState(false);

    const changeDifficulty = () => setDifficulty(!difficulty);
    const changeFun = () => setFun(!fun);
    const changeLine = () => setLine(!line);

    return (
        <div>
            <div className="flex">
                <div className="chart-filters">
                    <input type="checkbox" onChange={changeDifficulty} checked={difficulty} />Toon hoe moeilijk de opdracht was<br />
                    <input type="checkbox" onChange={changeFun} checked={fun} className="last-box" />Toon hoe leuk de opdracht was<br />
                    <input type="checkbox" onChange={changeLine} checked={line} className="last-box" />Transformeer in een Line chart<br />
                </div>
            </div>

            { line ?
                <div className="chart">
                    <VictoryChart
                        theme={VictoryTheme.material}
                        padding={{ top: 25, left: 100, bottom: 25, right: 120 }}
                    >
                        <VictoryLegend x={240} y={10}
                            orientation="vertical"
                            style={{ labels: { fontSize: 5} }}
                            data={[
                            { name: "Hoe moeilijk de opdracht was", symbol: { fill: "red" } },
                            { name: "Hoe leuk de opdracht was", symbol: { fill: "green" } },
                            ]}
                        />
                        <VictoryAxis
                            style={{ tickLabels: { fontSize: 3, padding: 2 } }}
                            invertAxis
                            label="Opdracht"
                            axisLabelComponent={
                                <VictoryLabel
                                    y={50}
                                    x={60}
                                />
                            }      
                        />
                        <VictoryAxis
                            dependentAxis
                            style={{ tickLabels: { fontSize: 3, padding: 2 } }}
                            orientation="top"
                            width={200}
                            tickValues={[1, 2, 3, 4, 5]}
                            label="Score"
                            axisLabelComponent={
                                <VictoryLabel
                                    y={15}
                                />
                            }  
                        />
                        <VictoryGroup
                            horizontal
                            offset={2}
                            style={{ data: { width: 2 } }}
                            colorScale={["red", "green"]}
                        >
                            <VictoryLine
                                data={difficultyRatings}
                                x="assignment"
                                y={(data) => {
                                    if (difficulty) {
                                        return data.difficultyRating;
                                    } else {
                                        return 0;
                                    };
                                }}
                            />
                            <VictoryLine
                                data={funRatings}
                                x="assignment"
                                y={(data) => {
                                    if (fun) {
                                        return data.funRating;
                                    } else {
                                        return 0;
                                    };
                                }}
                            />
                        </VictoryGroup>
                    </VictoryChart>
                </div>
                :
                <div className="chart">
                    <VictoryChart
                        theme={VictoryTheme.material}
                        padding={{ top: 25, left: 100, bottom: 25, right: 120 }}
                    >
                        <VictoryLegend x={240} y={10}
                            orientation="vertical"
                            style={{ labels: { fontSize: 5} }}
                            data={[
                            { name: "Hoe moeilijk de opdracht was", symbol: { fill: "red" } },
                            { name: "Hoe leuk de opdracht was", symbol: { fill: "green" } },
                            ]}
                        />
                        <VictoryAxis
                            style={{ tickLabels: { fontSize: 3, padding: 2 } }}
                            invertAxis
                            label="Opdracht"
                            axisLabelComponent={
                                <VictoryLabel
                                    y={50}
                                    x={60}
                                />
                            }      
                        />
                        <VictoryAxis
                            dependentAxis
                            style={{ tickLabels: { fontSize: 3, padding: 2 } }}
                            orientation="top"
                            width={200}
                            tickValues={[1, 2, 3, 4, 5]}
                            label="Score"
                            axisLabelComponent={
                                <VictoryLabel
                                    y={15}
                                />
                            }      
                        />
                        <VictoryGroup
                            horizontal
                            offset={2}
                            style={{ data: { width: 2 } }}
                            colorScale={["red", "green"]}
                        >
                            <VictoryBar
                                data={difficultyRatings}
                                x="assignment"
                                y={(data) => {
                                    if (difficulty) {
                                        return data.difficultyRating;
                                    } else {
                                        return 0;
                                    };
                                }}
                            />
                            <VictoryBar
                                data={funRatings}
                                x="assignment"
                                y={(data) => {
                                    if (fun) {
                                        return data.funRating;
                                    } else {
                                        return 0;
                                    };
                                }}
                            />
                        </VictoryGroup>
                    </VictoryChart>
                </div>
            }

        </div>
    );
};

export default Chart;
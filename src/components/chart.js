import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup } from 'victory';

const Chart = (props) => {
    const difficultyRatings = props.difficultyRatings;
    const funRatings = props.funRatings;

    return(
        <div>
            <VictoryChart
                theme={VictoryTheme.material}
                domain={{ y: [0.5, 5.5]}}
                padding={{ top: 25, left: 60, bottom: 25 }}
             >
                <VictoryAxis 
                    style={{tickLabels: {fontSize: 3, padding: 2}}}
                    invertAxis
                />
                <VictoryAxis 
                    dependentAxis 
                    style={{tickLabels: {fontSize: 3, padding: 2}}}
                    orientation="top"
                    width={200}
                    tickValues={[1, 2, 3, 4, 5]}
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
                        y="difficultyRating"
                    />
                    <VictoryBar
                        data={funRatings}
                        x="assignment"
                        y="funRating"
                    />
                </VictoryGroup>
            </VictoryChart>
        </div>
    );
};

export default Chart;
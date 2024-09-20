import React from 'react'
import './rankingBar.css'
import ProgressBar from "./progressBar";

const RankingBar = () => {

    const testData = [
        { bgcolor: "#6a1b9a", completed: 100 },
        { bgcolor: "#00695c", completed: 80 },
        { bgcolor: "#ef6c00", completed: 60 },
        { bgcolor: "#ef6c00", completed: 40 },
        { bgcolor: "#ef6c00", completed: 20 },
    ];

    return (
        <div className="App">
            {testData.map((item, idx) => (
                <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
            ))}
        </div>
    );
}

export default RankingBar
import React, { useEffect, useState } from 'react';
import './rankingBar.css';
import ProgressBar from "./progressBar";
import { USER_ACTION } from '../../apis/userApi';

const RankingBar = () => {
    const [Ranking, setRanking] = useState([]);

    useEffect(() => {
        pageInit();
    }, []);

    const pageInit = async () => {
        await userInit();
    };

    const userInit = async () => {
        const res = await USER_ACTION.balanceRanking();
        console.log('user res: ', res);
        console.log('res Data: ', res.data);

        if (res.status) {
            setRanking(res.data);
        } else {
            console.log("getCardByUserId (Error) : Error Api ");
        }
    };

    // Filter and sort the Ranking array based on balance
    const sortedRanking = Ranking
        .filter(ranking => ranking.errMsg != 'Balance is zero') // Keep only users with a valid balance
        .sort((a, b) => {
            const balanceA = a.balance;
            const balanceB = b.balance;
            return balanceB - balanceA; // Sort in descending order
        });

    return (
        <div className="rankingBar">
            {sortedRanking.length > 0 && sortedRanking.map((ranking) => {
                const completedValue = ranking.balance;
                const baseCompleted = sortedRanking.length > 0 ? sortedRanking[0].balance : 1; // Avoid division by zero

                // Calculate adjusted completed percentage
                const adjustedCompleted = (baseCompleted > 0) ? (completedValue / baseCompleted) * 100 : 0;

                // Round to the nearest integer
                const roundedCompleted = Math.round(adjustedCompleted);

                // Log the rounded adjustedCompleted value
                console.log(`User: ${ranking.displayName}, Adjusted Completed: ${roundedCompleted}%`);

                return (
                    <ProgressBar
                        key={ranking.userId} // Use userId as the key for better uniqueness
                        lv_name={ranking.lv_name} // Set the bgcolor appropriately
                        completed={roundedCompleted}
                        name={ranking.displayName}
                    />
                );
            })}
        </div>
    );
};

export default RankingBar;

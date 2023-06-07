import { recordApi } from '../api'

import { useState, useEffect } from 'react';

import ShowOption from "./ShowOption";

const ShowOptionList = ({   options, userId, results, 
                            onVote, 
                            // onColorChange, 
                            onShowResult }) => {
	const [ records, setRecords ] = useState([]);
    
    useEffect(() => {
        getRecords();
    }, [ userId ]);

    const getRecords = async () => {
        if (userId) {
            const res = await recordApi(userId);
            if (res.status == '200' && res.data.length > 0) {
                setRecords([ ...res.data ]);
            }
        }
    };

    const handleVoteChange = (optionId) => {
        // 投票後重取
        onVote({ userId, optionId });
        getRecords();
    }

    if (!userId || !options) {
        return null;
    };

    const renderedOptions = options.map((option, index) => {
        return <ShowOption 
            userId={userId} 
            key={index}  
            option={option}
            records={records} 
            results={results}
            onVoteChange={handleVoteChange}
            // onColorChange={onColorChange} 
            onShowResult={onShowResult} />;
    });
    
    return (
        <div id="options">
            {renderedOptions}
        </div>
    );

}

export default ShowOptionList;
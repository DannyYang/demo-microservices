import BackendApi from '../api'

import { useState, useEffect } from 'react';

import ShowOption from "./ShowOption";


const { 
	params: paramsApi, 
	record: recordApi, 
	result: resultApi, 
	vote: voteApi 
} = BackendApi;

const ShowOptionList = ({ options, userId, postToVote, onColorChange }) => {
	const [ records, setRecords ] = useState([]);
    
    // 只在userId改變時才取records
    useEffect(() => {
        console.log('只在userId改變時才取records')
        getRecords();
    }, [ userId ]);

    const getRecords = async () => {
        if (userId) {
            const res = await recordApi(userId);
            if (res.status == '200' && res.data.length > 0) {
                console.log(res)
                setRecords([ ...res.data ]);
            }
        }
    };

    const handleVoteChange = (optionId) => {
        // 投票後重取
        postToVote({ userId, optionId });
        getRecords();
    }

    if (!userId || !options) {
        return <></>;
    };

    const renderedOptions = options.map((option, index) => {
        return <ShowOption 
            userId={userId}
            key={index} 
            option={option}
            records={records} 
            onVoteChange={handleVoteChange}
            onColorChange={onColorChange} />;
    });
    
    return (
        <>
            {renderedOptions}
        </>
    );

}

export default ShowOptionList;
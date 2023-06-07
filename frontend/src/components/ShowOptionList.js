import { recordApi } from '../api'

import { useState, useEffect } from 'react';

import ShowOption from "./ShowOption";

const ShowOptionList = ({   options, userId, results, 
                            onVote, 
                            onShowResult }) => {
	const [ records, setRecords ] = useState([]);
    const [ selectedOptionId, setSelectedOptionId ] = useState('');
    
    useEffect(() => {
        setSelectedOptionId('');
        getRecords();
    }, [ userId ]);

    const getRecords = async () => {
        if (!userId) {
            return;
        }
        
        const res = await recordApi(userId);
        if (res.status != '200') {
            return;
        }
        
        // 空陣列可展開
        setRecords([ ...res.data ]);
        
        if (res.data.length > 0) {
            setSelectedOptionId(res.data[res.data.length-1].optionId)
        }
    };

    const handleVoteChange = (optionId) => {
        // 解決 latency 問題, 結果尚未 save 完成, getRecords 會得到的舊資料
        const originalSelectedOptionId = selectedOptionId;
        setSelectedOptionId(optionId);

        // 投票後重取
        onVote({ userId, optionId })
            .then((res) => {
                if (res.status == '200') {
                    getRecords();
                } else {
                    setSelectedOptionId(originalSelectedOptionId);
                    alert(res.message);
                }
            });
    }

    if (!userId || !options) {
        return null;
    };

    const renderedOptions = options.map((option, index) => {
        return <ShowOption 
            userId={userId} 
            key={index}  
            option={option}
            selectedOptionId={selectedOptionId}
            records={records} 
            results={results}
            onVoteChange={handleVoteChange}
            onShowResult={onShowResult} />;
    });
    
    return (
        <div id="options">
            {renderedOptions}
        </div>
    );

}

export default ShowOptionList;
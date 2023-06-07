import { useState, useEffect } from 'react';

import ShowOptionResult from './ShowOptionResult';

const ShowOption = ({   userId, option, records, results, 
                        immediatelyShow,
                        onVoteChange, 
                        // onColorChange, 
                        onShowResult }) => {
    const [ selected, setSelected ] = useState(false);

    const isOptionSelected = (optionId) => {
        const selected = Object.values(records)
            .map(r => r.optionId)
            .includes(optionId);
        if (selected) {
            // onColorChange(option.bgColor);
        }
        return selected;
    }

    const isRecordExist = records.length > 0 && records[0].userId == userId;

    // 只在records改變時才重新渲染
    useEffect(() => {
        if (isRecordExist) {
            setSelected(isOptionSelected(option.optionId));
        } else {
            setSelected(false);
        }
    }, [ records ]);

    const handleOnChange = (event) => {
        onVoteChange(event.target.value);
        setSelected(isOptionSelected(event.target.value));
        onShowResult();
    };

    return (
        <label className="option">
            <input
                type="radio"
                name="options" 
                value={option.optionId}
                onChange={handleOnChange}
                // disabled={!userId}
                checked={isRecordExist && selected}>
            </input>
            {option.label}
            {/* <ShowOptionResult 
                optionId={option.optionId} 
                alreadyVoted={isRecordExist} 
                immediatelyShow={immediatelyShow}
                results={results} /> */}
        </label>
    );
};

export default ShowOption;
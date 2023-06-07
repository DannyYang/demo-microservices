import { useState, useEffect } from 'react';

const ShowOption = ({   userId, option, records, selectedOptionId, 
                        onVoteChange, 
                        onShowResult }) => {
    const [ selected, setSelected ] = useState({ isSelected: false });
    // const [ disabled, setDisabled ] = useState({ isDisabled: false });

    console.log(selectedOptionId)
    const isRecordExist = records.length > 0 && records[0].userId == userId;
    
    // 只在records改變時才重新渲染
    useEffect(() => {
        if (isRecordExist) {
            onShowResult();
        }
    }, [ records ]);

    const handleOnChange = (event) => {
        onVoteChange(event.target.value);
        onShowResult();
    };

    return (
        <label for={option.optionId} className="option">
            <input
                type="radio"
                name="options" 
                value={option.optionId}
                id={option.optionId}
                onChange={handleOnChange}
                // disabled={!userId}
                // disabled={isRecordExist}
                checked={selectedOptionId == option.optionId}>
            </input>
            {option.label}
        </label>
    );
};

export default ShowOption;
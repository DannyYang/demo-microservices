import { throttle } from 'lodash';
import { useState, useEffect } from 'react';

const ShowOption = ({   userId, option, records, selectedOptionId, 
                        onVoteChange, 
                        onShowResult }) => {
    const [ selected, setSelected ] = useState({ isSelected: false });

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
    const throttledHandleOnChange = throttle(handleOnChange, 300);

    return (
        <label htmlFor={option.optionId} className="option">
            <input
                type="radio"
                name="options" 
                value={option.optionId}
                id={option.optionId}
                onChange={throttledHandleOnChange}
                checked={selectedOptionId == option.optionId}>
            </input>
            {option.label}
        </label>
    );
};

export default ShowOption;
import { throttle } from 'lodash';
import { useEffect } from 'react';

const ShowOption = ({   userId, option, records, selectedOptionId, 
                        onVoteChange, 
                        onShowResult }) => {

    const isRecordExist = records.length > 0 && records[0].userId == userId;
    
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
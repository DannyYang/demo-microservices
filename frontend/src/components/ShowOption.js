import { useState, useEffect } from 'react';

const ShowOption = ({   userId, option, records, results, 
                        onVoteChange, 
                        // onColorChange, 
                        onShowResult }) => {
    const [ selected, setSelected ] = useState({ isSelected: false });
    // const [ disabled, setDisabled ] = useState({ isDisabled: false });

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
        console.log(option.optionId, isOptionSelected(option.optionId));

        if (isRecordExist) {
            setSelected({ isSelected: isOptionSelected(option.optionId) });
            onShowResult();
        }
    }, [ records ]);

    const handleOnChange = (event) => {
        onVoteChange(event.target.value);
        // setSelected(isOptionSelected(event.target.value));
        // console.log(event.target.value, isOptionSelected(event.target.value));
        onShowResult();
        // setDisabled(true);
    };

    return (
        <label className="option">
            <input
                type="radio"
                name="options" 
                value={option.optionId}
                onChange={handleOnChange}
                // disabled={!userId}
                // disabled={isRecordExist}
                checked={selected.isSelected}>
            </input>
            {option.label}
        </label>
    );
};

export default ShowOption;
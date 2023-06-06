import { useState, useEffect } from 'react';

/*
{
    "optionId": "01",
    "label": "金塊",
    "bgColor": "#000000"
},
{userId: 'Cherry', optionId: '02'}
*/

const ShowOption = ({ userId, option, records, onVoteChange, onColorChange }) => {
    const [ selected, setSelected ] = useState(false);

    const isOptionSelected = (optionId) => {
        const selected = Object.values(records)
            .map(r => r.optionId)
            .includes(optionId);
        if (selected) {
            onColorChange(option.bgColor);
        }
        return selected;
    }

    // 只在records改變時才重新渲染
    useEffect(() => {
        console.log('只在records改變時才重新渲染');

        // 有records才渲染
        if (records && records.length > 0 && records[0].userId == userId) {
            setSelected(isOptionSelected(option.optionId));
        } else {
            setSelected(false);
        }
    }, [ records ]);

    const handleOnChange = (event) => {
        onVoteChange(event.target.value);
        setSelected(isOptionSelected(event.target.value));
    };

    // useEffect(() => {
    //     console.log('callback')
    // }, [ selected ]);

    return (<>
        <label>
            <input
                type="radio"
                name="options" 
                value={option.optionId}
                onChange={handleOnChange}
                checked={selected}>
            </input>
            {option.label}
        </label>
    </>);
};

export default ShowOption;
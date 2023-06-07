import { useState, useEffect } from 'react';

const ShowOptionResult = ({ optionId, alreadyVoted, results, immediatelyShow }) => {
    const [hasVoted, setHasVoted] = useState(false);
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        setCount(0);
        const index = results.findIndex(result => result.optionId === optionId);
        if (index >= 0) {
            setCount(results[index].count);
        }
    }, [ results ]);

    useEffect(() => {
        setHasVoted(false);
        setHasVoted(alreadyVoted);
    }, [ alreadyVoted ]);
    
    return (
        <span>{immediatelyShow || hasVoted ? count: ''}</span>
    );
}

export default ShowOptionResult;
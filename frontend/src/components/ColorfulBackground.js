import { useState, useEffect } from 'react'

function ColorfulBackground({ results, options }) {
    const [ mergedArray, setMergedArray] = useState([]);
    
    useEffect(() => {
        if (results.length != 0) {
            const array = options.map((option) => {
                const countObject = results.find((result) => result.optionId === option.optionId);
                return { ...option, count: countObject?.count || 0 };
            });
            setMergedArray(array);
        } else {
            setMergedArray([]);
        }
    }, [ results ])

    const totalCount = mergedArray.reduce((sum, option) => sum + option.count, 0);
    return (
        <div style={{ position:'absolute', left: '0px', display: 'flex', width: '100%', height: '100%' }}>
            {mergedArray.map(({ bgColor, count }, index) => {
                    return <div key={index} style={{
                        backgroundColor: bgColor,
                        flexBasis: `${(count / totalCount) * 100}%`,
                    }}>{count || ''}</div>
                })
            }
        </div>
    );
    
}
export default ColorfulBackground;
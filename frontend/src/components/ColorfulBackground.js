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

    // const renderedMap = mergedArray.map(({ count, label }) => {
    //     return <tr className='table'>
    //         {label}
    //         {( Math.floor((count / totalCount) * 100) + '%')}
    //     </tr>;
    // });
    // return (<table><tbody>{renderedMap}</tbody></table>);

    return (
        <div style={{ position: 'relative', 
                        display: 'flex', 
                        // flexDirection: 'column', 
                        width: '100%', height: '50vh' }}>
            {mergedArray.map(({ bgColor, count, label }, index) => {
                    return (
                    <div key={index} style={{
                        backgroundColor: bgColor,
                        flexBasis: `${(count / totalCount) * 100}%`, }}>
                        <div style={{ 
                                backgroundColor: 'white', 
                                textAlign: 'center',
                            }}>
                            {count ? ( Math.floor((count / totalCount) * 100) + '%') : ''}
                            {count == 0 ? '' : label}
                        </div>
                    </div>
                    )
                })
            }
        </div>
    );
    
}
export default ColorfulBackground;
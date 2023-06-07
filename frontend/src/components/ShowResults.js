const ShowResults = ({ userId, onShowResult }) => {
    // if (!userId) {
    //     return;
    // }
    
    return (
        <button id="showResult" onClick={onShowResult}>
            查看結果
        </button>
    );
}

export default ShowResults;
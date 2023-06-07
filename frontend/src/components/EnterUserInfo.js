import { useState } from 'react';

const EnterUserInfo = ({ onChangeUser, onLogin }) => {
    const [ userId, setUserId ] = useState('');

    const formOnSubmit = (event) => {
        event.preventDefault();
        onLogin(userId);
    };

    const inputOnChange = (event) => {
        setUserId(event.target.value);
        onChangeUser();
    }

    return (
        <form id="userInfoForm" onSubmit={formOnSubmit}>
            <input value={userId} onChange={inputOnChange} />
            <div><button type="submit">開始投票</button></div>
        </form>
    );
}

export default EnterUserInfo;
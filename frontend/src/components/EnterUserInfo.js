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

    return <form onSubmit={formOnSubmit}>
        <input value={userId} onChange={inputOnChange} />
        <button type="submit">Enter</button>
    </form>;
}

export default EnterUserInfo;
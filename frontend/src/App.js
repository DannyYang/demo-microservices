// import './App.css';
import BackendApi from './api'

import { useState, useEffect } from 'react';

import EnterUserInfo from './components/EnterUserInfo';
import ShowOptionList from './components/ShowOptionList';

const { 
	params: paramsApi, 
	result: resultApi, 
	vote: voteApi 
} = BackendApi;

const App = () => {
	const [ userId, setUserId ] = useState('');
	const [ options, setOptions ] = useState([]);
	const [ bgcolor, setBgcolor ] = useState('white');
	document.body.style = `background: ${bgcolor}`;

	// 只取一次
	useEffect(() => {
		console.log('getOptions * 1');

		const getOptions = async () => {
			const res = await paramsApi();
			if (res.status == '200') {
				setOptions(res.data.options);
			}
		}

		getOptions();
	}, []);

	const changeUserHandler = () => {
		setUserId('');
		setBgcolor('white');
	}

	const loginHanlder = (userId) => {
		setUserId(userId);
	}

	const postToVote = (newVoteRecords) => {
		voteApi(newVoteRecords);
	}

	const colorChangeHandler = (bgColor) => {
		setBgcolor(bgColor);
	}

	const onClickResult = async() => {
		console.log(await resultApi());
	}
	
	return (<div>
		<button onClick={onClickResult}>查看結果</button>
		<EnterUserInfo onChangeUser={changeUserHandler} onLogin={loginHanlder} />
		<ShowOptionList options={options} userId={userId} postToVote={postToVote} onColorChange={colorChangeHandler}/>
	</div>);
}

export default App;

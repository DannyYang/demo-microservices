// import './App.css';
import { paramsApi, resultApi, voteApi } from './api'

import { useState, useEffect } from 'react';

import EnterUserInfo from './components/EnterUserInfo';
import ShowOptionList from './components/ShowOptionList';
import ShowResults from './components/ShowResults';
import ColorfulBackground from './components/ColorfulBackground';

const App = () => {
	const [ userId, setUserId ] = useState('');
	const [ options, setOptions ] = useState([]);
	const [ results, setResults ] = useState([]);
    const [ immediatelyShow, setImmediatelyShow ] = useState(false);
	const [ question, setQuestion ] = useState('');
	// const [ bgcolor, setBgcolor ] = useState('white');
	// document.body.style = `background: ${bgcolor}`;

	// 只取一次
	useEffect(() => {
		const getOptions = async () => {
			const res = await paramsApi();
			console.log(res)
			if (res.status == 200) {
				setOptions(res.data.options);
				setQuestion(res.data.question);
			}
		}
		getOptions();
	}, []);

	const changeUserHandler = () => {
		setUserId('');
		// setBgcolor('white');
		setImmediatelyShow(false);
		setResults([]);
	}

	const loginHanlder = (userId) => {
		setUserId(userId);
	}

	const postToVoteHandler = (newVoteRecords) => {
		voteApi(newVoteRecords);
	}

	// const colorChangeHandler = (bgColor) => {
	// 	setBgcolor(bgColor);
	// }

	const showResultHandler = async() => {
		const res = await resultApi();
		
		setResults(res.data);
		setImmediatelyShow(true);
	}
	
	// paramsApi().then(res => console.log(res))

	return (
		<div id="app">
			<ShowResults onShowResult={showResultHandler} />
			<h1>{question}</h1>
			<EnterUserInfo
				onChangeUser={changeUserHandler} onLogin={loginHanlder} />
			<ShowOptionList 
				options={options} userId={userId} 
				results={results} immediatelyShow={immediatelyShow}
				onVote={postToVoteHandler} 
				// onColorChange={colorChangeHandler}
				onShowResult={showResultHandler} />
			<ColorfulBackground options={options} results={results} />
		</div>
	);
}

export default App;

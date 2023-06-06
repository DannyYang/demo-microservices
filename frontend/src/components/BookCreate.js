import { useState } from 'react';

export default function BookCreate({ onCreate }) {
    const [title, setTitle] = useState('');

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onCreate(title);
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <lable>title</lable>
                <input value={title} onChange={handleChange}/>
            </form>
        </div>
    );
}
import React from 'react'
import git_logo from './git_logo.svg';
const loginUrl = 'http://localhost:4000/login';


const handleClick = () => {
    window.location.href = loginUrl;
}

export default function SignIn() {
    return (
        <div class='todo-app'>
            <img src = {git_logo} alt='' style={{width:"14vw",margin:"12vw 8vw 3vw 8vw"}}/>
            <button onClick = {handleClick} className='btn-white btn' 
                style={{
                    width:"10vw",
                    height:"3vw",
                    margin:"1vw 10vw",
                    cursor:"pointer",
                    borderRadius:"6%",
                }}
            >
                Sign In 
            </button>
        </div>
    )
}

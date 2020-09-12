import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom';

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")  
    const [Name, setName] = useState("") 
    const [Password, setPassword] = useState("")
    const [ConfirmPw, setConfirmPw] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    
    const onNameHandler = (event) => { 
        setName(event.currentTarget.value);
    }
    
    const onPassHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    
    const onConfirmHandler = (event)=> {
        setConfirmPw(event.currentTarget.value);
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault();
    
        if(Password !== ConfirmPw){
            return alert('비밀번호가 달라')
        }

        let body ={
            email: Email,
            name: Name,
            password: Password,
        }

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success){
                props.history.push('/login')
            }else{
                alert('Failed to sign up')
            }
        })
    }
    return (
        <div>
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center'
        , width:'100%', height:"100vh"
        }}>
            <form style={{display:'flex',flexDirection:'column'}}
                onSubmit={onSubmitHandler}>
                    <h2>This is Register Page</h2>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                
                <label>Password</label>
                <input type="password" value={Password} onChange={onPassHandler}/>
                
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPw} onChange={onConfirmHandler}/>
                
                <br/>
                
                <button type="submit">Register</button>
            </form>
            </div>
        </div>
    )
}

export default withRouter(RegisterPage)

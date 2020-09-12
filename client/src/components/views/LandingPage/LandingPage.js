import React ,{ useEffect} from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function LandingPage(props) {

    // hook 
    useEffect(() => {
        axios.get('api/hello')
        .then(res => console.log(res.data))
    },[])
    
    const onClickHandler = ()=>{
        axios.get('/api/users/logout')
        .then(res=>{
            if(res.data.success){
                props.history.push('/login')
            }else{
                alert('Failed Logout')
            }
        } )       
    }

    return (
        <div style={{width:'100%', height:"100vh"
        }}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'
            ,width:'100%', position:'sticky'}}>
                <h2 style={{padding:'10px'}}>Jaehwa</h2>
                <h1 style={{padding:'10px'}}>MainPage</h1>
                <ul>
                    <li style={{padding:'10px',cursor:'pointer'}}>login</li>
                    <li style={{padding:'10px',cursor:'pointer'}}>register</li>
                    <li onClick={onClickHandler} style={{padding:'10px',cursor:'pointer'}}>logout</li>
                </ul>
            </div>
            <div style={{borderBottom:'1px solid'}}></div>
        </div>
    )
}

export default withRouter(LandingPage)

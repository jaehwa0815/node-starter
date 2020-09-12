import React ,{useEffect} from 'react';
import {authUser} from '../_actions/user_action';
import {useDispatch} from 'react-redux'

export default function (SpecificComponent, option, adimnRoute = null){

    //option :
    // null => 아무나 오케이
    // true =>  로그인 유저만
    // false =>  로그인 유저는 불가능
    
    // adminRoute = null : 기본값은 널이라는 의미 넣어도 되고 안넣어도 된다.
    
    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        
        useEffect(() => {  
            dispatch(authUser()).then(response => {
                console.log(response)
                //로그인 하지않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                }else{
                    //로그인 한 상태
                    if(adimnRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }else{
                        if(option === false)
                            props.history.push('/')
                    }
                }
                
            })
        }, [])

        return (
            <SpecificComponent/>
        )

    }



    return AuthenticationCheck
}
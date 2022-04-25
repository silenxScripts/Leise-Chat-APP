import { useState,createContext } from 'react'

export const LoginContext = createContext();

export const LoginContextProvider=(props)=>{

    const [ userName,setUserName ] = useState("")
    const [ userScore,setUserScore ] = useState(0)
    const values = {
        userName,
        setUserName,
        userScore,
        setUserScore,
    }

    return(
        <LoginContext.Provider value={values} >
            {props.children}
        </LoginContext.Provider>
    )

}

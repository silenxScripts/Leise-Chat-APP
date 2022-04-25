import { useState,useContext } from 'react'
import { LoginContext } from '../context/LoiginContext'
import { db,auth } from '../utils/firebaseConfig';
import s from '../styles/Login.module.scss'
import Button from "@mui/material/Button";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { addDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection } from 'firebase/firestore';
import { getListOfUsers } from '../utils/getUserData';

const UserName = () =>{

  const { userName,setUserName,userScore,setUserScore } = useContext(LoginContext)
  const [ user ] = useAuthState(auth)
  const [ log,setLog ] = useState("")
  const [ userValue,setUserValue ] = useState("")
  const [ value ] = useCollectionData(collection(db, 'users'))

  const userNames = getListOfUsers(value)

  const addUser=async()=>{
    // console.log(userName, user.email, userValue, userScore)
    await addDoc(collection(db, 'users'), {
      name:userValue,
      email:user.email,
      score:userScore
    }).then(()=>{
      setUserName(value)
    })
  }

  const Submit=()=>{
    if (userNames.includes(userValue)) {
      setLog("User Name already taken!")
    } else if (userValue.length == 0) {
      setLog("Username cannot be empty")
    } else if (!userValue.trim().length) {
      setLog("Username is quite sus ;)")
    } else if (userValue.length > 12) {
      setLog("Ahh.. username is too long man! more than 12 allowed characters")
    } else if (userValue.length < 4 && userValue.length >= 1) {
      setLog("Username can't be less than 4 characters!")
    }else {
      addUser()
    }
  }

  return(
    <div className={s.container}>
      <div className={s.LoginForm}>
        <h1>Enter a UserName for you!</h1>
        <h1>{log}</h1>
        <input type="text" value={userValue} onChange={(e)=>{setUserValue(e.target.value)}} placeholder="Enter your username here...." />
        <Button variant="contained" onClick={Submit}>
          Submit !
        </Button>
      </div>
    </div>
  )

}

export default UserName

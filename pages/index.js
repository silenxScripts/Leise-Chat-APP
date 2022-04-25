import Login_Page from '../components/Login_Page'
import { auth, db } from '../utils/firebaseConfig'
import { collection } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from '../components/Sidebar';
import { useContext } from 'react';
import { LoginContext } from '../context/LoiginContext';
import UserName from '../components/UserName';

function Index() {

  const [user, loading] = useAuthState(auth)
  const { userName,setUserName } = useContext(LoginContext)

  //Extracting Data from users giving back emails and users
  const [snapshots] = useCollection(
    collection(db, "users")
  );

  const userData = snapshots?.docs.map((doc) => ({ ...doc.data() }))

  if (loading) {
    return (
      <div
        style={{
          position: 'absolute',
          top: '0', left: '0',
          height: '100vh', width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  
  if (user) {

    for (let i = 0; i < userData?.length; i++) {
      
      if(user?.email == userData[i]?.email){
        setUserName(userData[i].name)
        break
      }

    }
    
    if(userName.length){
      console.log(userName.length)
      return (
        <Sidebar/>
        )
    }else{
      return(
        <UserName/>
      )
    }
  }

  if (!user) {
    return (
      <Login_Page />
    )
  }

}

export default Index

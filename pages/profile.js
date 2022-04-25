import s from '../styles/Profile.module.scss'
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import { useContext } from 'react';
import { LoginContext } from '../context/LoiginContext'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../utils/firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore';

const Profile = () => {

    const { userName, userScore, setUserScore } = useContext(LoginContext)
    const [user] = useAuthState(auth)

    const [userData] = useCollectionData(collection(db, 'users'))

    for (let i = 0; i < userData?.length; i++) {
        const element = userData[i];
        if (element?.email == user?.email) {
            setUserScore(element.score)
            break
        }
    }

    return (
        <div className={s.container}>
            <ul className={s.background}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

            <Card sx={{
                width: 200,
                height: 200,
                backgroundColor: 'black',
                margin: '1rem auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center'
            }}>
                <Avatar sx={{ bgcolor: '#252525', color: 'white' }}>{String(userName)?.charAt(0).toUpperCase()}</Avatar>
                <h1 style={{ color: 'white' }} >{String(userName).charAt(0).toUpperCase() + String(userName).slice(1)}</h1>
            </Card>

            <div className={s.InfoBox} >

                <h1>User Score : {userScore}</h1>
                <h2>Current Account : {user?.email}</h2>

            </div>
        </div>
    )

}

export default Profile
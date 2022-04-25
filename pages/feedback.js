import { useState } from 'react'
import s from '../styles/Feedback.module.scss'
import Button from "@mui/material/Button";
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../utils/firebaseConfig'
 
const FeedBack = () => {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const Submit=async()=>{
        await addDoc(collection(db, 'feedback_bugs'),{
            sender:title,
            text:text
        }).then(()=>{
            setText('')
            setTitle('')
            setTimeout(() => {
                alert("Sent!")
            }, 1000);
        })
    }

    return (
        <div className={s.container}>
            <h1>Give us a feedback or maybe report a bug?</h1>

            <h1>Please be appropriate, these messages won't be filtered but we'd appreciate If you'd not be mean :)</h1>

            <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                placeholder="Sender's name here"
            />

            <textarea cols="30" rows="10"
                placeholder='Feedback or Bug Report here!-'
                onChange={(e) => (setText(e.target.value))}
                value={text}
            ></textarea>

            <Button variant="contained" color="success"
                onClick={Submit}
            >
                Submit !
            </Button>
        </div>
    )
}

export default FeedBack
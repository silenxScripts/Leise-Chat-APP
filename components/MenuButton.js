import s from '../styles/Menu.module.scss'
import { IoIosArrowBack } from 'react-icons/io'
import { BiLogOut } from 'react-icons/bi'
import { CgMenuHotdog } from 'react-icons/cg'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebaseConfig'
import { LoginContext } from '../context/LoiginContext'
import { FaUserAlt } from 'react-icons/fa'
import { MdFeedback } from 'react-icons/md'

function MenuButton() {

    const router = useRouter()
    const [left, setLeft] = useState(-100)
    const { setUserName } = useContext(LoginContext)
    const iconSize = 50

    const toggle = () => {
        if (left == -100) {
            setLeft(0)
        } else {
            setLeft(-100)
        }
    }

    return (
        <>
            <div className={s.MainMenu}
                style={{
                    left: `${left}%`
                }}
            >
                <div className={s.Options}
                    onClick={() => {
                        router.back()
                        setLeft(-100)
                    }}
                >
                    <IoIosArrowBack size={iconSize} />
                    <h1>Back</h1>
                </div>

                <div className={s.Options}
                    onClick={() => {
                        setLeft(-100)
                        signOut(auth)
                        setUserName("")
                        router.push('/')
                    }}
                >
                    <BiLogOut size={iconSize} />
                    <h1>Log out</h1>
                </div>

                <div className={s.Options}
                    onClick={() => { 
                        router.push('/profile')
                        setLeft(-100)
                    }}
                >
                    <FaUserAlt size={iconSize} />
                    <h1>Profile</h1>
                </div>

                <div className={s.Options}
                    onClick={()=>{
                        router.push('/feedback')
                        setLeft(-100)
                    }}
                >
                    <MdFeedback size={iconSize} />
                    <h1>FeedBack/Bug Report</h1>
                </div>
            </div>
            <div className={s.MenuButton}
                onClick={toggle}
            >
                <CgMenuHotdog size={iconSize} />
            </div>
        </>
    )
}

export default MenuButton
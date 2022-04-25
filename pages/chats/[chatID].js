import Sidebar from "../../components/Sidebar";
import s from "../../styles/Chat.module.scss";
import Avatar from "@mui/material/Avatar";
import { RiSendPlaneFill } from "react-icons/ri";
import { useRouter } from "next/router";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../utils/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useRef, useEffect } from "react";
import getOtherEmail from "../../utils/getOtherEmail";

function Chat() {
  const router = useRouter();
  const { chatID } = router.query;
  const [user] = useAuthState(auth);
  const q = query(collection(db, `chats/${chatID}/messages`), orderBy("time"));
  const [values] = useCollectionData(q);
  const bottomOfTheChat = useRef();
  const [currentChat, setCurrentChat] = useState("");
  const [snapshots] = useCollection(collection(db, "chats"));
  const contactList = snapshots?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const [users] = useCollectionData(collection(db, "users"));

  const getUserName = (i) => {
    let userName = "Username not found";

    let id = "";
    contactList?.forEach((element) => {
      if (element.id == chatID) {
        id = getOtherEmail(element.users, user.email);
      }
    });

    users?.forEach((element) => {
      if (element.email == id) {
        userName = element.name;
      }
    });

    const ExactUserName =
      String(userName).charAt(0).toUpperCase() + String(userName).slice(1);

      if(i==0){
        return ExactUserName;
      }
      else{
        return String(userName).charAt(0).toUpperCase()
      }
  };

  const Send = async (e) => {
    e.preventDefault();
    if (currentChat.length == 0) {
      return;
    } else if (!currentChat.trim().length) {
      return;
    } else {
      await addDoc(collection(db, `chats/${chatID}/messages`), {
        text: currentChat,
        sender: user.email,
        time: serverTimestamp(),
      }).then(() => {
        setCurrentChat("");
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      bottomOfTheChat?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, [values]);

  return (
    <div className={s.container}>
      <div className={s.Sidebar}>
        <Sidebar />
      </div>
      <div className={s.Chat}>
        <div className={s.Contact}>
          <Avatar sx={{ bgcolor: "black" }}>{getUserName(1)}</Avatar>
          <h1>{getUserName(0)}</h1>
        </div>

        <div className={s.ChatBox}>
          {values?.map((item) => {
            const isSender = item.sender == user.email;
            return (
              <div
                className={s.ChatBubble}
                key={Math.random()}
                style={{
                  backgroundColor: isSender ? "#006e00" : "#00122e",
                  alignSelf: isSender ? "flex-end" : "flex-start",
                }}
              >
                {item.text}
              </div>
            );
          })}
          <div ref={bottomOfTheChat}></div>
        </div>

        <form className={s.Input} onSubmit={(e) => Send(e)}>
          <input
            type="text"
            value={currentChat}
            onChange={(e) => setCurrentChat(e.target.value)}
          />
          <button type="submit">
            <RiSendPlaneFill size={30} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;

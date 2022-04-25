import s from "../styles/Sidebar.module.scss";
import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import { LoginContext } from "../context/LoiginContext";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
import { db, auth } from "../utils/firebaseConfig";
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";
import getOtherEmail from "../utils/getOtherEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import validateEmail from "../utils/validateEmail";

function Sidebar() {
  const router = useRouter();
  const { userName } = useContext(LoginContext);
  let NameHead = ''
  if (userName != undefined) {
    NameHead = userName[0];
  }
  else {
    NameHead = 'U'
  }
  const [usersData, loading] = useCollectionData(collection(db, "users"));
  const [snapshots] = useCollection(collection(db, "chats"));
  const contactList = snapshots?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const [user] = useAuthState(auth);

  const getCurrentContactList = () => {
    let list = [];
    let userDataList = [];

    contactList?.forEach((element) => {
      if (element.users.includes(user?.email)) {
        userDataList.push(element);
      }
    });

    userDataList.forEach((contact) => {
      usersData?.forEach((user1) => {
        if (getOtherEmail(contact.users, user.email) == user1.email) {
          list.push({
            name: user1.name,
            id: contact.id,
          });
        }
      });
    });

    return list;
  };

  const Contacts = getCurrentContactList();

  const redirect = (id) => {
    router.push(`/chats/${id}`);
  };

  const emailCheck = (mail) => {
    let list = [];
    for (let i = 0; i < usersData.length; i++) {
      list.push(usersData[i].email);
    }
    if (list.includes(mail)) {
      return true;
    } else {
      return false;
    }
  };

  const checkIfChatExist = (chatUserList) => {
    let list = [];

    for (let i = 0; i < contactList.length; i++) {
      list.push(contactList[i].users);
    }

    for (let i = 0; i < list.length; i++) {

      if (list[i].includes(user.email)) {

        if (
          getOtherEmail(list[i], user.email) ==
          getOtherEmail(chatUserList, user.email)
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const addChat = () => {
    const Input = prompt("Enter email of the new chat you want to add!");
    if (Input == undefined) {
      return;
    } else if (Input == "") {
      return;
    } else if (Input == user.email) {
      alert("Don't stop talking to yourself Darlin'");
    } else if (!validateEmail(Input)) {
      alert("Not valid email");
    } else if (!emailCheck(Input)) {
      alert("This user is not on our app!");
    } else if (emailCheck(Input) && validateEmail(Input)) {
      const newChat = [Input, user.email];

      if (checkIfChatExist(newChat)) {
        alert("Chat already exists with this person!");
        return;
      } else {
        addDoc(collection(db, "chats"), {
          users: [user.email, Input],
        });
      }
    }
  };

  const deleteChat = async (email) => {
    const chatToDelete = [email, user.email];

    contactList.forEach((element) => {
      if (element.users.includes(user.email)) {
        if (
          getOtherEmail(element.users, user.email) ==
          getOtherEmail(chatToDelete, user.email)
        ) {
          deleteChatAsync(element.id)
        }
      }
    });
  };

  const deleteChatAsync = async (id) => {
    await deleteDoc(doc(db, "chats", id))
  }

  const removeChat = () => {
    const Input = prompt("Enter the email of chat you want to delete");
    if (Input == undefined) {
      return;
    } else if (Input == "") {
      return;
    } else if (Input == user.email) {
      alert("Don't stop talking to yourself Darlin'");
    } else if (!validateEmail(Input)) {
      alert("Not valid email");
    } else if (!emailCheck(Input)) {
      alert("This user is not on our app!");
    } else if (emailCheck(Input) && validateEmail(Input)) {
      const newChat = [Input, user.email];

      if (checkIfChatExist(newChat)) {
        const Input2 = prompt("Do you really want to delete the chat? Say Yes or No")
        if (Input2 == 'Yes' || Input2 == 'yes') {
          deleteChat(Input);
        } else {
          alert("Deletion cancelled!")
        }
        return;
      } else {
        alert("Chat doesn't exists!");
      }
    }
  };

  const ContactList = () => (
    <div className={s.List}>
      {Contacts?.map(element => {
        return (
          <div
            className={s.Contact}
            key={Math.random()}
            onClick={() => redirect(element.id)}
          >
            <Avatar sx={{ bgcolor: "black" }}>
              {String(element.name[0]).toUpperCase()}
            </Avatar>
            <h2 style={{ marginLeft: "10px" }}>
              {String(element.name).charAt(0).toUpperCase() +
                String(element.name).slice(1)}
            </h2>
          </div>
        )
      })}
      <div className={s.Credit}>Leise Chat @SilenxIka-Productions</div>
    </div>
  )

  return (
    <div className={s.container}>
      <div className={s.user}>
        <Avatar sx={{ bgcolor: "black" }}>{String(NameHead).toUpperCase()}</Avatar>
        <h1>{String(userName).charAt(0).toUpperCase() + String(userName).slice(1)}</h1>
      </div>
      <div
        className={s.NewChat}
        style={{
          padding: "5px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Button variant="contained" size="small" onClick={addChat}>
          Add Chat
        </Button>
        <Button variant="contained" size="small" onClick={removeChat}>
          Remove Chat
        </Button>
      </div>
      {
        loading ? <h1>Loading....</h1> : <ContactList/> 
      }
    </div>
  );
}

export default Sidebar;

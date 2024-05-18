import {useEffect,useRef,useState} from "react";
import Navbar from "./Navbar";
import { useUserAuth } from "../context/UserAuthenContext";
import { collection,query,where,getDocs,doc,addDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import ChatScreen from "./ChatScreen";
import { MessageList,Input } from 'react-chat-elements'
export default function Chat() {
  const {user} = useUserAuth();
  const [users,setUsers] = useState([]);
  const [userSelect ,setUserSelect] = useState('');
  const [userId ,setUserId]= useState('');
  const [imageSelect ,setImageSelect] = useState('');
  const chatContainerRef  = useRef(null);
  const getUsers = async () => {
    try {
      if (!user || !user.uid) {
        console.error("User or user ID undefined");
        return;
      }
      const usersQuery = query(
        collection(db, 'Users'),
        where('uid', '!=', user.uid)
      );
      const querySnapshot = await getDocs(usersQuery);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
      
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };
  useEffect(()=>{
      getUsers();
      
  },[userSelect])


  function generateId(length = 20) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}

const ChatId = generateId();


   const onSend = async (text) => {
       try {
           const docId = userId > user.uid ? `${user.uid}-${userId}` : `${userId}-${user.uid}`;

           const chatDoc = doc(db, 'Chats', docId);
           const messagesCollectionRef = collection(chatDoc, "messages");
           const messageData = {
              _id: ChatId,
               sendBy: user.uid,
               sentTo:userId,
               text: text,
               createdAt: new Date(),
               user:{
                _id:user.uid,
                name:'ReadMe Store',
                avatar:'https://firebasestorage.googleapis.com/v0/b/book-system-31d99.appspot.com/o/Users%2FU8R4oO9mGINMrY2yxoyscxerwhg2.jpg?alt=media&token=0c09a308-4283-4290-857b-18defd5e28c1'
               }
               
           };
           await addDoc(messagesCollectionRef, messageData);
           scrollToBottom();
       } catch (error) {
           console.error('Error sending message:', error);
       }
   };
   const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-screen flex">
        <div className="h-[calc(100vh-145px)] p-4  m-2 w-screen flex">
          <div className="w-1/5  border-solid border-2 rounded-xl">
            <div className="w-full h-16 bg-primary rounded-tr-xl rounded-tl-xl">
              <span className="italic flex justify-center items-center h-full text-2xl text-white">
                chat
              </span>
            </div>
            {users.map((item) => (
              <div
                className="w-full h-16 flex p-4 items-center bg-[white] rounded-md mt-2"
                onClick={() => {
                  setUserSelect(item.fullName);
                  setUserId(item.uid);
                  setImageSelect(item.image);
                  scrollToBottom();
                }}
                
                key={item.id}
              >
                <img src={item.image} className="w-10 h-10 rounded-full"></img>
                <span className=" flex justify-center items-center h-full text-2xl text-black pl-2">
                  {item.fullName}
                </span>
              </div>
            ))}
          </div>
          <div className="w-4/5 shadow-lg border-solid border-2 mx-2 rounded-xl ">
            <div className="flex items-center justify-center h-20 bg-primary  rounded-tl-xl  rounded-tr-xl">
              <div className="text-[white] text-lg font-bold">
                {userSelect ? userSelect : "Chat"}
              </div>
            </div>
            <div ref={chatContainerRef}  className='h-[calc(100vh-300px)] overflow-y-auto'>
              {userSelect ? (
                <ChatScreen id={userId} image={imageSelect} name={userSelect} />
              ) : (
                <div className="flex items-center justify-center h-full text-primary font-medium">
                  เลือกผูใช้เพื่อแสดงข้อความ
                </div>
              )}
            </div>
            <Input
                placeholder='Type here...'
                multiline={true}
                autofocus={true}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.shiftKey === false) {
                    onSend(e.target.value);
                    e.target.value = '';
                }
                }}
                inputStyle={
                 {
                  color:'white',
                  backgroundColor:'#8c0327'
                 }
                 
                }
                />  
          </div>
        </div>
      </div>
    </>
  );
}

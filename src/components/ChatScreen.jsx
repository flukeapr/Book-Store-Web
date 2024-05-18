import {useState,useEffect} from 'react'
import { Widget } from 'react-chat-widget';
import 'react-chat-elements/dist/main.css'
import { MessageList,Input } from 'react-chat-elements'
import { useUserAuth } from '../context/UserAuthenContext';
import { collection,query,orderBy,getDocs,addDoc, doc,onSnapshot} from 'firebase/firestore';
import { db } from '../config/Firebase';
export default function ChatScreen({id,image,name}) {


       const [messages, setMessages] = useState([]);
       
       const { user } = useUserAuth();
   
       useEffect(() => {
    
          const docId = id > user.uid ? `${user.uid}-${id}` : `${id}-${user.uid}`;
          const chatDoc = doc(db, 'Chats', docId);
          const messagesCollection = collection(chatDoc,"messages");
          const q = query(messagesCollection, orderBy('createdAt', 'desc'));
          const unSubscribe = onSnapshot(q, (querySnap) => {
           const allMsg =   querySnap.docs.map(docSnap=>{
               const data = docSnap.data()
               if(data.createdAt){
                 return {
                    avatar: data.sendBy === user.uid ? user.photoURL : image,
                    title: data.sendBy === user.uid ? "ReadME Store" :name ,
                   position: data.sendBy === user.uid ? 'right' : 'left',
                   type: 'text',
                   text: data.text,
                   date: new Date()
               };
               }
                  
              })
           setMessages(allMsg.reverse());
       });
          
    
      
      
return ()=>{
  unSubscribe()
} }, [id]);

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
               const docId = id > user.uid ? `${user.uid}-${id}` : `${id}-${user.uid}`;

               const chatDoc = doc(db, 'Chats', docId);
               const messagesCollectionRef = collection(chatDoc, "messages");
               const messageData = {
                  _id: ChatId,
                   sendBy: user.uid,
                   sentTo:id,
                   text: text,
                   createdAt: new Date(),
                   user:{
                    _id:user.uid,
                    name:'ReadMe Store',
                    avatar:'https://firebasestorage.googleapis.com/v0/b/book-system-31d99.appspot.com/o/Users%2FU8R4oO9mGINMrY2yxoyscxerwhg2.jpg?alt=media&token=0c09a308-4283-4290-857b-18defd5e28c1'
                   }
                   
               };
               await addDoc(messagesCollectionRef, messageData);
           } catch (error) {
               console.error('Error sending message:', error);
           }
       };
  
  

  return (
    <>
    
     <div className='bg-[#fff] justify-between'>
      <div>
        
      <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={messages} 
                />
      </div>
      <div>
      {/* <Input
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
                />      */}
    </div>
    </div>
    </>
   
  )
}

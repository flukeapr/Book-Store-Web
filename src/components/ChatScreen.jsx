/* eslint-disable react/prop-types */
import {useState,useEffect} from 'react'
import 'react-chat-elements/dist/main.css'
import { MessageList} from 'react-chat-elements'
import { useUserAuth } from '../context/UserAuthenContext';
import { collection,query,orderBy, doc,onSnapshot} from 'firebase/firestore';
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
                   date: new Date(Date.parse(data.createdAt))
               };
               }
                  
              })
           setMessages(allMsg.reverse());
       });
          
    
      
      
return ()=>{
  unSubscribe()
} }, [id]);

   

    
  
  

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

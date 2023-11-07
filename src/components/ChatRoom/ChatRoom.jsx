import './ChatRoom.css'

import React, { useRef, useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore, storage  } from '../../firebase';
import firebase from 'firebase/compat/app';
import ChatMessage from '../ChatMessage/ChatMessage';
import ChatMessageForm from '../ChatMessageForm/ChatMessageForm';
import SignOut from '../SignOut/SignOut'

function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt');
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');

    const renderMessages = () => {
    // Safe check: Only attempt to map if messages is defined
    return (messages && messages.length > 0)
        ? messages.map((message, index) => {
            const isLast = index === messages.length - 1 || messages[index + 1].uid !== message.uid;
            return (
                <ChatMessage
                    key={message.id} // Ensure you have a unique key for each child
                    message={message}
                    isLast={isLast}
                />
            );
        })
        : null; // Render null or some fallback UI if there are no messages
    };

    const send = async (content) => {
        const { uid, photoURL } = auth.currentUser;

        if (typeof content === 'string') {
            // Sending a text message
            await messagesRef.add({
                text: content,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL
            });
        } else if (content instanceof File) {
            // Sending an image
            const imageRef = storage.ref(`/images/${uid}/${content.name}-${Date.now()}`);
            const snapshot = await imageRef.put(content);
            const imageUrl = await snapshot.ref.getDownloadURL();

            await messagesRef.add({
                imageUrl,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL
            });
        }
        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (dummy.current) {
            dummy.current.scrollIntoView();
        }
    }, [messages]);
    
    return (
        <div className='container'>
            <SignOut />
            <main className='messageContainer'>
                {renderMessages()}
                <span ref={dummy}></span>
            </main>
            <ChatMessageForm formValue={formValue} setFormValue={setFormValue} send={send} />
        </div>
    );
}

export default ChatRoom;

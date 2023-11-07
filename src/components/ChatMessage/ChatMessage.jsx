import './ChatMessage.css'

import React from 'react';
import { auth } from '../../firebase';

function ChatMessage({ message, isLast }) {
    const { text, uid, photoURL, imageUrl } = message;
    const textClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    const messageClass = uid === auth.currentUser.uid ? 'sender' : '';

    const messageContent = imageUrl ? (
        <img src={imageUrl} alt="Sent content" className="message-image" />
    ) : (
        <p className={`text ${textClass}`}>{text}</p>
    );
    
    return (
        <div className={`message ${messageClass}`}>
            <div className='imgContainer'>
                {isLast && (
                    <img src={photoURL || 'default-profile.png'} alt="profile" />
                )}
            </div>
            {messageContent}
        </div>
    );
}

export default ChatMessage;

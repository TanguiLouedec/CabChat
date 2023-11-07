import './ChatMessageForm.css'
import { BsSendPlus } from 'react-icons/bs'
import { BiImage } from 'react-icons/bi'

import React from 'react';
import { useRef, useState } from 'react';


function ChatMessageForm({ formValue, setFormValue, send }) {

    const fileInputRef = useRef();

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            send(file); // Send the image immediately after selection
        }
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (formValue.trim()) {
            send(formValue); // Send the text message
            setFormValue(''); // Clear the form
        }
    };

    const triggerFileSelectPopup = () => fileInputRef.current.click();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (formValue.trim()) {
                send(formValue);
                setFormValue('');
            }
        }
    };

    return (
        <form className='sendMessageContainer' onSubmit={handleSendMessage}>
            <button className='submit' onClick={triggerFileSelectPopup}><BiImage size={20} /></button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <input
                className='textInput'
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="..."
            />
            <button className='submit' type="submit"> <BsSendPlus size={20} /> </button>
        </form>
    );
}

export default ChatMessageForm;

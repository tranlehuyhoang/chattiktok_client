import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './chat.css'
function Chat() {
  const [messages, setMessages] = useState([
  ]);
  const [point, setpoint] = useState(0);
  const coin = 30
  const hehe = () => {
    setMessages([])
    setpoint(0)
  }
  let socket;
  useEffect(() => {
    socket = io('https://server-titkok.onrender.com/');
  }, []);
  useEffect(() => {
    const receiveMessageHandler = (data) => {
      const newMessage = data
      setMessages((prevMessages) => {
        const usernameExists = prevMessages.some((msg) => msg.username === newMessage.username);
        if (usernameExists) {
          const updatedMessages = prevMessages.map((msg) => {
            if (msg.username === newMessage.username) {
              return newMessage;
            } else {
              return msg;
            }
          });
          return updatedMessages;
        } else {
          return [...prevMessages, newMessage];
        }
      });
      console.log(messages);
      setpoint((messages.length))

    };
    if (messages.length > coin) {

      return
    } else {
      socket.on('like', receiveMessageHandler);
    }
    // Listen for incoming like events

    // Disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className='box_player'>
      {messages &&
        messages.map((e, i) => (
          <div key={i} style={{ position: 'absolute', top: `${e.top * 1044}px`, left: `${e.left * 584}px` }}>
            <div  className='comment' >{e.comment}</div>
            <div className='rainbow-text'>{e.username}</div>
            <img src={e.img} alt="" />
          </div>
        ))}

      {point == coin &&
        <div className='winner'>
          <h1>WINNER</h1>

          <div className='rainbow-text' style={{ fontSize: '100px' }}>faefaef</div>
          <img src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/11fb8c59264d2d4ede0abecf3c6abe4f~c5_100x100.webp?x-expires=1686704400&x-signature=81wEPpPGYwPROQ0TQq4I0qnamoY%3D" alt="" srcset="" />
          <button onClick={hehe}>reset</button>
        </div>
      }
    </div>
  );
}

export default Chat;
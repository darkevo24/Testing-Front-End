import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'components';
import './chat.scss';

import chatBot from 'assets/chat-bot.png';
import { createChatHistory, getChatStatus } from './reducer';
import { icons } from 'components/Icons';
import { getPdf } from 'utils/helper';

export const ChatDialog = ({ chatHistoryList, setFile }) => {
  const [messageToSend, setMessageToSend] = React.useState('');

  const dispatch = useDispatch();

  React.useEffect(() => {
    const messageList = document.querySelector('.chat-message-list');
    messageList.scrollTo(0, messageList.scrollHeight);

    return function () {};
  }, []);

  const CSChat = ({ message, nextMessage, prevMessage }) => {
    const messageTime = moment(message.sentAt).format('HH:mm');
    const nextMessageTime = moment(nextMessage?.sentAt).format('HH:mm');
    return (
      <>
        <div className="chat-content">
          <img
            alt="bot"
            src={chatBot}
            width={32}
            height={32}
            style={{ visibility: prevMessage?.isSentByAdmin ? 'hidden' : 'visible' }}
          />
          <div>
            {message?.attachment && message?.attachment.length > 0 ? (
              <div className="flex flex-col justify-center h-full p-3 relative overflow-y-hidden">
                {message?.attachment[0].type === 'application/pdf' ? (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={async () => setFile({ file: await getPdf(message?.attachment[0].file), type: 'pdf' })}>
                    <div className="flex justify-center">
                      <icons.pdfSvg className="w-8" />
                    </div>
                    <div className="text-center text-gray1 mt-3 max-h-5">{message?.attachment[0].name}</div>
                  </div>
                ) : (
                  <img
                    src={message?.attachment[0].file}
                    alt="file-data"
                    onClick={() => setFile({ file: message?.attachment[0].file, type: 'image' })}
                  />
                )}
              </div>
            ) : (
              message?.message
            )}
          </div>
        </div>
        {(nextMessage === null || messageTime !== nextMessageTime) && <div className="chat-time">{messageTime}</div>}
      </>
    );
  };

  const UserChat = ({ message, nextMessage }) => {
    const messageTime = moment(message.sentAt).format('HH:mm');
    const nextMessageTime = moment(nextMessage?.sentAt).format('HH:mm');
    return (
      <>
        <div className="chat-content-user">
          {message?.attachment && message?.attachment.length > 0 ? (
            <div className="flex flex-col justify-center h-full p-3 relative overflow-y-hidden">
              {message?.attachment[0].type === 'application/pdf' ? (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={async () => setFile({ file: await getPdf(message?.attachment[0].file), type: 'pdf' })}>
                  <div className="flex justify-center">
                    <icons.pdfSvg className="w-8" />
                  </div>
                  <div className="text-center text-gray1 mt-3 max-h-5">{message?.attachment[0].name}</div>
                </div>
              ) : (
                <img
                  src={message?.attachment[0].file}
                  alt="file-data"
                  onClick={() => setFile({ file: message?.attachment[0].file, type: 'image' })}
                />
              )}
            </div>
          ) : (
            message?.message
          )}
        </div>
        {(nextMessage === null || messageTime !== nextMessageTime) && <div className="chat-time">{messageTime}</div>}
      </>
    );
  };

  const MessageList = () => {
    return chatHistoryList.map((message, index) => {
      const prevMessageDate = index === 0 ? '' : moment(chatHistoryList[index - 1].sentAt).format('D MMM YYYY');
      const messageDate = moment(message.sentAt).format('D MMM YYYY');
      return (
        <div key={message._id}>
          {prevMessageDate !== messageDate && (
            <div className="chat-date-wrapper">
              <div className="chat-date">{messageDate}</div>
            </div>
          )}
          {message.isSentByAdmin && (
            <CSChat
              message={message}
              prevMessage={index === 0 ? null : chatHistoryList[index - 1]}
              nextMessage={index === chatHistoryList.length - 1 ? null : chatHistoryList[index + 1]}
            />
          )}
          {message.isSentByUser && (
            <UserChat
              message={message}
              nextMessage={index === chatHistoryList.length - 1 ? null : chatHistoryList[index + 1]}
            />
          )}
        </div>
      );
    });
  };

  const sendMessage = async () => {
    try {
      await dispatch(
        createChatHistory({
          chatLogsId: chatHistoryList?.[0]?.chatLogsId,
          message: messageToSend,
        }),
      );
      dispatch(getChatStatus());
      setMessageToSend('');
      setTimeout(() => {
        document.getElementById('chat-input').focus();
      }, 500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="content chat-message-list">
        <MessageList />
      </div>
      <div className="bottom">
        <div className="chat-message-wrapper">
          <input
            id="chat-input"
            className="input"
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && messageToSend) sendMessage();
            }}
            placeholder="Type a message"
          />
          <Button disabled={!messageToSend} onClick={sendMessage} className="br-8">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

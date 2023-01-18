import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { apiUrls } from 'utils/request';

import { Button } from 'components';
import './chat.scss';

import chatBot from 'assets/chat-bot.png';
import { createChatHistory, getChatStatus } from './reducer';
import { icons } from 'components/Icons';
import { getPdf } from 'utils/helper';
import Attachment from './Attachment';
import AttachmentSvg from 'assets/attachment.svg';

export const ChatDialog = ({ chatHistoryList, setFile }) => {
  const [messageToSend, setMessageToSend] = React.useState(() => {
    const storageMessage = localStorage.getItem('sdi_chat_message');
    return storageMessage || '';
  });
  const [errorUploadFile, setErrorUploadFile] = React.useState('');
  const [attachments, setAttachments] = React.useState([]);
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
              <div className="flex flex-col justify-center h-full p-8 relative overflow-y-hidden">
                {message?.attachment[0].type === 'application/pdf' ? (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={async () => setFile({ file: await getPdf(message?.attachment[0].file), type: 'pdf' })}>
                    <div className="flex justify-center">
                      <icons.pdfSvg className="w-8" />
                    </div>
                    <div className="text-center text-gray1 mt-3 max-h-5 max-w-30">{message?.attachment[0].name}</div>
                  </div>
                ) : (
                  <img
                    src={message?.attachment[0].file}
                    alt="file-data"
                    className="w-100"
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

  React.useEffect(() => {
    const localStorageAttachment = localStorage.getItem('attachments');
    const localAttachments = localStorageAttachment ? JSON.parse(localStorageAttachment) : [];
    if (localStorageAttachment && attachments.length === 0) {
      setAttachments(localAttachments);
    }
  }, []);

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
                  className="w-100"
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

  const setMessageInput = (message) => {
    setMessageToSend(message);
    localStorage.setItem('sdi_chat_message', message);
  };

  const sendAttachmentChat = async () => {
    try {
      let count = 0;
      attachments.forEach((attachment) => {
        dispatch(
          createChatHistory({
            chatLogsId: chatHistoryList?.[0]?.chatLogsId,
            attachment: [attachment],
          }),
        );
        count += 1;
      });
      if (count === attachments.length) {
        localStorage.removeItem('attachments');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = async () => {
    if (attachments.length !== 0) {
      sendAttachmentChat();
    }
    try {
      if (messageToSend) {
        await dispatch(
          createChatHistory({
            chatLogsId: chatHistoryList?.[0]?.chatLogsId,
            message: messageToSend,
          }),
        );
      }
      setMessageInput('');
      setTimeout(() => {
        document.getElementById('chat-input').focus();
      }, 200);
    } catch (e) {
      console.error(e);
    }
  };

  const fileTypeExt = ['jpg', 'png', 'pdf'];

  const handleUploadFile = async (e) => {
    const file = e?.target?.files?.[0];
    if (!file) {
      setErrorUploadFile('Please select a file!');
      return '';
    }
    const fileSplit = file?.name?.split('.');
    const fileTypeSplit = fileSplit[fileSplit.length - 1];
    if (!fileTypeExt.includes(fileTypeSplit)) {
      setErrorUploadFile('Please select a file with jpg, png, or pdf extension!');
      return '';
    }
    if (file.size >= 1000000) {
      setErrorUploadFile('File size must be under 1 Mb!');
      return '';
    }
    setErrorUploadFile('');
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    const uploadedFile = await axios.post(apiUrls.crmImageApi, bodyFormData);
    if (uploadedFile.status === 200) {
      const attachmentData = [...attachments];
      attachmentData.push({
        file: uploadedFile?.data?.imageUrl,
        type: file.type,
        size: file.size,
        name: file.name,
      });
      localStorage.setItem('attachments', JSON.stringify(attachmentData));
      setAttachments(attachmentData);
    }
    return '';
  };

  const handleAttachment = (key, data) => {
    if (data.length !== 0) {
      localStorage.setItem('attachments', JSON.stringify(data));
    } else {
      localStorage.removeItem('attachments');
    }
    setAttachments(data);
  };

  return (
    <>
      <div className="content chat-message-list">
        <MessageList />
      </div>
      <div className="bottom">
        <div className="d-flex">
          <div className="d-flex flex-column justify-content-center">
            <label htmlFor="inputFile">
              <div className="bg-white pe-3 py-2 rounded-lg text-sm font-semibold h-auto cursor-pointer">
                <img alt="attachment" src={AttachmentSvg} />
              </div>
            </label>
            <input onChange={handleUploadFile} className="d-none" id="inputFile" type="file" />
          </div>
          <div className="chat-message-wrapper">
            <input
              id="chat-input"
              className="input"
              value={messageToSend}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (messageToSend || attachments.length !== 0)) sendMessage();
              }}
              placeholder="Type a message"
            />
            <Button disabled={!messageToSend && attachments.length === 0} onClick={sendMessage} className="br-8">
              Send
            </Button>
          </div>
        </div>
        {errorUploadFile && <div className="my-2 text-xs text-red1">{errorUploadFile}</div>}
        <Attachment fileData={attachments} setFile={setFile} handleAttachment={handleAttachment} />
      </div>
    </>
  );
};

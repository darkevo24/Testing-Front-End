import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from './socket';
import { useKeycloak } from '@react-keycloak/web';
import { chatSettingsSelector, chatStatusSelector, getChatSettings, getChatStatus, createChatRequest } from './reducer';
import { postContactUs } from '../TentangSDI/reducer';

import chatBot from 'assets/chat-bot.png';
import chatIcon from 'assets/customer-support.png';
import { ReactComponent as MinusIcon } from 'assets/minus-circle.svg';
import bn from 'utils/bemNames';
import './chat.scss';
import { GreetingOn } from './GreetingOn';
import { GreetingOffService } from './GreetingOffService';
import { ChatDataDiri } from './ChatDataDiri';
import { ChatWaiting } from './ChatWaiting';
import { ChatMinimized } from './ChatMinimized';
import { userSelector } from 'containers/Login/reducer';
import { ChatDialog } from './ChatDialog';
import { ReviewChat } from './ReviewChat';
import { Button } from 'components';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ChatPdf from './ChatPdf';

const bem = bn('chat');

export const Chat = ({ setFile }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);

  //True apabila user selesai mengisi data diri & masuk ke Chat dengan Admin
  //False apabila user masih di Greeting / Isi Data Diri
  const [isChatStarted, setIsChatStarted] = React.useState(false);
  const [chatNotStartStep, setChatNotStartStep] = React.useState('greeting'); //greeting, data-diri, rejected
  const [chatStartStep, setChatStartStep] = React.useState(null); //waiting, dialog, review
  const [chatSettings, setChatSettings] = React.useState(null);
  const [chatHistoryList, setChatHistoryList] = React.useState([]);

  const dispatch = useDispatch();
  const { record } = useSelector(chatSettingsSelector);
  const { record: chatStatus } = useSelector(chatStatusSelector);

  const { keycloak } = useKeycloak();
  const isLoggedIn = !!keycloak.authenticated;
  const user = useSelector(userSelector);

  React.useEffect(() => {
    dispatch(getChatSettings());

    //clear previous chat
    localStorage.removeItem('sdi_chat_message');
  }, []);

  React.useEffect(() => {
    if (user) {
      localStorage.setItem('sdi_chat_email', user?.email);
      reconnectSocket(user?.email);
    } else {
      const chatCredentials = localStorage.getItem('sdi_chat_credentials');
      if (chatCredentials) {
        try {
          const credentialObj = JSON.parse(chatCredentials);
          if (credentialObj.email) {
            localStorage.setItem('sdi_chat_email', credentialObj.email);
            reconnectSocket(credentialObj.email);
          }
        } catch (e) {
          return null;
        }
      }
    }
  }, [user]);

  React.useEffect(() => {
    socket.on('connect_error', (err) => {
      console.error(err);
    });
    socket.on('isEnabled changed', (msg) => {
      setIsEnabled(msg);
    });

    socket.on('chat message', (msg) => {
      dispatch(getChatStatus());
    });

    socket.on('chat end', (msg) => {
      dispatch(getChatStatus());
    });

    socket.on('chat request processed', (msg) => {
      if (msg === 'approved') {
        setIsChatStarted(true);
        setChatStartStep('dialog');
        dispatch(getChatStatus());
      } else if (msg === 'rejected') {
        setIsChatStarted(false);
        setChatNotStartStep('rejected');
      }
    });

    return function () {
      socket.off('connect_error');
      socket.off('isEnabled changed');
      socket.off('chat request processed');
      socket.off('chat message');
      socket.off('chat end');
    };
  }, []);

  React.useEffect(() => {
    if (Object.keys(record).length) {
      setChatSettings(record);
      setIsEnabled(record.isEnabled);
    }
  }, [record]);

  React.useEffect(() => {
    if (chatStatus?.code) {
      if (chatStatus.code === 'CAN_START_NEW') {
        setIsChatStarted(false);
        //open chat directly, if from login chat data diri
        if (localStorage.getItem('sdi_chat_opendatadiri')) {
          setIsOpen(true);
          setChatNotStartStep('data-diri');
          setTimeout(() => {
            localStorage.removeItem('sdi_chat_opendatadiri');
          }, 5000);
        } else {
          setChatNotStartStep('greeting');
        }
      } else if (chatStatus.code === 'WAITING_RESPONSE') {
        setIsChatStarted(true);
        setChatStartStep('waiting');

        // When create Chat Request for the first time, add auth to socket
        if (chatStatus.email) {
          reconnectSocket(chatStatus.email, false);
          localStorage.setItem('sdi_chat_email', chatStatus.email);
        }
      } else if (chatStatus.code === 'REJECTED') {
        setIsChatStarted(false);
        setChatNotStartStep('rejected');
      } else if (chatStatus.code === 'IN_PROGRESS') {
        setIsChatStarted(true);
        setChatStartStep('dialog');
        setChatHistoryList(chatStatus?.data?.history);
      } else if (chatStatus.code === 'REVIEW') {
        setIsChatStarted(false);
        setChatNotStartStep('review');
      }
    }
  }, [chatStatus]);

  const reconnectSocket = (email, getStatus = true) => {
    if (getStatus) dispatch(getChatStatus());
    socket.auth = { email };
    socket.disconnect().connect();
  };

  const startChat = async (data) => {
    await dispatch(createChatRequest({ isLoggedIn, data }));

    dispatch(
      postContactUs({
        name: data.name,
        email: data.email,
        phone: data.phone,
      }),
    );
  };

  const Greeting = () => {
    return !chatSettings ? (
      ''
    ) : isEnabled ? (
      <GreetingOn text={chatSettings?.greetingStart} startChat={() => setChatNotStartStep('data-diri')} />
    ) : (
      <GreetingOffService text={chatSettings?.greetingOffService} />
    );
  };

  const ChatNotStart = () => {
    if (chatNotStartStep === 'rejected') {
      return (
        <GreetingOffService text={chatSettings?.greetingOffService} startChat={() => setChatNotStartStep('greeting')} />
      );
    } else if (isEnabled && chatNotStartStep === 'data-diri') {
      return <ChatDataDiri startChat={startChat} />;
    } else if (isEnabled && chatNotStartStep === 'review') {
      return <ReviewChat setIsOpen={setIsOpen} />;
    } else {
      return <Greeting />;
    }
  };

  const ChatStart = () => {
    if (chatStartStep === 'waiting') {
      return <ChatWaiting />;
    } else if (chatStartStep === 'dialog') {
      return <ChatDialog chatHistoryList={chatHistoryList} setFile={setFile} />;
    } else {
      return <div>None</div>;
    }
  };

  return (
    <>
      <div className={bem.b()}>
        {isOpen ? (
          <div className={bem.e('opened', 'parent')}>
            <div className={`header ${chatNotStartStep === 'review' ? 'review' : ''}`}>
              {isChatStarted && chatStartStep === 'dialog' ? (
                <>
                  <img src={chatBot} alt="chatbot" className="botpicture" />
                  <div>
                    <div className="botname">{chatStatus?.data?.log?.customerServiceName || 'Customer Service'}</div>
                    <div className="botstatus">
                      <span className={isEnabled ? 'on' : 'off'} />
                      {isEnabled ? 'connected' : 'disconnected'}
                    </div>
                  </div>
                </>
              ) : isChatStarted === false && chatNotStartStep === 'review' ? (
                <PDFDownloadLink
                  document={<ChatPdf chatStatus={chatStatus} />}
                  fileName={`chathistory-${chatStatus?.data?.log?.ticketId?.ticketId}.pdf`}>
                  {() => <Button className="download-chat">Unduh percakapan</Button>}
                </PDFDownloadLink>
              ) : (
                <>
                  <img src={chatIcon} alt="chatIcon" className="botpicture" />
                  <div className="botname">Customer Service</div>
                </>
              )}
              <div className="close" onClick={() => setIsOpen(false)}>
                <MinusIcon />
              </div>
            </div>
            <div className="body">{isChatStarted ? <ChatStart /> : <ChatNotStart />}</div>
          </div>
        ) : (
          <ChatMinimized handleClick={() => setIsOpen(true)} />
        )}
      </div>
    </>
  );
};

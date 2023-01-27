import { ReactComponent as ChatOffServiceIcon } from 'assets/chat-offservice.svg';
import { Button } from 'components';

export const GreetingOffService = ({ text, startChat }) => {
  return (
    <>
      <div className="content">
        <div className="greetingoffservice">
          <ChatOffServiceIcon />
          {/* <div className="heading">Oops, Maaf</div> */}
          <div className="greetingcontent">{text}</div>
        </div>
      </div>
      <div className="bottom">
        {startChat && (
          <Button onClick={startChat} className="w-100 br-8">
            Start
          </Button>
        )}
      </div>
    </>
  );
};

import { Button } from 'components';

export const GreetingOn = ({ text, startChat }) => {
  return (
    <>
      <div className="content">
        <div className="greeting">{text}</div>
      </div>
      <div className="bottom">
        <Button onClick={startChat} className="w-100 br-8">
          Start
        </Button>
      </div>
    </>
  );
};

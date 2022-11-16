import bn from 'utils/bemNames';
import chatIcon from 'assets/customer-support.png';
import './chat.scss';

const bem = bn('chat');

export const ChatMinimized = ({ handleClick }) => {
  return (
    <div className={bem.e('minimized')} onClick={handleClick}>
      <img src={chatIcon} className="icon" alt="icon" />
      Customer Support
    </div>
  );
};

import RBButton from 'react-bootstrap/Button';
import Loader from './Loader';

const Button = ({ children, disabled, loading, ...props }) => {
  const isDisabled = disabled || loading;
  return (
    <RBButton {...props} onClick={isDisabled ? null : props.onClick} disabled={isDisabled}>
      {loading && <Loader />}
      {children}
    </RBButton>
  );
};

export default Button;

import { useSelector } from 'react-redux';
import { userSelector } from '../containers/Login/reducer';

export const ComponentAccessibility = ({ roles, children }) => {
  const user = useSelector(userSelector);
  if (!roles.includes(user.roles)) return null;

  return children;
};

import { useSelector } from 'react-redux';
import { userSelector } from '../containers/Login/reducer';

export const ComponentAccessibility = ({ roles, children, flag = false }) => {
  const user = useSelector(userSelector) || [];
  if (!roles.includes(user.roles) || flag) return null;

  return children;
};

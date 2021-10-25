import { forwardRef, useImperativeHandle, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import { Close, alertIcons } from '../Icons';
import { setNotificationOptions } from '../../containers/App/reducer';

import bn from 'utils/bemNames';

const bem = bn('notification');

const Notification = (props) => {
  const { forwardedRef, options: propOptions, visible: propVisible = false } = props;
  const [isVisible, setIsVisible] = useState(false);
  const options = useSelector((state) => state?.global?.notificationOptions);
  const dispatch = useDispatch();

  const { showClose = true, type = 'warning', icon, onClose = () => {}, message } = propOptions || options;

  const setOptions = (options) => {
    dispatch(setNotificationOptions(options));
  };

  const show = (notificationOptions) => {
    setOptions(notificationOptions);
    setIsVisible(true);
  };

  const hide = () => {
    onClose();
    setIsVisible(false);
    setOptions({});
  };

  useImperativeHandle(forwardedRef, () => ({
    show,
    hide,
  }));

  const visible = isVisible || propVisible;

  if (!visible) {
    return null;
  }

  const Icon = alertIcons[icon];
  return (
    <div className={cx(bem.b(), { visible })}>
      <div className={cx('p-16', bem.e('wrapper'), bem.e(type))}>
        {Icon && <Icon />}
        <div className={bem.e('message')}>{message}</div>
        {showClose && (
          <div className="cursor-pointer ms-auto icon-close" onClick={hide}>
            <Close />
          </div>
        )}
      </div>
    </div>
  );
};

export default forwardRef((props, ref) => {
  return <Notification {...props} forwardedRef={ref} />;
});

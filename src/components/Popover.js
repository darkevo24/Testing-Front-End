import RBPopover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import cx from 'classnames';
import bn from 'utils/bemNames';

const bem = bn('popover');

const Popover = ({ children, className, header, trigger, triggerOn = 'click', placement = 'bottom', ...rest }) => {
  const overlay = (
    <RBPopover className={cx(bem.b(), className)} {...rest}>
      {header && <RBPopover.Header className={bem.e('header')}>{header}</RBPopover.Header>}
      <RBPopover.Body className={bem.e('body')}>{children}</RBPopover.Body>
    </RBPopover>
  );
  return (
    <OverlayTrigger rootClose trigger={triggerOn} overlay={overlay} placement={placement} {...rest}>
      {trigger}
    </OverlayTrigger>
  );
};

export default Popover;

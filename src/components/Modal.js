import cx from 'classnames';
import Button from 'react-bootstrap/Button';
import RBModal from 'react-bootstrap/Modal';

import { Close, modalIcons } from 'components/Icons';
import bn from 'utils/bemNames';

const bem = bn('modal');

const Modal = ({ actions, visible, children, onClose, icon, title = 'Modal title' }) => {
  const Icon = modalIcons[icon];
  return (
    <RBModal show={visible} onHide={onClose} backdrop backdropClassName={bem.e('backdrop')} className={bem.b()}>
      <div className={bem.e('section')}>
        <RBModal.Header>
          <div className={bem.e('header-wrapper')}>
            {Icon && <Icon />}
            <div className={bem.e('title')}>{title}</div>
          </div>
          <div className="cursor-pointer p-1" onClick={onClose}>
            <Close />
          </div>
        </RBModal.Header>
        <RBModal.Body>{children}</RBModal.Body>
      </div>
      {actions && (
        <div className={cx(bem.e('section'), 'mt-16')}>
          <RBModal.Footer>
            {actions.map(({ text, ...actionProps }, index) => (
              <Button key={`action-${index}`} className="btn-rounded" {...actionProps}>
                {text}
              </Button>
            ))}
          </RBModal.Footer>
        </div>
      )}
    </RBModal>
  );
};

export default Modal;
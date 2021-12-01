import cx from 'classnames';
import Button from 'react-bootstrap/Button';
import RBModal from 'react-bootstrap/Modal';

import { Close, modalIcons } from 'components/Icons';
import bn from 'utils/bemNames';

const bem = bn('modal');

const ModalDelete = ({
  actions,
  size,
  visible,
  children,
  onClose,
  icon,
  title = 'Modal title',
  subtitle,
  showHeader = true,
  centered = false,
}) => {
  const Icon = modalIcons[icon];
  return (
    <RBModal
      show={visible}
      size={size}
      onHide={onClose}
      backdrop
      backdropClassName={bem.e('backdrop')}
      className={bem.b()}
      centered={centered}>
      <div className={bem.e('section')}>
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

export default ModalDelete;

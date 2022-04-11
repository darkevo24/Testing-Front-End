import cx from 'classnames';
import RBModal from 'react-bootstrap/Modal';

import { Button } from 'components';
import { Close, icons } from 'components/Icons';
import bn from 'utils/bemNames';

const bem = bn('modal');

const Modal = ({
  className,
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
  displayRequiredField = false,
}) => {
  const Icon = icons[icon];
  return (
    <RBModal
      show={visible}
      size={size}
      onHide={onClose}
      backdrop
      backdropClassName={bem.e('backdrop')}
      className={cx(bem.b(), bem.e(className))}
      centered={centered}>
      <div className={bem.e('section')}>
        {showHeader && (
          <RBModal.Header>
            <div>
              {!Icon && !title && !subtitle ? null : (
                <div className={bem.e('header-wrapper')}>
                  {Icon && <Icon />}
                  <div className={bem.e('title-wrapper')}>
                    <div className={bem.e('title')}>{title}</div>
                    {subtitle && <div className={bem.e('subtitle')}>{subtitle}</div>}
                  </div>
                </div>
              )}
              {displayRequiredField && (
                <div className="mt-10 ml-20">
                  <span className="sdp-text-red pl-2">* Wajib Diisi </span>
                </div>
              )}
            </div>
            <div className="cursor-pointer p-1" onClick={onClose}>
              <Close />
            </div>
          </RBModal.Header>
        )}
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

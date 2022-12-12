import PropTypes from 'prop-types';

export default function TicketModal({ children, width, backgroundColor }) {
  return (
    <div
      style={{ zIndex: 1000 }}
      className="overflow-x-hidden overflow-y-auto position-fixed top-0 right-0 left-0 w-100 bg-black bg-opacity-50 md:inset-0 h-modal md:h-full pb-4">
      <div className="d-flex justify-content-center w-100">
        <div className={`relative p-4 h-auto ${width ?? 'w-100'}`}>
          <div className={`relative bg-white border-radius-lg shadow ${backgroundColor}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

TicketModal.defaultProps = {
  width: '',
  backgroundColor: 'dark:bg-black-700',
};

TicketModal.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  backgroundColor: PropTypes.string,
};

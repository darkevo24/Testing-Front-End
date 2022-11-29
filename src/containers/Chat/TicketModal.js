import PropTypes from 'prop-types';

export default function TicketModal({ children, width, backgroundColor }) {
  return (
    <div className="overflow-x-hidden overflow-y-auto fixed top-0 right-0 left-0 z-50 w-full bg-black-1000 bg-opacity-50 md:inset-0 h-modal md:h-full pb-4">
      <div className="flex justify-center w-full">
        <div className={`relative p-4 h-auto ${width ?? 'w-full'}`}>
          <div className={`relative bg-white rounded-lg shadow ${backgroundColor}`}>{children}</div>
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

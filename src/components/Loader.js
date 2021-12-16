import cx from 'classnames';

export const Loader = ({ fullscreen = false }) => {
  return (
    <div className={cx('flex-center', { 'abs-center h-100 w-100 zi-100 bg-secondary-translucent': fullscreen })}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;

import cx from 'classnames';
import bn from 'utils/bemNames';

const bem = bn('map-tile');

const MapTile = ({ title = '=== Map title ===', description = '=== Description ===', className }) => {
  return (
    <div className={cx(bem.b(), className)}>
      <div className={cx(bem.e('header'), 'bg-secondary px-16 py-12')}>
        <div className={cx(bem.e('title'), 'fw-bold lh-18')}>{title}</div>
      </div>
      <div className={cx(bem.e('body'))}>=== Placeholder ===</div>
      <div className={cx(bem.e('footer'), 'bg-secondary px-16 py-8')}>
        <div className={cx(bem.e('description'), 'fs-12 lh-14')}>{description}</div>
      </div>
    </div>
  );
};

export default MapTile;

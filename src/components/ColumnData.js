import chunk from 'lodash/chunk';
import cx from 'classnames';
import bn from 'utils/bemNames';

const bem = bn('column-data');

const ColumnData = ({ items = [], className, labelClassName, valueClassName, itemsPerRow = 2 }) => {
  const chunkedItems = chunk(items, itemsPerRow);
  return (
    <div className={cx(className, bem.b())}>
      {chunkedItems.map((items, rowIndex) => (
        <div className={cx('row', bem.e('row'))} key={`data-row-${rowIndex}`}>
          {items.map((item, columnIndex) => (
            <div className={cx('col', bem.e('col'))} key={`data-row-col-${rowIndex}-${columnIndex}`}>
              <div className={cx(labelClassName, bem.e('label'))}>{item.label}</div>
              <div className={cx(valueClassName, bem.e('value'), bem.e(`value-${item.variant}`))}>{item.value}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ColumnData;

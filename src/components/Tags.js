import cx from 'classnames';
import { mapFormatToColor } from 'utils/helper';

export const Tags = ({ text, fillColor, colorClass: propColorClass, className }) => {
  const colorClass = propColorClass || (fillColor && mapFormatToColor(text));
  return <div className={cx('bg-gray br-28 py-6 px-10 ml-10', className, colorClass)}>{text}</div>;
};

export default Tags;

import cx from 'classnames';

export const Tags = ({ text, colorClass, className }) => {
  return <div className={cx('bg-gray br-28 py-6 px-10 ml-10', className, colorClass)}>{text}</div>;
};

export default Tags;

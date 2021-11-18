import RBTabs from 'react-bootstrap/Tabs';
import RBTab from 'react-bootstrap/Tab';
import cx from 'classnames';
import bn from 'utils/bemNames';

const bem = bn('tabs');

const Tabs = ({ className, variant = 'default', highlightOnHover, children, ...rest }) => {
  return (
    <div className={cx(bem.b(), bem.m(variant), bem.m(highlightOnHover && 'highlight'), className)}>
      <RBTabs {...rest}>{children}</RBTabs>
    </div>
  );
};

Tabs.Tab = RBTab;

export default Tabs;

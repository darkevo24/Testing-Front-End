import { useState, useEffect } from 'react';
import cx from 'classnames';
import take from 'lodash/take';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import isFunction from 'lodash/isFunction';
import { motion, useAnimation } from 'framer-motion';
import { Close, Minus, Plus, Search } from 'components/Icons';
import bn from 'utils/bemNames';

const bem = bn('section-list');

const SectionList = ({
  search,
  searchPlaceholder = 'Search',
  options,
  title = 'Section title',
  showMoreText = 'Show More',
  className,
  onSelectOption,
  numberOfOptionsToShow = 10,
  selectedOptions = [],
  isDisabled,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [itemsToShow, setItemsToShow] = useState(numberOfOptionsToShow);
  const selectedIds = selectedOptions.map((option) => option.id);
  const controls = useAnimation();

  useEffect(() => {
    setIsExpanded(!isDisabled);
  }, [isDisabled]);

  const handleSearchChange = ({ target: { value = '' } = {} }) => {
    setSearchText(value);
  };

  const handleOptionSelect = (option) => () => {
    if (isFunction(onSelectOption)) {
      onSelectOption(option);
    }
  };

  const handleShowMore = () => {
    setItemsToShow(itemsToShow + numberOfOptionsToShow);
  };

  const toggleExpanded = () => {
    if (isDisabled) return;

    const newIsExpanded = !isExpanded;
    if (newIsExpanded) {
      controls.start({
        opacity: 1,
        height: '100%',
        transition: { duration: 0.2 },
      });
    } else {
      controls.start({
        opacity: 0,
        height: '0px',
        transition: { duration: 0.2 },
      });
    }
    setIsExpanded(newIsExpanded);
  };

  const searchRegex = new RegExp(searchText, 'i');
  const filterdOptions = options.filter((o) => {
    const filterText = `${o.text}`;
    return searchRegex.test(filterText);
  });

  const truncatedOptions = take(filterdOptions, itemsToShow);

  return (
    <div className={cx(bem.b(), className, isDisabled && 'sdp-section-list__disabled')}>
      <div className={cx(bem.e('header'), 'flex-row-between bg-secondary')}>
        <div className={cx(bem.e('title'), 'fw-bold lh-18')}>{title}</div>
        <div className="icon-box right" onClick={toggleExpanded}>
          {isExpanded ? <Minus /> : <Plus />}
        </div>
      </div>
      {isExpanded && (
        <motion.div animate={controls} className={bem.e('options')}>
          {search && (
            <InputGroup>
              <Form.Control
                variant="normal"
                className={bem.e('search-input')}
                type="text"
                placeholder={searchPlaceholder}
                value={searchText}
                onChange={handleSearchChange}
              />
              <div className="icon-container">
                <Search variant="gray" />
              </div>
            </InputGroup>
          )}
          {truncatedOptions.map((option) => {
            const id = option.id;
            const isSelected = selectedIds.includes(id);
            return (
              <div
                key={id ? `${title}-${id}` : `${title}-${option.text}`}
                className={cx(bem.e('option-item'), { 'selected-item': isSelected })}
                onClick={handleOptionSelect(option)}>
                {option.text}
                {!!option.count && <div className={bem.e('tag')}>{option.count}</div>}
                {isSelected && (
                  <div className={cx(bem.e('remove-option'), 'icon-container')}>
                    <Close variant="danger" />
                  </div>
                )}
              </div>
            );
          })}
          {truncatedOptions.length !== filterdOptions.length && (
            <div className={cx(bem.e('option-item'), 'show-more')} onClick={handleShowMore}>
              {showMoreText}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SectionList;

import cx from 'classnames';
import bn from 'utils/bemNames';

const bem = bn('highlight-words');

const HighlightWords = ({
  deliminator = ' ',
  text,
  textClassName = 'sdp-sub-heading-light',
  className,
  wordsToHighlight = 1,
}) => {
  const splitText = text.split(deliminator);

  const highlightTextItems = splitText.slice(0, wordsToHighlight);
  const normalTextItems = splitText.slice(wordsToHighlight);

  const highlightText = highlightTextItems.join(deliminator);
  const normalText = normalTextItems.join(deliminator);
  return (
    <div className={cx(bem.b(), className, 'd-flex')}>
      <div className={cx(textClassName, bem.e('highlighted'))}>{highlightText}</div>
      <div className={cx(textClassName)}>{normalText}</div>
    </div>
  );
};

export default HighlightWords;

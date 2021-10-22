import cx from 'classnames';

export const createBEM = (namespace) => {
  return (blockName) => {
    let block = blockName;

    if (typeof namespace === 'string') {
      block = `${namespace}-${blockName}`;
    }

    return {
      b: (...more) => {
        return cx(block, more);
      },
      e: (className, ...more) => {
        return cx(`${block}__${className}`, more);
      },
      m: (className, ...more) => {
        return cx(`${block}--${className}`, more);
      },
    };
  };
};

export const bem = createBEM('sdp');

export default bem;

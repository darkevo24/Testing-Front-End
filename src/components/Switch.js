import React from 'react';

const Switch = ({ isOn, handleToggle, type }) => {
  return (
    <div className="d-flex align-items-center">
      <label className="mr-10">{isOn ? 'Active' : 'InActive'}</label>{' '}
      <input
        disabled={type?.toLowerCase() === 'draft' || type === undefined}
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label style={{ background: isOn && '#06D6A0' }} className="react-switch-label" htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
      </label>
    </div>
  );
};

export default Switch;

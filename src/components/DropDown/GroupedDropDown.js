import React from 'react';

import Select, { components } from 'react-select';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { MinusIcon, PlusIcon } from 'assets';

const Control = ({ children, ...props }) => {
  const { icon, text, value } = props.selectProps;

  return (
    <components.Control {...props}>
      <i>{icon}</i>
      <span>{value?.value || text}</span>
      {children}
    </components.Control>
  );
};

class GroupedDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: {},
      collapsed: [],
      options: [],
    };
  }

  componentDidMount() {
    const { defaultData = {}, data } = this.props;
    if (!isEmpty(defaultData)) {
      this.setState({ selectedValues: { ...defaultData } });
    }
    this.setState({
      options: [...data],
    });
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    const { defaultData = {} } = this.props;
    if (!isEmpty(defaultData) && !isEqual(defaultData, prevProps.defaultData)) {
      this.setState({ selectedValues: { ...defaultData } });
    }
    if (isEmpty(defaultData) && !isEmpty(prevProps.defaultData)) {
      this.setState({ selectedValues: {} });
    }
  }

  handleOnChange = (selected) => {
    this.setState({ selectedValues: selected });
    this.props.onChange(selected);
  };

  handleCollapsedData = (key) => {
    const collapseClone = [...this.state.collapsed];
    const dataClone = cloneDeep(this.state.options);
    const propsDataClone = cloneDeep(this.props.data);
    if (collapseClone.includes(key)) {
      const index = dataClone.findIndex((item) => item.label === key);
      const propIndex = propsDataClone.findIndex((item) => item.label === key);
      dataClone[index].options = propsDataClone[propIndex].options;
      const collapseIndex = collapseClone.findIndex((item) => item === key);
      if (collapseIndex !== -1) collapseClone.splice(collapseIndex, 1);
    } else {
      collapseClone.push(key);
      const index = dataClone.findIndex((item) => item.label === key);
      dataClone[index].options = [{ value: '', label: '', isDisabled: true }];
    }
    this.setState({
      options: dataClone,
      collapsed: collapseClone,
    });
  };

  formatGroupLabel = (data) => {
    const { collapsed } = this.state;
    const isCollapsed = collapsed.includes(data.label);
    return (
      <div className="d-flex align-items-center" onClick={() => this.handleCollapsedData(data.label)}>
        {!isCollapsed ? <MinusIcon /> : <PlusIcon />}
        <span>{data.label}</span>
      </div>
    );
  };

  render() {
    const { propClass, icon, text } = this.props;
    const { selectedValues, options } = this.state;
    return (
      <Select
        formatGroupLabel={this.formatGroupLabel}
        closeMenuOnSelect={true}
        value={!isEmpty(selectedValues) ? selectedValues : null}
        options={options}
        className={`basic-single ${propClass}`}
        classNamePrefix="select"
        onChange={this.handleOnChange}
        components={{ Control }}
        icon={icon}
        text={text}
      />
    );
  }
}

export default GroupedDropdown;

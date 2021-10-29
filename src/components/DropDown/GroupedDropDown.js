import React from 'react';

import Select, { components } from 'react-select';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { MinusIcon, PlusIcon } from 'assets';

export default class GroupedDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: {},
      collapsed: [],
      data: [],
    };
  }

  componentDidMount() {
    const { defaultData = {}, data } = this.props;
    if (!isEmpty(defaultData)) {
      this.setState({ selectedValues: { ...defaultData } });
    }
    this.setState({
      data,
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
    //this.props.onChange(selected);
  };

  handleCollapsedData = (key) => {
    const collapseClone = [...this.state.collapsed];
    const dataClone = [...this.state.data];
    const { data } = this.props;
    if (collapseClone.includes(key)) {
      const index = dataClone.findIndex((item) => item.label === key);
      const propIndex = data.findIndex((item) => item.label === key);
      dataClone[index].options = data[propIndex].options;
    } else {
      collapseClone.push(key);
      const index = dataClone.findIndex((item) => item.label === key);
      dataClone[index].options = [];
    }
    this.setState({
      data: dataClone,
      collapsed: collapseClone,
    });
  };

  formatGroupLabel = (data) => {
    const { collapsed } = this.state;
    const isCollapsed = collapsed.includes(data.label);
    return (
      <div className="d-flex align-items-center sdp-text-red" onClick={() => this.handleCollapsedData(data.label)}>
        {isCollapsed ? <MinusIcon /> : <PlusIcon />}
        <span>{data.label}</span>
      </div>
    );
  };

  render() {
    const { data, placeHolder, isLoading = false, isClearable = true, isDisabled = false, Control, propClass } = this.props;
    const { selectedValues } = this.state;
    return (
      <Select
        formatGroupLabel={this.formatGroupLabel}
        closeMenuOnSelect={true}
        value={!isEmpty(selectedValues) ? selectedValues : null}
        options={data}
        className={`basic-single ${propClass}`}
        classNamePrefix="select"
        onChange={this.handleOnChange}
        isClearable={isClearable}
        placeholder={placeHolder}
        isLoading={isLoading}
        isDisabled={isDisabled}
        components={{ Control }}
      />
    );
  }
}

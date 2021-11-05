import React from 'react';
import { DropTarget } from 'react-drag-drop-container';
import BoxItem from './BoxItem';
var shortid = require('shortid');

export default class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items ? props.items : [],
    };
  }

  handleDrop = (e) => {
    let items = this.state.items.slice();
    items.push({
      label: e.dragData.label,
      uid: shortid.generate(),
      props: e.dragData.props,
      component: e.dragData.component,
    });
    this.setState({ items: items });
    e.containerElem.style.visibility = 'hidden';
  };

  swap = (fromIndex, toIndex, dragData) => {
    let items = this.state.items.slice();
    const item = { label: dragData.label, uid: shortid.generate(), props: dragData.props, component: dragData.component };
    items.splice(toIndex, 0, item);
    this.setState({ items: items });
  };

  kill = (uid) => {
    let items = this.state.items.slice();
    const index = items.findIndex((item) => {
      return item.uid === uid;
    });
    if (index !== -1) {
      items.splice(index, 1);
    }
    this.setState({ items: items });
  };

  render() {
    /*
        Note the two layers of DropTarget. 
        This enables it to handle dropped items from 
        outside AND items dragged between boxes.
    */
    return (
      <div className="component_box">
        <h5>{this.props.title}</h5>
        <DropTarget onHit={this.handleDrop} targetKey={this.props.targetKey} dropData={{ name: this.props.name }}>
          <DropTarget onHit={this.handleDrop} targetKey="boxItem" dropData={{ name: this.props.name }}>
            <div className="box">
              {this.state.items.map((item, index) => {
                console.log(item);
                return (
                  <BoxItem
                    key={item.uid}
                    uid={item.uid}
                    kill={this.kill}
                    index={index}
                    swap={this.swap}
                    itemprops={item.props}
                    component={item.component}>
                    {item.label}
                  </BoxItem>
                );
              })}
            </div>
          </DropTarget>
        </DropTarget>
      </div>
    );
  }
}

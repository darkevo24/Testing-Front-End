import React from 'react';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import './BoxItem.css';

/*
    BoxItem - a thing that appears in a box, after you drag something into the box
*/

export default class BoxItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemprops: props.itemprops ? props.itemprops : {},
    };
  }

  handleDrop = (e) => {
    e.stopPropagation();
    this.props.swap(e.dragData.index, this.props.index, e.dragData);
    e.containerElem.style.visibility = 'hidden';
  };

  deleteMe = () => {
    this.props.kill(this.props.uid);
  };

  render() {
    /*
        Notice how these are wrapped in a DragDropContainer (so you can drag them) AND
        in a DropTarget (enabling you to rearrange items in the box by dragging them on
        top of each other)
      */
    console.log(this.props.itemprops);
    return (
      <div className="box_item_component">
        <DragDropContainer
          targetKey="boxItem"
          dragData={{
            label: this.props.children,
            index: this.props.index,
            props: this.props.itemprops,
            component: this.props.component,
          }}
          onDrop={this.deleteMe}
          disappearDraggedElement={true}
          dragHandleClassName="grabber">
          <DropTarget onHit={this.handleDrop} targetKey="boxItem">
            <div className="outer">
              <div className="item">
                <span className="grabber">&#8759;</span>
                {this.props.children}
              </div>
              {this.props.itemprops ? (
                <div className="props">
                  {Object.keys(this.state.itemprops).map((key) => (
                    <div>
                      <label>{key}</label>
                      <input value={this.state.itemprops[key]} />
                    </div>
                  ))}
                </div>
              ) : (
                ''
              )}
            </div>
          </DropTarget>
        </DragDropContainer>
      </div>
    );
  }
}

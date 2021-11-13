import React from 'react';
import Box from './Box';
import './DragThingsToBoxesDemo.css';
var shortid = require('shortid');

export default class DragThingsToBoxesDemo extends React.Component {
  constructor(props) {
    super(props);
    this.kiri = React.createRef();
    this.kanan = React.createRef();
    this.inactive = React.createRef();
    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    let obj = {
      kiri: this.kiri.current.state.items,
      kanan: this.kanan.current.state.items,
      inactive: this.inactive.current.state.items,
    };

    window.localStorage.setItem('beritalayout', JSON.stringify(obj));
  }

  render() {
    let obj = JSON.parse(window.localStorage.getItem('beritalayout'));

    const itemKiri = obj.kiri.map((el) => ({
      label: el.label,
      props: el.props,
      uid: shortid.generate(),
      component: el.component,
    }));

    const itemKanan = obj.kanan.map((el) => ({
      label: el.label,
      props: el.props,
      uid: shortid.generate(),
      component: el.component,
    }));

    const inactiveItems = obj.inactive.map((el) => ({
      label: el.label,
      props: el.props,
      uid: shortid.generate(),
      component: el.component,
    }));

    return (
      <div>
        <div className="drag_things_to_boxes">
          <div className="boxes">
            <Box targetKey="box" items={itemKiri} title="Konten Utama" ref={this.kiri} />
            <Box targetKey="box" items={itemKanan} title="Sidebar Kanan" ref={this.kanan} />
            <Box targetKey="box" items={inactiveItems} title="Tidak Ditampilkan" ref={this.inactive} />
          </div>
        </div>
        <div className="mt-4">
          <button onClick={this.onSave}>Save</button>
        </div>
      </div>
    );
  }
}

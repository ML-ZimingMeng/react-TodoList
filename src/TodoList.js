import React, { Component } from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import store from './store';
import { Input, Button, List } from 'antd';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators';

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    store.subscribe(this.handleStoreChange);
  }
  render() {
    return (
      <div style={{marginTop: '10px', marginLeft: '10px'}}>
        <div>
          <Input 
          onChange={this.handleInputChange}
          value = {this.state.inputValue}
          style={{width: '300px', marginRight: '10px'}}
          placeholder="Basic usage" 
          />
          <Button onClick={this.handleBtnClick} type="primary">提交</Button>
        </div>
        <List
          style={{width: '300px', marginTop: '10px'}}
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (
            <List.Item onClick={this.handleItemDelete.bind(this, index)}>
              {item}
            </List.Item>
          )}
        />
      </div>
    )
  }

  handleInputChange(e) {
    const action = getInputChangeAction(e.target.value);
    store.dispatch(action);
  }

  handleStoreChange() {
    this.setState(store.getState());
  }

  handleBtnClick() {
    const action = getAddItemAction();
    store.dispatch(action);
  }

  handleItemDelete(index) {
    const action = getDeleteItemAction(index);
    store.dispatch(action);
  }
}
export default TodoList;
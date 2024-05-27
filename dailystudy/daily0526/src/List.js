import React, { Component } from "react";
import CloseButton from 'react-bootstrap/CloseButton';
import ListGroup from 'react-bootstrap/ListGroup';
import './css/List.css';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        };
    }

    isCheck = () => {
        this.setState(prevState => ({
            isChecked: !prevState.isChecked
        }));
    }
    
    modifyText = () => {
        const newTodo = prompt("해야 할 일을 입력하세요:", this.props.text);
        if (newTodo !== null && this.props.modify) { // modify 함수가 존재하는지 확인
            this.props.modify(this.props.id, newTodo);
        }
    }
    
    render() {
        const { id, text } = this.props;
        const { isChecked } = this.state;
        return (
            <div className="todolist">
                <ListGroup.Item as="li" id={"todoItem" + id} className="list-item">
                    <div className="check-button">
                        <input type="button" value={isChecked ? "💗" : "🖤"} onClick={this.isCheck} 
                        		style={{ background: 'none', border: 'none', padding: '0' }} />
                    </div>
                    <div className="text">{text}</div>
                    <div className="modify-button">
                        <button onClick={this.modifyText} style={{ background: 'none', border: 'none', padding: '0' }}>↩</button>
                    </div>
                    <div className="remove-button">
                        <CloseButton aria-label="Hide" onClick={() => { this.props.delete(this.props.id) }} />
                    </div>
                </ListGroup.Item>
            </div>
        );
    }
}
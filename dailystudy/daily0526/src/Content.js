import React, { Component } from "react";
import TodoList from "./TodoList";
import List from "./List";
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './css/Form.css';

export default class Content extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            itemNum: 0,
            items: [] // 1. todoList의 item 관리하는 배열
        };
    }

    addTodo() {
        const inputText = document.querySelector('#inputText');
        if (inputText && inputText.value.trim() !== ""){
	        const newItem = (
	            <List
	                key={this.state.itemNum}
	                id={this.state.itemNum}
	                text={inputText.value}
	                delete={(num) => { this.deleteTodo(num) }}
	                modify={(id, newText) => { this.modifyTodo(id, newText) }} // modify 함수 추가
	            />
	        );
	        this.setState(prevState => (
					{
		            items: [...prevState.items, newItem],
		            itemNum: prevState.itemNum + 1
		       		}
	        	)
	        );
	        inputText.value = "";
	    } else{
			 alert("할 일을 입력하세요.");
		} 
	}

    deleteTodo(num) {
	        this.setState(prevState => (
				{
	            items: prevState.items.filter(item => item.props.id !== num)
	       		 }
	        )
        );
    }
    
    modifyTodo(id, newText) {
        this.setState(prevState => ({
            items: prevState.items.map(item => {
                if (item.props.id === id) {
                    return React.cloneElement(item, { text: newText }); // 텍스트 수정
                }
                return item;
            })
        }));
    }
    

    render() {
        return (
            <div>
	            <Stack direction="horizontal" gap={3} className="mb-1">
	            	<div className="formbox">
	                    <Form.Control autoComplete="off" id="inputText" type="text" placeholder="입력" />
	                    <Button variant="secondary" onClick={() => { this.addTodo() }}>Save</Button>
	                </div>
	            </Stack>
           		<TodoList items={this.state.items} /> 
        	</div>
        );
    }
}
// 2. <TodoList items={this.state.items} /> props를 이용해 TodoList에 전달
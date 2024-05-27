import { Component } from "react";
export default class TodoList extends Component{
	render(){
		return(
			<ul>{this.props.items}</ul>
		);
	}
} 

// 3. props로 전달받은 items를 <ul>태그 안에서 출력되도록 함

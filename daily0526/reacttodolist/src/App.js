import 'bootstrap/dist/css/bootstrap.min.css';

import { Component } from "react";
import Title from './Title'
import Content from './Content';
import './css/Container.css';

//<Title text="Todo List" />를 통해 Title 컴포넌트에 text prop을 전달
export default class App extends Component{
	render() {
		return(
			<div class="container">
				<div class="maintext">
					<Title text="Todo List" /> 
				</div>
				<Content />
			</div>
		);
	}
}
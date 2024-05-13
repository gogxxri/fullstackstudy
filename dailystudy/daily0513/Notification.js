// Notification.js  		출력용

import React from "react";

class Notification extends React.Component{
	constructor(props){
		super(props);
	}	
	componentDidMount(){
		console.log(`${this.props.id} componentDidMount 실행`);
	}
	componentDidUpdate(){
		console.log(`${this.props.id} componentDidUpdate 실행`);
	}
	componentWillUnmount(){
		console.log(`${this.props.id} componentDidWillUnmount 실행`);
	}
	render(){
		return(
			<div>
				<h3>{this.props.message}</h3>
			</div>
		);
	}
}
export default Notification;
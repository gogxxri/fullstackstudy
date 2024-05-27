import React, { Component } from "react";

export default class Title extends Component {
	render(){
		return(
			<div>{this.props.text}</div> // this.props.text를 이용해 전달받은 텍스트를 렌더링 
										// 전달받은 text prop을 this.props.text로 접근하여 화면에 출력
		);
	}
}


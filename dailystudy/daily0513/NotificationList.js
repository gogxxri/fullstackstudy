//NotificationList.js

import React from "react";
import Notification from "./Notification";

const messages = [
	{id : 1, message : "안녕하세요"},
	{id : 2, message : "HELLO"},
	{id : 3, message : "HI"}
];

let timer;
class NotificationList extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			notifications : [],
		}
	}
	componentDidMount(){
		const {notifications} = this.state;
		timer = setInterval( // 일정 시간마다 메세지 추가하는 타이머 설정
			() => {
				if(notifications.length < messages.length){
					const index = notifications.length;
					notifications.push(messages[index]);
					this.setState( // 재랜더링
						{notifications : notifications}
					);
				} else { // notifications.length가 3보다 클때
					clearInterval(timer); // Interval 중지
				}
			},3000
		);
	}
	render(){
		return(
			<>
				{	//자바스크립트 코드
					this.state.notifications.map( //for문& foreach문 사용못함(리턴값 없기때문), map사용(리턴, 키 필요)
						(notification) => {
							return <Notification key={notification.id} id={notification.id} message={notification.message}/>
						}
					)
				}
			</>
		);
	}
}
export default NotificationList;
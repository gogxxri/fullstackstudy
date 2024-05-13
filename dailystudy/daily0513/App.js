/*
//클래스 컴포넌트
// state :  setState() 함수를 통해서 수정
import React from "react";
class Person extends React.Component { // 클래스 컴포넌트를 만들때에는 React.Component 상속받아야함
	constructor(props){
		super(props)
		this.name = props.name; // 멤버변수
		this.state = { // state 안에 있는 변수
			age : props.age,
			tel : props.tel
		};
	}
	render(){
		return(
			<>
				<h3>{this.name}</h3> 
				<h3>{this.state.age}</h3>
				<h3>{this.state.tel}</h3>
				<button onClick={() => {this.name="이순신"}}>이름 수정</button><br/>
				<button onClick={() => {this.state.age=40}}>나이 수정</button><br/>
				<button onClick={() => {this.setState({tel : "9999-9999"})}}>전화번호 수정</button><br/>
			</>
		);
	};
}

function App(){
	return(
		<>
			<h2>State</h2>
			<Person name="홍길동" age="20" tel="1111-1111"/>
		</>
	);
}
export default App;
*/


/*
//이벤트 핸들러 호출

// onclick="test()"
// addEventListener("click", test);
// addEvenetListener("click", () => {})

// 위는 세개의 자바스크립트 이벤트  추가 방법
// 아래는 리엑트에서 이벤트 핸들러 호출 방법


//onClick={test}				// 함수도 객체이기 때문에 실제로 함수의 참조값을 전달함 (()없이 함수의 이름만 전달해도 주소가 전달됨)
//onClick={test()}				// 함수 실행 후 반환값을 onClick에 저장하겠다는 의미 => 에러
//onClick={() => test()}		// 콜백함수로 사용하려면 화살표 함수를 사용해야함
//onClick={test(a, b)} 			// 무한루프 발생 (랜더링을 하면 함수를 실행하게되고 값이 바뀌면 재랜더링이 반복됨) => 에러
//onClick={() => test(a, b)} 	// 매개변수를 전달할 경우에는 반드시 화살표 함수로 사용해야 함

import React from "react";
class Person extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name : props.name,
		}
	}
	setName = ({name:value}) => {
		this.setState({name : value ? value : "수정됨"})
	}
	render(){
		return(
			<>
				<h3>{this.state.name}</h3><br/>		
				<button onClick={this.setName}>수정1</button><br/>	
				<button onClick={() => this.setName({})}>수정3</button><br/>	
				<button onClick={() => this.setName({name:"이순신"})}>수정5</button><br/>	
				
					
			</>
		);
	}
	
}
//<button onClick={this.setName()}>수정2</button><br/>						=> 		에러발생
//<button onClick={this.setName({name : "이순신"})}>수정4</button><br/> 		=>		무한루프

function App(){
	return(
		<>
			<h2>이벤트 핸들러 호출</h2>
			<Person name="홍길동"/>
		</>	
	
	);
}
export default App;
*/


/*
//state가 여러 데이터 관리할 때 변경
import React from "react";
class Person extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name : props.name,
			age : props.age,
			tel : props.tel,
			address : props.address,
		}
	}
	setName = (name) => {
		this.setState({name : name});
	}
	setAge = () => {
		this.setState({age : "바뀐 나이 : 20"});
	}
	setTel = (tel) => {
		this.setState({tel : tel});
	}
	render(){
		return(
			<>
				<h3>{this.state.name}</h3>
				<h3>{this.state.age}</h3>
				<h3>{this.state.tel}</h3>
				<h3>{this.state.address}</h3>
				
				<button onClick={() => this.setName("바뀐이름 : 이순신")}>이름 수정</button><br/>
				<button onClick={this.setAge}>나이 수정</button><br/>
				<button onClick={() => this.setTel("바뀐전화번호 : 9999-9999")}>전화번호 수정</button><br/>
				<button onClick={() => this.setState({address:"수원시"})}>주소 수정</button><br/>
			</>
		);
	}
}
function App(){
	return(
		<>
			<h2>state 여러 데이터 관리</h2>
			<Person name="홍길동" age="30" tel="1111-2222" address="서울시"/>
		</>	
	
	);
}
export default App;
*/


/*
// 컴포넌트 생명주기 : 생성(componentDidMount) & 인생(componentDidUpdate) & 사망(componentWillUnmount)
import React from "react";
class Header extends React.Component{
	constructor(props){
		super(props);
		console.log("constructor 실행");
		this.state = {
			color : props.color,
		}
	}
	componentDidMount(){
		console.log("componentDidMount 실행");
		setTimeout(
			() => {this.setState({color : "blue"})}
			, 3000
		);
	}
	componentDidUpdate(){
		console.log("componentDidUpdate 실행");
		const result = document.getElementById("result");
		result.innerHTML = "수정된 color : " + this.state.color;
	}
	componentWillUnmount(){
		console.log("componentWillUnmount 실행");
	}
	render(){
		return(
			<h3>color : {this.state.color}</h3>
		
		);
	}
}
function App(){
	return(
		<>
			<h2>컴포넌트 생명주기 - 생성</h2>
			<Header color={"red"}/><br/>
			<div id="result"/>
		</>	
	
	);
}
export default App;
*/


/*
// 생명주기 함수 中 사망
import React from "react";
class Child extends React.Component{
	componentDidUpdate(){
		console.log("Child의 componentDidUpdate 실행")
	}
	componentDidMount(){
		console.log("Child의 componentDidMount 실행")
	}
	componentWillUnmount(){
		console.log("Child의 componentWillUnmount 실행");
	}
	render(){
		return(
			<h3>Child</h3>
		);
	}
}

class Container extends React.Component{
	constructor(props){
		super(props);
		this.state = {show : true};
	}
	delChild = () => {
		this.setState({show : false});
	}
	render(){
		let dispChild;
		if(this.state.show){
			dispChild = <Child/>
		}
		return(
			<>
				<div>
					<h3>Container</h3>
					{dispChild}<br/> 
					<button onClick = {this.delChild}>삭제</button>
				</div>
			</>
		);
	}
}

function App(){
	return(
		<>
			<h2>컴포넌트 생명주기 - 생성</h2>
			<Container/>
		</>	
	
	);
}
export default App;
*/



/*컴포넌트 생명주기  (Notification.js & NotificationList)
import NotificationList from "./state/NotificationList";
import React from "react";
function App(){
	return(
		<>
			<h2>컴포넌트 생명주기</h2>
			<NotificationList/>
		</>	
	
	);
}
export default App;
*/


/*
// Hook : 함수형 컴포넌트에서 상태(state)나 생명주기 메서드 등을 사용할 수 있도록 함
// 1. useState
import {useState} from "react";
function Color(props){
	let[color, setColor] = useState("red");
	return( // 함수 컴포넌트는 render 줄 필요 없음
		<>
			<h3> 현재 색상은 {color} 입니다. </h3>
			<button onClick = { () => {setColor("blue")} }>파랑</button><br/>
			<button onClick = { () => {setColor("green")} }>초록</button><br/>
			<button onClick = { () => {color = "yellow"}}>노랑</button><br/>
		</>
		// yellow는 랜더링 안됨
	);
}

function App(){
	return(
		<>
			<h2>useState</h2>
			<Color/>
		</>	
	
	);
}
export default App;
*/



/*
import {useState} from "react";
function MyInput(){
	const [text, setText] = useState("hello") // 초기값 hello
	const change = (event) => { 		// 입력값이 바뀔때마다
		setText(event.target.value); 	// text가 바뀜
	};
	return(
		<>
			<br/>
			<input type="text" name="msg" onChange={change}/>
			<br/>
			<p> {text} </p>
			<button onClick={
				()=>{
					setText("hello");
					document.querySelector("input[name='msg']").value="";
					}
				}>초기화</button>
		</>
	);
}
function App(){
	return(
		<>
			<h2>useState</h2>
			<MyInput/>
			
		</>	
	
	);
}
export default App;

*/


/*
//useState 변수가 여러개인 경우
import {useState} from "react";

function Person(){
	const[person, setPerson] = useState(
		{
			name : "홍길동",
			age : 20,
			tel : "1111-2222",
		}
	);
	const update = () => {
		setPerson(
			{
				name : "이순신",
				age : "27",
				tel : "9999-9999",
			}
		);
	}
	const updateName = () => { //스프레드 연산자로 특정한 것만 변경할 때
		setPerson(	//함수를 넣을 수 있음, JSON객체 표시 안쪽중괄호, 여러개 임을 표현하는 바깥쪽중괄호(리턴을 못함)=>리턴을 줘야함
			(states) => {return{...states, name:"김유신"}} 
		);
	}
	return(
		<>
			<br/>
			이름 : {person.name}<br/>
			나이 : {person.age}<br/>
			전화번호 : {person.tel}<br/>
			<button onClick={update}>변경</button>
			<br/>
			<button onClick={updateName}>이름 변경</button>
		</>
	);
}

function App(){
	return(
		<>
			<h2>useState</h2>
			<Person/>
		</>	
	
	);
}
export default App;
*/



/*
import {useState} from "react";
function Person(props){
	const [name, setName] = useState("홍길동");
	const [age, setAge] = useState(20);
	const [tel, setTel] = useState("1111-2222");
	const[address, setAddress] = useState("서울시");
	const update = () => {
		setName(props.name);
		setAge(props.age);
		setTel(props.tel);
		setAddress(props.address);
	}
	return(
		<>
			이름 : {name} <br/>
			나이 : {age} <br/>
			전화번호 : {tel} <br/>
			주소 : {address} <br/>
			<br/>
			<button onClick={update}>수정</button>
			<br/><br/><br/>
			
		</>
	);
}

function App(){
	return(
		<>
			<h2>useState</h2>
			<Person name="김유신" age="50" tel="9999-9999" address="수원시"/>
			<Person name="호랑이" age="100" tel="3333-3333" address="백두산"/>
		</>	
	
	);
}
export default App;
*/

/*
//useState 사용 중첩 구조분해
import {useState} from "react";
function Person(){
	const[person, setPerson] = useState(
		{
			name : "홍길동",
			age : 20,
			tel : "1111-1111",
			friend : {
				name : "임꺽정",
				tel : "9999-8888",
				address : "서울시"
				
			}
		}
	);
	const update = () => { // 친구 전화번호 변경
		const newtel = prompt("친구의 전화번호 : ");
		setPerson(
			(person) => ( // JSON의 중괄호와 헷갈리지 않게 ()소괄호 사용
				{
					...person,
					friend : {
						...person.friend,
						tel : newtel, // 다른것은 그대로 두고 tel만 newtel로 변경
					}
				}
			)
		);
	};
	
	return(
		<>
			<br/>
			이름 : 		{person.name}<br/>
			나이 : 		{person.age}<br/>
			전화번호 : 	{person.tel}<br/><br/>
			친구 이름 : 	{person.friend.name}<br/>
			친구 전화번호 : {person.friend.tel}<br/>
			친구 주소 : 	{person.friend.address}<br/><br/>
			
			<button onClick={update}>수정</button>
		</>
	);
}

function App(){
	return(
		<>
			<h2>useState</h2>
			<Person/>
			
		</>	
	
	);
}
export default App;
*/

/*
//Hook
//2.useEffect - 의존성 배열 생략
import {useState, useEffect} from "react";
function Count(){
	const [count, setCount] = useState(0);  //상태가 바뀔때마다 재랜더링
	const addCount=() => { // count 1 증가
		setCount(count+1);
	}
	useEffect(
		() => {	//의존성 배열 생략시 => 랜더링할때마다 호출됨
			console.log(`${count} : useEffect 실행`);
		}	
	);
	return(
		<>
			<br/>
			<p>{count}번 클릭</p>
			<button onClick={addCount}>클릭</button>
		</>
	);
}
function App(){
	return(
		<>
			<h2>useEffect</h2>
			<Count/>
			
		</>	
	
	);
}
export default App;
*/


//Hook
//2.useEffect - 의존성 배열
import {useState, useEffect} from "react";

function Counter(){
	const [count, setCount] = useState(0);
	const [sum, setSum] = useState(0);
	
	//useEffect(    						// 무한루프
	//	() => {
	//		console.log(`${count}번 실행`);
	//		setSum((sum) => sum + count);
	//	}
	// );
	
	//useEffect(								// 버튼을 눌러도 실행되지 않음, 처음 랜더링만 실행됨
	//	() => {
	//		console.log(`${count}번 실행`);
	//		setSum((sum) => sum + count);
	//	}, [] // 빈 배열
	// );
	
	useEffect(		// 버튼을 누르면 합계도 변함
		() => {
			console.log(`${count}번 실행`);
			setSum((sum) => sum + count);
		}, [count] // 의존성 배열
	);
	
	return(
		<>
			<br/>
			<p>카운트 : {count}</p>
			<br/>
			<p>합계 : {sum}</p>
			<br/>
			<button onClick={() => {setCount((count)=>count+1)}}>증가</button>
		</>
	);
}

function App(){
	return(
		<>
			<h2>useEffect</h2>
			<Counter/>
			
		</>	
	
	);
}
export default App;
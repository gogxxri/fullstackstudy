/*
//Hook
//2.useEffect - Cleanup
import {useState, useEffect} from "react";

function MyEffect(){
	const [name, setName] = useState("홍길동");
	const updateName = () => {
		setName("이순신");
	}
	useEffect(
		() => {
			console.log("useEffect 실행");
			console.log(name);
			return() => {// Cleanup 함수(useEffect안에 return 구현) - willunmount역할을 함
				console.log("Cleanup함수 실행");
				
			}
		}
	);
	return(
		<div>
			{name}<br/>
			<button onClick={updateName}>변경</button>
		</div>
	);
}
function App(){
	return(
		<>
			<h2>useEffect(cleanup)</h2>
			<MyEffect/>
		</>	
	
	);
}
export default App;
*/

/*
// Hook
// 3.useMemo : 컴포넌트가 다시 랜더링 될 때마다 연산량이 높은 작업을 반복하는 것을 피할 수 있음
// 메모제이션을 사용하지 않는 경우

function App(){
	let cnt = 0;
	function fib(n){
		cnt++;
		if(n<2){
			return n;
		} else {
			return fib(n - 1) + fib(n - 2);
		}
	}
	fib(6);
	return(
		<>
			<h2>useMemo</h2>
			실행횟수 : {cnt}<br/>
		</>	
	
	);
}
export default App;
*/


/*
// Hook
// 3.useMemo 
// 메모제이션 사용 : 비용이 높은( 연산량이 많은 )함수의 호출 결과를 저장해 두었다가 같은 입력값으로 함수를 호출하면 이전에 저장했던 결과를 바로 반환
function App(){
	let cnt = 0;
	const memo = [0, 1]; //피보나치 수열이 0과 1로 시작한다고 가정
	function fib(n){
		cnt++;
		if(memo[n] || n <=1 ){
			return memo[n]; 	// 해당하는 방에 값이 있으면 그대로 리턴
		} else {
			const result = fib(n - 1) + fib(n - 2);
			memo[n] = result; // 해당하는 방에 값이 없으면 계산해서 리턴
			return result;
		}
	}
	fib(6);
	return(
		<>
			<h2>useMemo-메모제이션 사용</h2>
			실행횟수 : {cnt}<br/>
		</>	
	
	);
}
export default App;
*/


/*
// Hook
// 3.useMemo + 의존성배열
import { useState, useMemo } from "react";

function App(){
	const[a, setA] = useState(0);
	const[b, setB] = useState(0);
	function addA(){	// 계산에 참여	
		console.log("addA 실행");
		setA((a) => a+1);
	}
	function addB(){	//계산에 참여X (b가 바뀐다고 계산할 필요 없음)
		console.log("addB 실행");
		setB((b) => b+2);
	}
	// const result = a * b; 		// 랜더링 할때마다 계산
	const result = useMemo(			// useMemo는 랜더링 중에 실행  (useEffect는 랜더링 이후 실행)
		() => {
			console.log("useMemo 실행");
			return a * b;
		}, [a]				// a가 바뀔때만 연산 실행 (b바뀌어도 연산 실행x)
	);
	return(
		<>
			<h2>useMemo</h2>
			{a} * {b} = {result}<br/>
			<button onClick={addA}>A값 변경</button> &nbsp;&nbsp;&nbsp;
			<button onClick={addB}>B값 변경</button>
		</>
	);
}
export default App;
*/


/*
//Hook
//4. useCallback : 의존성 배열의 변수 중 하나라도 변경되면 Memoized(메모이제이션이 된) 콜백함수를 반환 , useMemo() 훅과 유사한 역할

import { useState, useEffect, useCallback } from "react";
function App(){
	const [number, setNumber] = useState(0); // 초기값 0
	
	// 랜더링 할 때마다 새로 할당됨 => 주소 변경
	//function addNumber(){						
	//	console.log("addNumber 실행");
	//	setNumber((number) => eval(number) + eval(1) );
	//}
	
	const addNumber = useCallback(
		() => {
			console.log("addNumber 실행");
			//setNumber((number) => eval(number) + eval(1) ); // 재랜더링 하는 코다가 있을 경우 바뀜
		}
	);
	
	useEffect(
		() => {
			console.log("addNumber 변경됨(재할당 받음)");
		}, [addNumber] 		//addNumber가 바뀌면 useEffect 실행 , addNumber의 주소가 바뀌면 실행
	);
	
	return(
		<>
			<h2>useCallback</h2>
			<input type="number" value={number} 
				onChange={(event) => setNumber(event.target.value)}/>
			<br/>
			<button onClick={addNumber}>수정</button>
		</>
	);

};
export default App;

*/


/*
// hook 
// 4. useCallback (자주 사용x)
import Reset from "./hook/Reset";
import { useState, useCallback } from "react";
function App(){
	const [count, setCount] = useState(0);
	//const resetCount = () => {
	//	console.log("resetCount 실행");
	//	setCount(0); // 리셋
	//};
	
	const resetCount = useCallback(
		() => {
			console.log("resetCount 실행");
			setCount(0); // 리셋
		}, []
	);
	return(
		<>
			<h2>useCallback</h2>
			<br/>
			Count : {count} <br/>
			<button onClick = {() => {setCount(count+1)}}>증가</button>
			<br/>
			<Reset clickHandler={resetCount}/>  
		</>				//memo를 걸어두어서 재랜더링 안됨
	);	
}
export default App;
*/

/*
// hook
// 5.useRef : 래퍼런스(특정 컴포넌트에 접근할 수 있는 객체)를 사용하기 위한 훅
//				ref는 변경이 되어도 렌더링이 일어나지 않음, 재렌더링이 발생하지 않음, 이전 상태 값을 추적가능
// - useRef사용 안하는 경우
import { useState, useEffect, useRef } from "react";
function App(){
	let count = 0;		// 랜더링 될때마다 초기화됨
	const[value, setValue] = useState("");
	useEffect(
		() => {
			count = count + 1;
		}
	);
	return(
		<>
			<h2>useRef</h2>
			<br/>
			<input type="text" onChange={(event) => {setValue(event.target.value)}}/>
			<br/>
			count : {count} <br/>
			value : {value} <br/>
		</>
	);	
}
export default App;
*/

/*
// hook
// 5.useRef  - useRef사용 하는 경우
import { useState, useEffect, useRef } from "react";
function App(){
	let count = useRef(0);	
	const[value, setValue] = useState("");
	useEffect(
		() => {
			count.current = count.current + 1;  //count useRef객체 안에 current 속성
		}
	);
	return(
		<>
			<h2>useRef</h2>
			<br/>													
			<input type="text" onChange={(event) => {setValue(event.currentTarget.value)}}/>
			<br/>
			count : {count.current} <br/>
			value : {value} <br/>
		</>
	);	
}
export default App;
*/

/*
// hook
// 5.useRef  - 돔에 쉽게 접근하기 위한 방법으로도 사용 하는 경우 (ref=참조)
import { useState, useEffect, useRef } from "react";
function App(){
	const inputElement = useRef();
	const focusInput = () => {
		inputElement.current.focus();
	}
	return(
		<>
			<h2>useRef</h2>
			<input type="text" name="name" ref={inputElement}/>
			<br/>
			<button onClick={focusInput}>포커스</button>
		</>
	);
}
export default App;
*/

/*
// 6. 커스텀 hook(1)
import { useState } from "react";
function App(){
	const [state, setState] = useState(false);
	const updateState = () => {
		setState(!state);  // true가 false로, false가 true로 바뀜
	}
	return(
		<>
			<h2>커스텀</h2>
			<br/>
			<button onClick={updateState}>{state ? "토글" : "클릭"}</button>
		</>
	);
}
export default App;
*/

/*
// 6. 커스텀 hook(2)
import { useState } from "react";

const useToggle = (init = false) => {
	const [state, setState] = useState(init); // 값이 넘어오면 넘어온 값, 안 넘어오면 초기값 사용
	const updateState = () => {
		setState(!state);  
	}
	return [state, updateState];
}


function App(){
	const [state, updateState] = useToggle(); //useToggle을 실행해 값 받아옴
	return(
		<>
			<h2>커스텀</h2>
			<br/>
			<button onClick={updateState}>{state ? "토글" : "클릭"}</button>
		</>
	);
}
export default App;
*/


/*
// 7. hook의 데이터의 공유
// 		(1) 네트워크가 온라인 상태인지 여부를 추적하는 state
// 		(2) online 및 offline 이벤트를 구독하고 state를 업데이트하는 Effect
// - 커스텀 훅 사용 안 한 경우
import { useState, useEffect } from "react";
function StatusBar(){
	const[isOnline, setIsOnline] = useState(true);
	useEffect(
		() => {
			function online(){
				setIsOnline("true");
			}
			function offline(){
				setIsOnline("false");
			}
			window.addEventListener("online", online);
			window.addEventListener("offline", offline); // offline 이벤트가 넘어오면 offline함수 호출
			return () => { // 정리
				window.removeEventListener("online", online);
				window.removeEventListener("offline", offline);
			}
		}, []
	);
	return(
		<h3>{isOnline ? "OnLine" : "OffLine"}</h3>
	);
}
function SaveButton(){
	const[isOnline, setIsOnline] = useState(true);
	useEffect(
		() => {
			function online(){
				setIsOnline("true");
			}
			function offline(){
				setIsOnline("false");
			}
			window.addEventListener("online", online);
			window.addEventListener("offline", offline); // offline 이벤트가 넘어오면 offline함수 호출
			return () => { // 정리
				window.removeEventListener("online", online);
				window.removeEventListener("offline", offline);
			}
		}, []
	);
	function saveClick(){
		console.log("saveClick 실행")
	}
	return(
		<button onClick={saveClick}>
			{isOnline ? "저장" : "연결중"}
		</button>
	);
}

function App(){
	return(
		<>
			<h2>커스텀 훅</h2>
			<br/>
			<StatusBar />
			<SaveButton/>
		</>
	);
}
export default App;

*/

/*
// 7. hook의 데이터의 공유
// - 커스텀 훅 사용 한 경우
import { useState, useEffect } from "react";

const useOnlineStatus = () => { // 상태확인
	const[isOnline, setIsOnline] = useState(true);
	useEffect(
		() => {
			function online(){
				setIsOnline("true");
			}
			function offline(){
				setIsOnline("false");
			}
			window.addEventListener("online", online);
			window.addEventListener("offline", offline); 
			return () => { 
				window.removeEventListener("online", online);
				window.removeEventListener("offline", offline);
			}
		}, []
	);
	return isOnline; // 상태 넘겨줌
}

function StatusBar(){
	const isOnline = useOnlineStatus();
	return(
		<h3>{isOnline ? "OnLine" : "OffLine"}</h3>
	);
}
function SaveButton(){
	const isOnline = useOnlineStatus();
	function saveClick(){
		console.log("saveClick 실행")
	}
	return(
		<button onClick={saveClick}>
			{isOnline ? "저장" : "연결중"}
		</button>
	);
}

function App(){
	return(
		<>
			<h2>커스텀 훅</h2>
			<br/>
			<StatusBar />
			<SaveButton/>
		</>
	);
}
export default App;
*/

/*
// 이벤트처리
// 1. 클래스 컴포넌트 이벤트처리(1-생성자에서 바인딩하여 this를 정의)
import React from "react";
class Toggle extends React.Component{
	constructor(props){
		super(props);
		this.state = {isToggle : true}; // 컴포넌트의 초기 상태를 설정
		this.clickHandler = this.clickHandler.bind(this); // 생성자에서 바인딩하여 this를 정의 // bind 이벤트 붙일 때 쓰는 함수, 클래스의 메서드를 컴포넌트 인스턴스에 바인딩
	}														// clickHandler 메서드에서 this.setState를 사용할 때 this가 올바른 컴포넌트 인스턴스를 참조하도록 함
	clickHandler(){
		this.setState( //메서드를 호출하여 컴포넌트의 상태를 업데이트
			(state) => ( // 괄호 안에 JSON쓸 때 ()괄호로 바꾸기
				{
					isToggle : !state.isToggle
				}
			)
		);
	}
	render(){ // 화면에 표시될 내용 , 클래스에서는 render안에 return
		return(
			<button onClick={this.clickHandler}>{this.state.isToggle ? "On" : "Off"}</button>
		);					// 이벤트 처리를 위한 this인지 클래스 컴포넌트의 this인지 모름
							// render()함수 안에 있는 this는 컴포넌트 클래스(현재객체)를 의미해야함
	}
}
function App(){
	return(
		<>
			<h2>클래스 컴포넌트 이벤트 핸들링</h2>
			<Toggle/>
		</>
	);
}
export default App;
*/

/*
// 이벤트처리
// 1. 클래스 컴포넌트 이벤트처리
// 	(2) 사용하는 곳에서 bind()하는 경우
import React from "react";
import {useState} from "react";
class LoginButton extends React.Component{
	constructor(props){
		super(props);
		this.state = {count : 0};
	}
	clickHandler(){
		//매개변수 안 받기때문에 기본생성자 사용 (생성자x)
		this.setState(
			() => (
				{
					count : this.state.count+1
				}
			)
		);
	}
	render(){
		return(									// 사용하는 곳에서 bind
			<>
				{this.state.count}<br/>
				<button onClick={this.clickHandler.bind(this)}>
					클릭
				</button>
			</>
		);
	}
}
function App(){
	return(
		<>
			<h2>클래스 컴포넌트 이벤트 핸들링</h2>
			<LoginButton/>
		</>
	);
}
export default App;
*/

/*
// 이벤트처리
// 1. 클래스 컴포넌트 이벤트처리
// 	(3) 화살표 함수로 직접 호출
import React from "react";
import {useState} from "react";
class LoginButton extends React.Component{
	constructor(props){
		super(props);
		this.state = {count : 0};
	}
	clickHandler(){
		//매개변수 안 받기때문에 기본생성자 사용 (생성자x)
		this.setState(
			() => (
				{
					count : this.state.count+1
				}
			)
		);
	}
	// function 함수  	this를 동적으로 결정 (실행할때 this를 결정함- 매번 바뀜)
	// Arrow 함수 		this를 정적으로 결정 (this 변경 안됨, 상위스코프 의미)
	render(){
		return(								// 화살표 함수로 직접호출
			<>
				{this.state.count}<br/>
				<button onClick={(event) => this.clockHandler(event)}>
					클릭
				</button>
			</>
		);
	}
}
function App(){
	return(
		<>
			<h2>클래스 컴포넌트 이벤트 핸들링</h2>
			<LoginButton/>
		</>
	);
}
export default App;
*/


/*
// 이벤트처리
// 1. 클래스 컴포넌트 이벤트처리
// 	(4) 화살표 함수로 선언하고 바인딩하는 방법 (제일 많이 쓰는 방법)
import React from "react";
import {useState} from "react";
class LoginButton extends React.Component{
	constructor(props){
		super(props);
		this.state = {count : 0};
	}
	// 화살표 함수로 바인딩
	clickHandler = () => {
		//매개변수 안 받기때문에 기본생성자 사용 (생성자x)
		this.setState(
			() => (
				{
					count : this.state.count+1
				}
			)
		);
	}
	render(){
		return(				
			<>
				{this.state.count}<br/>
				<button onClick={this.clickHandler}>
					클릭
				</button>
			</>
		);
	}
}
function App(){
	return(
		<>
			<h2>클래스 컴포넌트 이벤트 핸들링</h2>
			<LoginButton/>
		</>
	);
}
export default App;
*/


/*
// 이벤트처리
// 2. 매개변수 전달하기 (1) bind()함수 사용하는 방법
import React from "react";
import {useState} from "react";
class LoginButton extends React.Component{
	constructor(props){
		super(props);
		this.state = {count : 0};
	}
	
	clickHandler(a) {	// 매개변수 전달
		this.setState(
			() => ( // state받는 자리
				{
					count : this.state.count+a
				}
			)
		);
		console.log(a);
	}
	render(){
		return(				
			<>
				{this.state.count}<br/>
				<button onClick={this.clickHandler.bind(this,20)}>
					클릭
				</button>
			</>
		);
	}
}
function App(){
	return(
		<>
			<h2>클래스 컴포넌트 이벤트 핸들링</h2>
			<LoginButton/>
		</>
	);
}
export default App;
*/


/*
// 이벤트처리
// 2. 매개변수 전달하기 (2)화살표 함수 이용
import React from "react";
import {useState} from "react";
class LoginButton extends React.Component{
	constructor(props){
		super(props);
		this.state = {count : 0};
	}
	
	clickHandler(a) {	// 매개변수 전달
		this.setState(
			() => ( // state받는 자리
				{
					count : this.state.count+a
				}
			)
		);
		console.log(a);
	}
	render(){
		return(								// 이벤트 넘겨줌
			<>								
				{this.state.count}<br/>
				<button onClick={(event) => {this.clickHandler(30, event)}}>
					클릭
				</button>
			</>
		);
	}
}
function App(){
	return(
		<>
			<h2>클래스 컴포넌트 이벤트 핸들링</h2>
			<LoginButton/>
		</>
	);
}
export default App;
*/


/*
// 컴포넌트간 이벤트 통신
import React from "react";
class Btn extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(					// 넘겨받는 props의 clickHandler받음, this를 구분하기 위해 bind 처래해주어야함
			<button onClick={this.props.clickHandler}>클릭</button>
		);
	}
}
class Counter extends React.Component{
	constructor(props){
		super(props)
		this.state = {count : 0};
	}
	increase(){
		this.setState({count : this.state.count+1}); // json을 통채로 던짐
	}
	render(){
		return(
			<>
				<h3>{this.state.count}</h3>
				<Btn clickHandler={this.increase.bind(this)}/>
			</>						// this.increase + bind 로 넘김 
		);
	}
}
function App(){
	return(
		<>
			<h2>클래스 컴포넌트간 이벤트 통신</h2>
			<Counter/>
		</>
	);
}
export default App;
*/ 


/*
// 제어 컴포넌트와 비제어 컴포넌트
// 1. 제어 컴포넌트 : 입력값이 생길 때마다 상태를 새롭게 갱신하여 항상 최신값으로 유지 (재랜더링)
import{useState} from "react";
function App(){
	const [name, setName] = useState("");
	const nameHandler = (event) => { // 이름에 대한 이벤트처리
		setName(event.target.value);
	}
	const submitHandler = (event) => { // 전송 이벤트처리
		event.preventDefault(); //  폼 제출의 기본 동작을 막음
		console.log(name);
	}
	return(
		<>
			<h2>제어컴포넌트</h2>
			<br/>
			이름 : <span> {name} </span>
			<br/>
			<form onSubmit={submitHandler}>
				<input type="text" name="name" onChange={nameHandler}/>
				<br/>
				<button>전송</button>
			</form>
		</>
	);
}
export default App;
*/ 



// 제어 컴포넌트와 비제어 컴포넌트
// 2. 비제어 컴포넌트 : form의 button을 클릭하기 전까진 값을 알 수 없음 button을 클릭해야 값을 가져올 수 있음
import{useRef} from "react";
function App(){
	const ta = useRef();
	const input = useRef();
	const submitHandler = (event) => { // 전송 이벤트처리
		event.preventDefault(); //  폼 제출의 기본 동작을 막음
		ta.current.value = input.current.value;
	}
	return(			// useRef가 받을 수 있도록 ref Tjwna
		<>
			<h2>제어컴포넌트</h2>
			<br/>
			이름 : <textarea ref={ta} rows="5" cols="10"></textarea>
			<br/>
			<form onSubmit={submitHandler}>
				<input type="text" name="name" ref={input}/>
				<br/>
				<button>전송</button>
			</form>
		</>
	);
}
export default App;


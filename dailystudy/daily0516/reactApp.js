/*
// <React Style>
// 1. 인라인 스타일링(수정이 번거롭고 재활용 잘 안돼서 워 잘 안씀)
function Header(){
	return(			// 바깥괄호 : 자바스크립트 영역, 안쪽 괄호 : json영역 => css에서는 ;을 쓰지만 json영역이기 때문에 ,쓰기
		<>		
			<h3 style={{color:"red", background:"gray"}}>hello style</h3>
		</>
	);
}
function App(){
	return(
		<>
			<h2>인라인 스타일링</h2>
			<Header/>
		</>
	);
}
export default App;

*/

/*
// <React Style>
// 2. 자바스크립트 객체(json)로 스타일 지정
function Header() {
	const myStyle = {
		color : "white",
		backgroundColor : "blue",
		padding : "10px",
		fontFamily : "Sans-Serif"
	}
	return(
		<>
			<h3 style={myStyle}>hello Style</h3>
		</>
	);	
}

function App(){
	return(
		<>
			<h2>자바스크립트 객체로 스타일 지정</h2>
			<Header/>
		</>
	);
}
export default App;
*/


/*
// <React Style> 
// 3. (1)css 모듈X => 충돌 생김
import "./css/First.css";
import "./css/Second.css";
function Box({size}){
	if(size === "big") {
		return <div className="big box">큰 박스</div>
	} else {
		return <div className="small box">작은 박스</div>
	}
	
}
function Button({size}){
	if(size === "big"){
		return <button className="big button">큰 버튼</button>
	} else {
		return <button className="small button">작은 버튼</button>
	}
}
function App(){
	return(
		<>
			<h2>css 모듈로 스타일 지정X => 충돌생김</h2>
			<Box size="big"/><br/>
			<Box size="small"/><br/>
			<Button size="big"/><br/>
			<Button size="small"/>
		</>
	);
}
export default App;
*/


/*
// <React Style> 
// 3. (2)css 모듈 (파일을 따로 만들어야하기 때문에 잘 안씀)
import style from "./css/First.module.css";
import style from "./css/Second.module.css";  // style 변수가 충돌나기 때문에 파일을 따로 만들어줘야함,,

function Box({size}){
	if(size === "big") {
		return <div className={`${sytle.big} ${style.box}`}>큰 박스</div>
	} else {
		return <div className={`${sytle.small} ${style.box}`}>작은 박스</div>
	}
	
}
function Button({size}){
	if(size === "big"){
		return <button className={`${sytle.big} ${style.button}`}>큰 버튼</button>
	} else {
		return <button className={`${sytle.small} ${style.button}`}>작은 버튼</button>
	}
}

import Box from "./css/Box";
import Button from "./css/Button"; 

function App(){
	return(
		<>
			<h2>css 모듈로 스타일 지정</h2>
			<Box size="big"/><br/>
			<Box size="small"/><br/>
			<Button size="big"/><br/>
			<Button size="small"/>
		</>
	);
}
export default App;



/*
// <React Style> 
// 4. styled-components : 기존 돔을 만드는 방식인 css, scss 파일을 밖에 두고, 태그나 id, class이름으로 가져와 쓰지 않고, 
//						동일한 컴포넌트에서 컴포넌트 이름을 쓰듯 스타일을 지정
import styled from "styled-components";

const Wrapper = styled.button`padding : 5px; background:gray;`;
const Title = styled.button`
			font-size : 1.5em;
			color : black;
			text-align : center`;
function App(){
	return(
		<>
			<h2>styled-components</h2>
			<Wrapper>
				<Title>안녕하세요</Title>
			</Wrapper>
		</>
	);
}
export default App;
*/

/*
// <React Style> 
// 5. props 사용
import styled from "styled-components";
const Button = styled.button`
			color : ${props => props.dark ? "white" : "black"};
			background-color : ${props => props.dark ? "black" : "white"};
			border : 1px solid black;
			`;		
					
function App(){
	return(
		<>
			<h2>styled-components</h2>
			<Button>Normal</Button><br/>
			<Button dark>Dark</Button>
		</>
	);
}
export default App;
*/

/*
// <React Style> 
// 6.스타일 상속
import styled from "styled-components";
const Wrapper = styled.div`
	background-color : ${
		({active}) => {
				if(active){
					return active; 
				} else {
					return "gray";
				}
			}
		};
	color : black;
	`;
const Button = styled.button`
	width : 100px;
	padding : 30px;
	`;
					// button을 상속받음
					// || : 앞의 값이 없으면 뒤에것 출력
const NewButton = styled(Button)` 
	color : ${props => props.color || "red"};
	`;				
function App(){
	return(		//active json으로 던지기
		<>
			<h2>styled-components</h2>
			<Wrapper active={"pink"}>
			 	<Button>버어튼</Button><br/>
			 	<NewButton color="blue">뉴우버어튼</NewButton><br/>
			</Wrapper>
		</>
	);
}
export default App;
*/

/*
// <React Style> 
// 7. css사용 & attrs() 사용
import styled, {css} from "styled-components";
// 컴포넌트 생성, 자식들에 대한 속성
const FlexCenter = css `			
	display : flex;
	background-color:pink;
	justify-content : center;
	align-items : center;
	`;
	
const FlexBox = styled.div`
	${FlexCenter}
`;

const Input = styled.input.attrs( // 역따옴표 주의
		{
			type : "password",
		}
	)`
	color : red;
	`;

function App(){
	return(	
		<>
			<h2>styled-components</h2>
			<FlexBox>영역</FlexBox><br/>
			입력 : <Input/>
		</>
	);
}
export default App;
*/


/*
//default로 임포트 안 했을 때 {}사용
import {Login} from "./css/Login";
import styled, {createGlobalStyle} from "styled-components";

const Button = styled.button`
	color : red;
	margin : 10px;
`;
const Body = createGlobalStyle`
	body {
		background-color : pink;
	}
`;
function App(){
	return(
		<>
			<Body/>
			<h2>styled-components</h2>
			<Login>
				<Button> 로그인 </Button>
			</Login>
		</>
	);
}
export default App;
*/

/*
//themeProvider
import styled, {themeProvider} from "styled-components";
import theme from "./css/Theme";
const Button = styled.button`
	border-radius : 30px;
	padding : 5px 15px;
	background-color : ${props => props.theme.successColor}
	`;
function App(){
	return(
		<>
			<h2>styled-components</h2>
			<themeProvider theme={theme}>
				<Button>정상</Button>
			</themeProvider>
		</>
	);
}
export default App;
*/


/*
import styled  from "styled-components";
const variable = {
	set : (color="red", bgcolor="gray", align="left") => `
		color : ${color};
		background-color : ${bgcolor};
		text-align : ${align};		
		width : 100px;
		height : 50px;
		margin : 10px;
	`,
}
const Box1 = styled.div`
	${variable.set()}
	`;
const Box2 = styled.div`
	${variable.set("blue")}
	`;
const Box3 = styled.div`
	${variable.set("green", undefined, "center")}
	`;
function App(){
	return(
		<>
			<h2>styled-components</h2>
			<Box1>Box1</Box1>
			<Box2>Box2</Box2>
			<Box3>Box3</Box3>
		</>
	);
}
export default App;
*/

/* 
// < State 끌어올리기>
//(1) 상태 State 끌어올리기 - 적용x
import { useState } from "react";
function Counter(){
	const [count , setCount] = useState(0);
	return(
		<>
			{count}&nbsp;&nbsp;&nbsp;
			<button onClick={()=>{setCount((count)=>count+1)}}>
				클릭
			</button>
		</>
	);
}
function App(){
	
	return(
		<>
			<h2>State 끌어올리기-적용x</h2>
			<Counter/>
			<br/>
			<Counter/>
		</>
	);
}
export default App;
*/

/*
//< State 끌어올리기>
//(2)상태 State 끌어올리기 
import { useState } from "react";
function Counter({total, handleClick}){
	const [count , setCount] = useState(0);
	return(
		<>
			{count}&nbsp;&nbsp;&nbsp;
			합계:{total}&nbsp;&nbsp;&nbsp;
			<button onClick={
				()=>{
					setCount((count)=>count+1);
					handleClick();
					}
				}>
				클릭
			</button>
		</>
	);
}
function App(){
	const [total, setTotal] = useState(0);
	const handleClick = () => {
		setTotal((total) => total+1);
	}
	return(
		<>
			<h2>State 끌어올리기</h2>
			<Counter total={total} handleClick={handleClick}/>
			<br/>
			<Counter total={total} handleClick={handleClick}/>
		</>
	);
}
export default App;
*/

/*
// <합성> : 여러 개의 컴포넌트를 합쳐서 새로운 컴포넌트를 만드는 것
// 1. Containment : 하위 컴포넌트를 포함하는 형태의 합성
			//props에 자식의 목록이 넘어감(hello, hi)
function Border(props){
	return (
		<>
			{props.children}
		</>
	);
}
function App(){

	return(
		<>
			<h2>합성-container</h2>
			<Border>
				<h3>hello</h3>
				<p>hi</p>
			</Border>
		</>
	);
}
export default App;
*/

/*
// <합성>
// 1. Containment (2)(태그를 통채로 넘기기)
function Split(props){
	return(
		<>
			<div>{props.left}</div>
			<div>{props.right}</div>
		</>
	);
}
function App(){
	return(
		<>
			<h2>합성-container(태그를 통채로 넘기기)</h2>
			<Split left={<contacts>contacts</contacts>} right={<chat>chat</chat>}/>
		</>
	);
}
export default App;
*/

/*
//<합성>
// 2. Specilaization : 범용적으로 쓸 수 있는 컴포넌트를 만들어 놓고 이를 특수화시켜서 컴포넌트를 사용하는 합성 방식
function Dialog(props){ // 범용적인 컴포넌트
	return(
		<>
			<h3>{props.title}</h3>
			<p>{props.message}</p>
		</>
	);
}
function WelcomeDialog(props){
	return(
		<Dialog title={props.title} message={props.message}/>
	);
}
function App(){
	return(
		<>
			<h2>합성-Specilaization</h2>
			<WelcomeDialog title="인사" message="안녕하세요"/>
			<br/>
			<WelcomeDialog title="질문" message="~?"/>
		</>
	);
}
export default App;
*/

/*
// <합성>
// Containment + Specilaization
import{useState} from "react";
function Dialog(props){
	return(
		<>
			<h3>{props.title}</h3>
			<p>{props.message}</p>
			{props.children}
		</>
	);
}
function SignUpDialog(){
	const [id, setId] = useState("");
	const changeHandle = (event) => {
		setId(() => event.target.value);
	}
	const clickHandle = () => {
		alert(`${id}님 가입을 축하합니다.`);
		
	}
	return(
		<>
			<Dialog title="가입" message="아이디를 입력하세요">
				<input type="text" onChange={changeHandle}/>
				<button onClick={clickHandle}>가입</button>
			</Dialog>
			<br/>
			{id}
		</>
	);
}
function App(){
	return(
		<>
			<h2>합성-Containment + Specilaization</h2>
			<SignUpDialog/>
		</>
	);
}
export default App;
*/

/*
// <상속>
function Card(props){
	const {title, background, children} = props; // 구조분해할당
	return(
		<div
			style = {
				{
					margin : 8,
					padding : 8,
					borderRadius : 8,
					boxShadow : "0px 0px 4px gray",
					backgroundColor : background || "white",	
				}
			}>
		{title && <h3>{title}</h3>}
		{children}
		</div>
		
	);
}
function ProfileCard(){
	return(
		<Card title="명함" background="pink">
			<p>children에 들어감1</p>
			<p>children에 들어감2</p>
		</Card>
	);
}
function App(){
	return(
		<>
			<h2>상속</h2>
			<ProfileCard/>
		</>
	);
}
export default App;
*/



/*
//<Context>
// 1. props 사용 : 기존에는 데이터가 props를 통해서 부모에서 자식으로 단방향으로 전달
function Div(props) { // 가장 자식인 컴포넌트
	return(
		<>
			<p>테마 : {props.theme}</p>
			<p>색상 : {props.color}</p>
		</>
	);
}
function Title(props){
	return(
		<>
			<h3>{props.theme}모드</h3>
			<Div theme={props.theme} color={props.color}/>
		</>
	);
}
function Button(props){
	return(
		<>
			<button>{props.theme}</button> &nbsp;
			<button>{props.color}</button>
		</>
	);
}
function Toolbar(props){ // 최상위 부모
	return(
		<>
			<Title theme={props.theme} color={props.color}/>
			<Button theme={props.theme} color={props.color}/>
		</>
	);
}
function App(){
	return(
		<>
			<h2>Context - 1. props 사용</h2>
			<Toolbar theme="black" color="white"/>
		</>
	);
}
export default App;
*/

/*
//<Context>
// 2. createContext 사용 
// Provider / Consumer
import React from "react";
const ThemeContext = React.createContext({theme:"pink", color:"aqua"}); // 초기값을 여러개 줘야할 때 json으로

function Div() { // 가장 자식인 컴포넌트
	return(
		<>
			<ThemeContext.Consumer>
				{
					value => {
						return(
							<>
								<p>테마 : {value.theme}</p>
								<p>색상 : {value.color}</p>
							</>
						);
					}
				}
			</ThemeContext.Consumer>
		</>
	);
}
function Title(){
	return(
		<>
			<ThemeContext.Consumer>
				{
					value => {
						return(
							<>
								<h3>{value.theme}모드</h3>
								<Div />
							</>
						);
					}	
				}
			</ThemeContext.Consumer>
		</>
	);
}
function Button(){
	return(
		<>
			<ThemeContext.Consumer>
				{
					value => {
						return(
							<>
								<button>{value.theme}</button> &nbsp;
								<button>{value.color}</button>
							</>
						);
					}
				}
			</ThemeContext.Consumer>
		</>
	);
}
function Toolbar(props){ // 최상위 부모, theme와 color 데이터를 안쓰기 때문에 수정할 필요x
	return(
		<>
			<Title theme={props.theme} color={props.color}/>
			<Button theme={props.theme} color={props.color}/>
		</>
	);
}
function App(){ 
	return(
		<>
			<h2>Context - 2. context 사용</h2>
			<ThemeContext.Provider value={{ theme:"black", color:"white"}}>
				<Toolbar/>
			</ThemeContext.Provider>
		</>
	);
}
export default App;
*/

//<Context>
// 3. useContext 사용
import React from "react";
import {useContext} from "react";

const ThemeContext = React.createContext({theme:"pink", color:"aqua"}); // 초기값을 여러개 줘야할 때 json으로

function Div() { // 가장 자식인 컴포넌트
	const value = useContext(ThemeContext);
	return(
		<>
			<p>테마 : {value.theme}</p>
			<p>색상 : {value.color}</p>
		</>
	);
}
function Title(){
	const value = useContext(ThemeContext);
	return(
		<>
			<h3>{value.theme}모드</h3>
			<Div />
		</>
	);
}
function Button(){
	const value = useContext(ThemeContext);
	return(
		<>
			<button>{value.theme}</button> &nbsp;
			<button>{value.color}</button>
		</>
	);
}
function Toolbar(){ // 최상위 부모
	return(
		<>
			<Title/>
			<Button/>
		</>
	);
}
function App(){ 
	return(
		<>
			<h2>Context - 3. useContext 사용</h2>
			<ThemeContext.Provider value={{ theme:"black", color:"white"}}>
				<Toolbar/>
			</ThemeContext.Provider>
		</>
	);
}
export default App;

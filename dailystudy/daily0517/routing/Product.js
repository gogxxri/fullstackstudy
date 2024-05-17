// Product.js

import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

function Product(props){
	const {productid} = useParams(); 	// 현재 URL의 파라미터를 객체 형태로 가져올 수 있음
	const location = useLocation();		// 현재 URL에 대한 위치 객체를 반환
	const navigate = useNavigate(); 	// 네비게이션(페이지 이동)을 수행할 수 있는 navigate 함수를 반환
	const data = [
		{
			productid : 1,
			title : "텔레비젼",
			content : "tv 소개 내용"
		},
		{
			productid : 2,
			title : "냉장고",
			content : "냉장고 소개 내용"
		},
		{
			productid : 3,
			title : "노트북",
			content : "노트북 소개 내용"
		}
	];
	return(
		<div>
			{productid}번 상품 소개 페이지 <br/>
			<h4>제품명 : {data[productid-1].title}</h4>
			{data[productid-1].content}<br/>
			<br/>
			<br/>
			
			<h4>useLocation</h4>
			hash : {location.hash}<br/>
			pathname : {location.pathname}<br/>
			search : {location.search}<br/>
			state : {location.state}<br/>
			key : {location.key}<br/>
			<br/>				
			
			<button onClick={() => {navigate(-2)}}> 2페이지 전 </button> &nbsp;&nbsp;
			<button onClick={() => {navigate(-1)}}> 이전 페이지 </button> &nbsp;&nbsp;
			<button onClick={() => {navigate(1)}}> 다음 페이지</button> &nbsp;&nbsp;
			<button onClick={() => {navigate(2)}}> 다다음 페이지 </button> &nbsp;&nbsp;
			<button onClick={
					() => {navigate("/", {state : {message : "값을 전달 받음"}})}
				}> 메인 페이지 </button> &nbsp;&nbsp;
			
			<br/>
			<Link to="/"><li>처음으로</li></Link>
		</div>	
	);
}

export default Product;
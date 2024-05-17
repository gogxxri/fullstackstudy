// Main.js

import { Link, useLocation } from "react-router-dom";
;
function Main(props){
	const location = useLocation();
	const message = location.state?.message; // 메세지가 있을 때만 메세지를 받아놓음
	return (
		<>
			<h3> 메인 </h3>
			<Link to="/product/1?id=1"><li>1번 상품페이지(get방식)</li></Link>
			<Link to="/product/2"><li>2번 상품페이지</li></Link>
			<br/>
			{message ? message : "No message"}<br/>
		</>
	);
}

export default Main;
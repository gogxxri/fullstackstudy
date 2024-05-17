// Header.js
import { Link } from "react-router-dom";

function Header(props){
	return(
		<>
			<Link to="/">
				<h1> 헤더 </h1>
			</Link>
		</>
	);
}
export default Header;
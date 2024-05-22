<%@page import="org.comstudy21.myweb.model.PhoneDAO"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.comstudy21.myweb.model.PhoneDTO"%>
<%@page import="org.comstudy21.myweb.dbcp.JdbcUtil"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
		<title>JdbcUtilTest</title>
		</head>
	<body>
	
	<!-- forward -->
	
	<%
	PhoneDAO dao = new PhoneDAO();
	// List 타입을 ArrayList타입으로 다운 캐스팅 해야함
	//Contraller에서 list를 바인딩 해줌 (Contraller에서 dao를 만들어서 바인딩)
	// forward일 경우 request에 바인딩 가능
	
	// JSP내장 객체 - 내장객체들은 setAttribute(), getAttribute()가 공통으로 사용 가능함
	// 1. request : 같은 url일때 데이터가 보존 - forward일 경우 사용
	// 2. session : 같은 브라우저 일때, url(주소)가 변경되어도 같은 브라우저에서 데이터 보존
	// 3. application : 같은 context(프로젝트)에서 브라우저가 달라도 데이터 공유 가능

	ArrayList<PhoneDTO> list = (ArrayList<PhoneDTO>)request.getAttribute("list");
	%>
	<h1>전화번호부 목록</h1>
	
	<table width="600" border="1">
		<tr>
		<th>SEQ</th><th>NAME</th><th>PHONE</th>
		</tr>
		<%
		for(int i=0; i<list.size(); i++) {
			PhoneDTO phone = list.get(i);
		%>
			<tr>
				<td><%= phone.getSeq() %></td>
				<td><a href="detail.do?seq=<%=phone.getSeq()%>"><%= phone.getName() %></a></td>
				<td><%= phone.getPhone() %></td>
			</tr>
		<%	
		}
		%>
	</table>
	</body>
</html>
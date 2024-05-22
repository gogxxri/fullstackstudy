<%@page import="org.comstudy21.myweb.model.PhoneDTO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>Insert title here</title>
	</head>
	
	<!-- 컨트롤러에서 urlpattern이 "/phone/detail.do"면 이 페이지가 forward 되도록 -->
	<%
	PhoneDTO phone = (PhoneDTO)request.getAttribute("phone");
	%>
	<body>
		<h1>연락 정보 상세보기</h1>
		<table width="600" border="1">
			<tr>
				<th>SEQ</th><td><%=phone.getSeq() %> </td>
			</tr>
			<tr>
				<th>NAME</th><td><%=phone.getName() %> </td>
			</tr>
			<tr>
				<th>PHONE</th><td><%=phone.getPhone() %> </td>
			</tr>
		</table>
		<a href="list.do">목록</a>
		<a href="modify.do?seq=<%=phone.getSeq() %>">수정</a>
		<a href="delete.do?seq=<%=phone.getSeq() %>">삭제</a>
	</body>
</html>
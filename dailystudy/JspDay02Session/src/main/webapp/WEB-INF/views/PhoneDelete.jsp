<%@page import="org.comstudy21.myweb.model.PhoneDTO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Insert title here</title>
	</head>
	<body>
	<%
	PhoneDTO phone = (PhoneDTO)request.getAttribute("phone");
	%>
	<h1>연락처를 삭제 하시겠습니까?</h1>
	<p><%=phone.getName() %>님의 정보를 정말로 삭제 하겠습니까?</p>
	<form action="delete.do" method="POST">
		<input type="hidden" value="<%=phone.getSeq() %>" name="seq" />
		<input type="submit" value="삭제" />
	</form>
	</body>
</html>
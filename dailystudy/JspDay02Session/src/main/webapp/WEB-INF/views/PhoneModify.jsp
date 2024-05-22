<%@page import="org.comstudy21.myweb.model.PhoneDTO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>PhoneModify</title>
	</head>
	<body>
		<%
		PhoneDTO phone = (PhoneDTO)request.getAttribute("phone");
		%>
		<h1>연락처 정보 수정</h1>
		<form action="modify.do" method="POST"> <!-- doPost()에서 처리 -->
		<input type="hidden" value="<%=phone.getSeq() %>" name="seq" />
		성명: <input type="text" name="name" value="<%=phone.getName() %>" /><br />
		전화번호: <input type="text" name="phone" value="<%=phone.getPhone() %>" /><br />
		<input type="submit" value="저장" />
		</form>
	</body>
</html>
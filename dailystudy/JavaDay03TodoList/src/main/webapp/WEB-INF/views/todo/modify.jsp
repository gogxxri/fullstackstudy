<%@page import="org.comstudy.todo.model.TodoDTO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>modify</title>
	</head>
	<body>
	
		<h1>할 일 수정</h1>
		<%
		TodoDTO todo = (TodoDTO)request.getAttribute("todo");
		%>
		<form action="edit.do" method = "post">
			<input type="hidden" name="seq" value="<%=todo.getSeq()%>"><br/>
			제목 : <input type="text" name="title" value="<%=todo.getTitle() %>"/><br/>
			확인 상태 : 
			<select name="done">
				<option <%=todo.isDone()?"selected":"" %>>true</option>
				<option <%=!todo.isDone()?"selected":"" %>>false</option>
			</select>
			<input type="submit" value="저장"/>
		</form>
	</body>
</html>
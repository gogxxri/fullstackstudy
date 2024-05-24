<%@page import="org.comstudy.todo.model.TodoDTO"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>todolist</title>
		<script>
			function okBtn(element) {
				location.href="ok.do?seq=" + element.dataset.seq; //현재 창의 URL을 변경하여 새로운 페이지로 이동
			}
			function editBtn(element) {	
				location.href="edit.do?seq=" + element.dataset.seq;
			}
			
			function delBtn(element) {
				location.href="del.do?seq=" + element.dataset.seq;
			}
		</script>
	</head>
	<body>
		<h1>할 일 목록</h1>
		<table width="600" border="1" >
			<tr>
				<th>순서</th><th width="400">할일</th><th>확인</th><th>수정</th><th>삭제</th>
			</tr>
			<%
			// todoList에 저장
			ArrayList<TodoDTO> todoList = (ArrayList<TodoDTO>)request.getAttribute("todoList");
			
			for(int i=0; i<todoList.size(); i++) {
				TodoDTO todo = todoList.get(i);
			%>
			<tr>
				<td><%=todo.getSeq()%></td>
				<td><span style="text-decoration:<%= todo.isDone()? "line-through" : "none"%>"><%=todo.getTitle() %></span></td>
				<td><button data-seq="<%=todo.getSeq() %>" onclick="okBtn(this)"><%=!todo.isDone() ? "확인" : "취소" %></button></td>
				<td><button data-seq="<%=todo.getSeq() %>" onclick="editBtn(this)">수정</button></td>
				<td><button data-seq="<%=todo.getSeq() %>" onclick="delBtn(this)">삭제</button></td>
			</tr>
			<% 	
			}
			%>
		</table>
		<form method="post" action="save.do">
			<br/>
			할 일 추가 : <input type="text" name="title" value="새 할 일 추가"/>
			<input type="submit" value="저장"/>
		</form>
	</body>
</html>
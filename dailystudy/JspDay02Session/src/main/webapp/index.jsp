<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Index</title>
	</head>
	<body>
		<h1>인공지능 교육센터</h1>
		<!--
		링크를 서블릿 매핑으로 걸어줌 
		방법1. 서블릿에서 어노테이션으로 처리
		방법2. web.xml에서 처리
		-->
		<ul>
			<li><a href="phone/input.do">전화번호 입력</a></li>
			<li><a href="phone/list.do">전화번호 목록</a></li>
		</ul>
		
	</body>
</html>
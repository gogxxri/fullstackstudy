<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>PhoneInput</title>
	</head>
	<body>
		<h1>전화번호 입력</h1>
		<!--method를 post로 요청하면 서블릿의 doPost()함수 자동 실행  -->
		<form action="input.do" method="POST">
			성명 : <input type="text" name="name" value="Hong"/><br/><br/>
			전화번호 : <input type="text" name="phone" value="010-1111-2222"/><br/><br/>
			<input type="submit" value="저장"><br/>
		</form>
	</body>
</html>

<!-- WEB-INF 폴더에 있는 파일은 외부 브라우저에서 접근 불가능
즉, 내부의 Servlet또는 JSP페이지에서 Forward가능 (외부에서 forward는 불가함) 
대신 WEB-INF 폴더의 파일은 외부 브라우저에서 바로 접근 가능함(ex.index.html-->
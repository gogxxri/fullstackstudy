const http = require('http'); // http 모듈 불러오기

// request : 요청정보가 담겨있음(파라미터, 헤더 등)
// response : 응답 객체 (화면에 결과를 출력)
const server = http.createServer((request, response) => { // 새로운 HTTP 서버를 생성, 서버가 요청을 받을 때마다 실행될 콜백 함수를 인자로 받음
    // 응답 본문 설정
    response.end("<h1>HELLO</h1>")
}); 

// 서버가 3000번 포트에서 요청을 기다리도록 설정
server.listen(3000, () => {
    console.log(">>>서버가 3000번 포트로 실행중입니다.")
});
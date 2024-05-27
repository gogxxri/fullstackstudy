// nodejs express 프레임워크
// express 모듈 설치
// npm install -- save express 또는 줄여서 npm i -S express
// 설치된 모듈 확인 : npm list -S
// -S : 프로젝트 내부에 설치
// -D : 개발환경에서 사용
// -g : 글로벌 환경에서 설치 (모든 프로젝트에서 사용)



const http = require('http');  // http 모듈을 가져옴. 기본적인 HTTP 서버를 생성할 수 있게 해줌
const express = require('express'); //express 모듈을 가져옴.Node.js에서 간편하게 서버를 구축할 수 있도록 도와주는 프레임워크
// express 모듈 app 객체 생성
const app = express(); //express 함수 호출을 통해 app 객체를 생성,  Express 애플리케이션을 나타내며, 라우트 및 미들웨어 설정에 사용

app.use(express.static('/public')); // public 폴더를 static으로 설정하기 (index.html을 기본화면으로 볼 수 있음)
app.use(express.static('public')); //use : static 미들웨어 지정

// 외부에서 접속 가능하도록 path 설정
// '/' 대신 'public/index.html'이 실행 

// view engin 템플릿으로 forward 되도록 함
// views 폴더의 ejs와 같은 템플릿 파일을 만듦
// ejs 뷰엔진 모듈 설치 : npm i -S ejs
// 뷰엔진 폴더를 지정함
app.set('views', 'views');  // 뷰 폴더 지정
app.set('view engine', 'ejs'); // 확장자 지정

app.get('/home', (req, res) => {     // ejs 뷰엔진의 내용을 화면에 출력
    // ejs 뷰엔진의 내용을 화면에 출력
    // node.js에서 콜백함수는 첫번째 인자가 err
    req.app.render('home', {}, (err, html)=>{ // 파일이름, 바인딩하는 객체, 실행 콜백함수
        if(err) throw err;
        // err가 null이 아니면 화면에 결과를 출력한다.
        res.end(html);
    });
    // res.end()는 한번의 요청에 한번만 한다.
});

const list = ['직업: 없음','나이: 23세','종교: 무교','자산: 100억']
app.get('/profile', (req, res) => {
    req.app.render('profile', {list}, (err, html)=>{
        if(err) throw err;
        res.end(html);
    });
});

// http 모듈과 express모듈의 결합된 형태로 실행
// 같은 port를 사용 할 수 있음
const server = http.createServer(app);  //http 모듈을 사용하여 app를 감싸서 HTTP 서버(server)를 생성,  HTTP 서버와 Express 애플리케이션을 결합하여 실행
server.listen(3000, ()=>{ //서버를 포트 3000에서 실행
    console.log(">> Run on Server http://localhost:3000");
});


//내려받은 파일에 node_modules가 없을 때 "npm install" =>  node_modules와 package.json이 자동으로 생성됨
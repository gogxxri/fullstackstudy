package websocket;

import java.io.IOException;
import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value="/websocket/chat") //어노테이션, 해당 클래스 또는 메서드가 WebSocket 서버 엔드포인트로 사용됨을 나타내며, 
										 // "/websocket/chat" 경로를 통해 WebSocket 연결을 관리할 것임을 선언
public class ChatServer {
	private static final String PREFIX = "Guest "; //사용자 이름의 기본 접두사
	private static final AtomicInteger ids = new AtomicInteger(0); // 사용자 ID를 생성하기 위해 사용, 자동으로 숫자 증가
	private static final Set<ChatServer> connections = new CopyOnWriteArraySet<ChatServer>();
						//Set : 순서가 없는 요소의 모음, ChatServer 객체의 집합
						//connections: 변수의 이름. 연결된 클라이언트를 추적하는 데 사용
						//opyOnWriteArraySet<ChatServer>(): CopyOnWriteArraySet의 새 인스턴스를 만드는 코드 
												//CopyOnWriteArraySet은 스레드 안전한 Set 구현, 스레드에서 안전하게 동시 액세스할 수 있도록 설계
	private final String nickname;
	private Session session;
	
	public ChatServer() { // 생성자
		nickname = PREFIX + ids.getAndIncrement(); // 하나씩 증가하는 숫자 가져옴
		String threadName = Thread.currentThread().getName(); // 현재스레드의 이름 가져옴
		System.out.println(threadName + " : " + nickname);
	}
	
	@OnOpen
	public void start(Session session) { // 세션을 가져옴
		this.session = session;
		connections.add(this); // 접속할때마다 생기는 ChatServer인스턴스 생김, 현재 접속한 객체 넣어줌
		System.out.println("클라이언트 접속 : " + session);
		String msg = String.format("* %s%s",nickname, "님이 입장했습니다." ); //format에 변환문자 사용
		broadcast(msg); // 브로드캐스트로 모두에게 데이터를 뿌림
	}
	@OnClose // 한 명이 나가면
	public void end() {
		connections.remove(this); // 현재 나간것을 connections 객체에서 뺌
		String msg = String.format("* %s%s",nickname, "님이 퇴장했습니다." ); //format에 변환문자 사용
		broadcast(msg); // 브로드캐스트로 모두에게 데이터를 뿌림
		
	}
	@OnMessage // 메세지가 서버쪽으로 넘어왔을때
	public void incoming(String message) { // 메세지가 넘어오면
		if(message == null || message.trim().equals(""))
			return; // 메세지가 없거나, 공백으로 되어있어 트림하면 빈 문자열일때 끝냄
		String threadName = Thread.currentThread().getName();
		System.out.println(threadName + " : " + nickname);
		String msg = String.format("%s : %s", nickname, message);
		broadcast(msg);
	}
	@OnError
	public void error(Throwable t) { // throwable : 모든 예외와 에러의 조상
		System.err.println("Error " + t.toString()); // 서버에 출력, toString()으로 객체를 정해진 형식으로 출력
	}
	
	private void broadcast(String message) {
		Iterator<ChatServer> cs = connections.iterator();
		while(cs.hasNext()) {
			ChatServer client = cs.next(); // 챗서버 객체를 만들어 connections에 넣음
			try {
				synchronized(client) { // 객체를 사용할 때 동기화
					client.session.getBasicRemote().sendText(message); //
				}
			} catch(IllegalStateException e) { // 읽기, 쓰기가 충돌났을 때 데이터를 다시 보냄
				if(e.getMessage().indexOf("[TEXT_FULL_WARNING]")!= -1) { // 메세지를 못받는 상황에서 (ex 클라이언트 통신 문제)
					//TEXT_FULL_WARNING이 발생했을때
					new Thread() { // 스레드를 구현하려면 run메서드 필요
						public void run() {
							while(true) {
								try {
									client.session.getBasicRemote().sendText(message);
									break; // 성공적으로 보내졌을때 while문 멈춤
								} catch(IllegalStateException e) {
									try {
										Thread.sleep(100);// 다시 충돌났을 때 보내는 작업을 잠시 기다리도록 함 (100=0.1초)
									} catch(InterruptedException ee) {
										ee.printStackTrace();
									}
										
								} catch(Exception e) {
									e.printStackTrace();
								}
								
							}
						}
					}.start();
				}
			} catch(Exception e) { // 나머지 예외
				System.out.println("Exception : " + e.getMessage());// 클라이언트가 강제종료 or 문제가 있어 종료 했을때 예외출력
				connections.remove(this);
				
				try {
					client.session.close();
				} catch (IOException ee) {
					ee.printStackTrace();
				}
				String msg = String.format("* %s%s", nickname, "님이 퇴장했습니다.");
				broadcast(msg);
			}
		}
	}
	
	
}

package org.comstudy21.phonebook;
/*
public class PhoneBookMain {
	
	public static int seq = 0; // 정적 변수 선언
	public static int no = 0;
	
	Command input = new Input(); 	// Command 인터페이스를 구현한 객체 생성
	Command output = new Output();
	Command search = new Search();
	Command modify = new Modify();
	Command delete = new Delete();
	Command end = new End();
	Command menu = new Menu();
	
	public PhoneBookMain(int size) { 		// 생성자 : 주어진 크기만큼 PhoneVo 객체 생성 => 
		for(int i=0; i<size; i++) {			// phoneBookList에 추가
			phoneBookList.add(new PhoneVo(i, "name"+i, "010-1111-111"+i));
		}
		seq = size;
	}
	
	private void start() {
		System.out.println("-------- PhoneBook App --------");
		menu.execute();
		// 분기는 if or switch or 컬렉션을 이용한다.
		switch(no) {
		case 1 : input.execute(); break;
		case 2 : output.execute(); break;
		case 3 : search.execute(); break;
		case 4 : modify.execute(); break;
		case 5 : delete.execute(); break;
		case 6 : end.execute(); break;
		default: System.out.println("해당 사항 없습니다!");
		}
		// 재귀호출로 반복문을 대신한다.
		start();
	}
	
	public static void main(String[] args) {
		PhoneBookMain app = new PhoneBookMain(5); // PhoneBookMain 객체 생성, 크기 5로 설정
		app.start();
	}
}

*/
// map으로 풀 때
import static org.comstudy21.phonebook.view.Command.phoneBookList;

import java.util.HashMap;

import org.comstudy21.phonebook.model.PhoneVo;
import org.comstudy21.phonebook.view.Command;
import org.comstudy21.phonebook.view.Delete;
import org.comstudy21.phonebook.view.End;
import org.comstudy21.phonebook.view.Input;
import org.comstudy21.phonebook.view.Menu;
import org.comstudy21.phonebook.view.Modify;
import org.comstudy21.phonebook.view.Output;
import org.comstudy21.phonebook.view.Search;

  	public class PhoneBookMain {
	
	public static int seq = 0;
	public static int no = 0;
	
	public static HashMap<Integer, Command> map = new HashMap<Integer, Command>();
	static {
		map.put(0, new Menu());
		map.put(1, new Input());
		map.put(2, new Output());
		map.put(3, new Search());
		map.put(4, new Modify());
		map.put(5, new Delete());
		map.put(6, new End());
	}
	
	public PhoneBookMain(int size) {
		for(int i=0; i<size; i++) {
			phoneBookList.add(new PhoneVo(i, "name"+i, "010-1111-111"+i));
		}
		seq = size;
	}
	
	private void start() {
		System.out.println("-------- PhoneBook App --------");
		map.get(0).execute(); // Menu 실행
		// 분기는 if or switch or 컬렉션을 이용한다.
		map.get(no).execute();
		// 재귀호출로 반복문을 대신한다.
		start();
	}
	
	public static void main(String[] args) {
		PhoneBookMain app = new PhoneBookMain(5);
		app.start();
	}
}


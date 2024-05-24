package org.comstudy.todo.model;

import java.util.ArrayList;
import java.util.List;

public class TodoDAOList implements DAO {
	public static final List<TodoDTO> todoList = new ArrayList<TodoDTO>();
	static {
		todoList.add(new TodoDTO(1, "첫 번째 할 일", false));
		todoList.add(new TodoDTO(2, "두 번째 할 일", false));
		todoList.add(new TodoDTO(1, "세 번째 할 일", false));
	}
	
	public static int seq = 4;
	
	private int findIdx(List<TodoDTO> todoList, TodoDTO dto) { // todoList에서 find index 찾기
		int idx=-1;
		for (int i=0; i<todoList.size(); i++) {
			if(dto.getSeq() == todoList.get(i).getSeq()) {
				idx = i;
				break;
			
			}
		}
		return idx;
	}
	
	@Override
	public List<TodoDTO> selectAll() { // 전체 데이터 
		// 기존 데이터를 복사해서 새 데이터 만듦
		List<TodoDTO> newTodoList = new ArrayList<TodoDTO>(todoList.size());
		for (int i=0; i<todoList.size(); i++) {
			int seq = todoList.get(i).getSeq();
			String title = todoList.get(i).getTitle();
			boolean done = todoList.get(i).isDone();
			newTodoList.add(new TodoDTO(seq, title, done)); // 새로 객체를 만듦 (원본에 있는 데이터의 참조를 끊어주기 위해)
		}
		return newTodoList;
	}
	
	@Override
	public TodoDTO selectOne(TodoDTO dto) {
		TodoDTO todo = null;
		int i = findIdx(todoList, dto); //찾으면 i, 못찾으면 -1반환
		
		if(i != -1) { // 찾았을 때
			String title = todoList.get(i).getTitle();
			boolean done = todoList.get(i).isDone();
			todo = new TodoDTO(dto.getSeq(), title, done);
		}
		return todo;
	}
	@Override
	public void insert(TodoDTO dto) {
		dto.setSeq(seq++);
		todoList.add(dto);
	}
	@Override
	public void update(TodoDTO dto) {
		int i = findIdx(todoList, dto); // 해당 인덱스를 찾아서
		if (i != -1) { // 찾으면 수정
			if(dto.getTitle() != null) {
				todoList.get(i).setTitle(dto.getTitle());
			}
			todoList.get(i).setDone(dto.isDone());
		}
	}
	@Override
	public void delete(TodoDTO dto) {
		int i = findIdx(todoList, dto);
		if (i != -1) {
			todoList.remove(i);
		}
	}
}

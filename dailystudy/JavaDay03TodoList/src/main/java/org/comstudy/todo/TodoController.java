package org.comstudy.todo;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.comstudy.todo.model.TodoDAO;
import org.comstudy.todo.model.TodoDTO;

public class TodoController extends HttpServlet {

	private TodoDAO dao = new TodoDAO();

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		resp.setContentType("text/html; charset=UTF-8");
		
		String reqUri = req.getRequestURI();
		String ctxPath = req.getContextPath();
		int beginIndex = ctxPath.length();
		String urlPattern = reqUri.substring(beginIndex);
		
		System.out.println("urlPattern: " + urlPattern);
		
		boolean isRedirect = false;
		String viewName = "/WEB-INF/views/todo/list.jsp";
		
		if("/todo/list.do".equals(urlPattern)) { // list 화면
			List<TodoDTO> todoList = dao.selectAll(); // 목록 바인딩
			req.setAttribute("todoList", todoList); // "todolist"변수에 todolist 값을 넣어요.
		} else {
			if(req.getParameter("seq") != null) {				
				int seq = Integer.parseInt(req.getParameter("seq") );
				System.out.println("seq : " + seq);
			}
			
			if("/todo/ok.do".equals(urlPattern)) {
				if(req.getParameter("seq") != null) {				
					int seq = Integer.parseInt(req.getParameter("seq"));
					//System.out.println("seq : " + seq);
					TodoDTO todo = dao.selectOne(new TodoDTO(seq, null, true));
					todo.setDone(!todo.isDone());
					dao.update(todo);
				}
				isRedirect = true; // 처리 후 목록으로 리다이렉트
			
			} else if("/todo/edit.do".equals(urlPattern)) {
				int seq = Integer.parseInt(req.getParameter("seq") );
				System.out.println("seq => " + seq);
				TodoDTO todo = dao.selectOne(new TodoDTO(seq, null, false));
				req.setAttribute("todo", todo);
				viewName = "/WEB-INF/views/todo/modify.jsp";
				
			} else if("/todo/del.do".equals(urlPattern)) {
				if(req.getParameter("seq") != null) {				
					int seq = Integer.parseInt(req.getParameter("seq") );
					System.out.println("seq => " + seq);
					dao.delete(new TodoDTO(seq, null, false));
				}
				isRedirect = true;
			} 
		}
	
		if(isRedirect) {
			resp.sendRedirect("list.do");
		} else {
			RequestDispatcher view = req.getRequestDispatcher(viewName);
			view.forward(req, resp);
		}
	}

	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		resp.setContentType("text/html; charset=UTF-8");
		
		String reqUri = req.getRequestURI();
		String ctxPath = req.getContextPath();
		int beginIndex = ctxPath.length();
		String urlPattern = reqUri.substring(beginIndex);
		
		System.out.println("urlPattern: " + urlPattern);
		
		if("/todo/save.do".equals(urlPattern)) {// 새 할일 저장
			String title = req.getParameter("title");
			dao.insert(new TodoDTO(0, title, false));
		} else if("/todo/edit.do".equals(urlPattern)) { // 할 일의 제목, 확인 -> 수정
			int seq = Integer.parseInt(req.getParameter("seq") );
			String title = req.getParameter("title");
			boolean done = false;
			if("true".equals(req.getParameter("done"))) { // 문자열이 true면
				done = true; // true로 바꿔주기
			}
			dao.update(new TodoDTO(seq, title, done));
		}
		resp.sendRedirect("list.do");
	}
}

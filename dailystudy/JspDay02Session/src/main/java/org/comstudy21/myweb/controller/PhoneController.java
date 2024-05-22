package org.comstudy21.myweb.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.comstudy21.myweb.model.PhoneDAO;
import org.comstudy21.myweb.model.PhoneDTO;
public class PhoneController extends HttpServlet {
	// 모든 멤버 메서드에서 접근 가능.
	private PhoneDAO dao = new PhoneDAO(); // 모든 멤버 메서드에 접근가능
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		resp.setContentType("text/html; charset=UTF-8");
		System.out.println("doGet - PhoneController 실행");
		// GET 방식으로 요청이 들어오면 주로 JSP페이지 forward 한다.
		
		String reqUrl = req.getRequestURI(); // 클라이언트가 요청한 전체 URI를 반환
		String ctxPath = req.getContextPath(); //현재 웹 애플리케이션의 컨텍스트 경로를 반환
		int beginIndex = ctxPath.length();
		String urlPattern = reqUrl.substring(beginIndex); //URI에서 컨텍스트 경로 부분을 제외한 나머지 부분을 추출
		
		/*
		System.out.println("reqUrl : " + reqUrl);
		System.out.println("ContextPath : " + ctxPath);*/
		System.out.println("urlPattern: " + urlPattern);
		
		String path = "/WEB-INF/views/PhoneInput.jsp"; // 포워드 할 페이지
		if("/phone/list.do".equals(urlPattern)) {
			// request에 바인딩 하기
			List<PhoneDTO> list = dao.selectAll();
			req.setAttribute("list", list);
			
			path = "/WEB-INF/views/PhoneList.jsp"; 
		} else if("/phone/detail.do".equals(urlPattern)) {
			int seq = Integer.parseInt(req.getParameter("seq"));
			//System.out.println("contraoller seq : " + seq);
			
			PhoneDTO phone = dao.selectBySeq(new PhoneDTO(seq, null, null));
			// phone객체를 request에 바인딩하기
			
			req.setAttribute("phone", phone);
			// forward되는 페이지 url 지정
			path = "/WEB-INF/views/PhoneDetail.jsp"; 
		} else if("/phone/modify.do".equals(urlPattern)) {
			int seq = Integer.parseInt(req.getParameter("seq"));
			PhoneDTO phone = dao.selectBySeq(new PhoneDTO(seq, null, null));
			req.setAttribute("phone", phone);
			path = "/WEB-INF/views/PhoneModify.jsp";
		} else if("/phone/delete.do".equals(urlPattern)) {
			int seq = Integer.parseInt(req.getParameter("seq"));
			PhoneDTO phone = dao.selectBySeq(new PhoneDTO(seq, null, null));
			req.setAttribute("phone", phone);
			path = "/WEB-INF/views/PhoneDelete.jsp";
		}
		
		//RequestDispatcher : JSP와 Servlet 사이에서 request와 response를 전달하는 기능 제공		(방식1. forword() 방식2.include()	)				
		RequestDispatcher dispatcher = req.getRequestDispatcher(path);
		dispatcher.forward(req, resp); //  현재 요청(req)과 응답(resp)을 다른 리소스로 전달
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// POST방식에서 doPost에서 한글 깨짐 해결
		req.setCharacterEncoding("UTF-8");
		// GET 방식에서는 server.xml의 63번 라인에 URIEncoding="UTF-8" 속성 추가
		
		// POST 방식으로 요청이 들어오면 주로 DAO 요청 처리하고 redirect한다.
		// req.getParameter() 사용.
		// 데이터를 전달 받아서 dto객체로 만든 후 dao.insert(dto) 전달
		// 처리 후 list.do로 리다이렉트
		
		String reqUrl = req.getRequestURI(); // 클라이언트가 요청한 전체 URI를 반환
		String ctxPath = req.getContextPath(); //현재 웹 애플리케이션의 컨텍스트 경로를 반환
		int beginIndex = ctxPath.length();
		String urlPattern = reqUrl.substring(beginIndex); //URI에서 컨텍스트 경로 부분을 제외한 나머지 부분을 추출
		
		if("/phone.input.do".equals(urlPattern)) {
			String name = req.getParameter("name"); // 이름, 전화번호 가져옴
			String phone = req.getParameter("phone");
			PhoneDTO dto = new PhoneDTO(0, name, phone);  // 객체 생성
			dao.insert(dto); //새로운 데이터를 추가
		} else if("/phone/modify.do".equals(urlPattern)) {
			int seq = Integer.parseInt(req.getParameter("seq"));
			String name = req.getParameter("name");
			String phone = req.getParameter("phone");
			PhoneDTO dto = new PhoneDTO(seq, name, phone);
			dao.update(dto);
		} else if("/phone/delete.do".equals(urlPattern)) {
			int seq = Integer.parseInt(req.getParameter("seq"));
			dao.delete(new PhoneDTO(seq, null, null));
		}

		resp.sendRedirect("list.do");
		
		// req.getParameter()사용
		// 데이터를 전달 방아서 dto객체로 만든 후 dao.insert(dto)전달
		// 처리 후 list.do로 리다이렉트
	}
}
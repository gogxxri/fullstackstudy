package org.comstudy21.myweb.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.comstudy21.myweb.dbcp.JdbcUtil;
public class PhoneDAO {
	
	private Connection conn;
	private Statement stmt;
	private ResultSet rs;
	private PreparedStatement pstmt;
	
	public List<PhoneDTO> selectAll() {
		
		//out.println(conn); // 커넥션 객체 확인
		ArrayList<PhoneDTO> list = null;
		try {
			conn = JdbcUtil.getConnection();// 데이터베이스 연결을 가져옴
			Statement stmt = conn.createStatement(); // SQL문을 실행할 Statement 객체 생성 // SQL문을 DB에 전달하는 역할(서술)
			ResultSet rs = stmt.executeQuery("SELECT * FROM PHONEBOOK "); //PHONEBOOK 테이블에서 모든 데이터를 가져오는 쿼리 실행
			list = new ArrayList<PhoneDTO>();
			//rs.first(); // 커서를 맨 윗졸로 옮긴다. (반대는 rs.last())
			while(rs.next()){// ResultSet의 다음 행이 존재하는 동안 반복
				int seq = rs.getInt(1);
				String name = rs.getString(2);
				String phone = rs.getString(3);// 현재 행의 데이터를 읽어서 변수에 저장
				list.add(new PhoneDTO(seq, name, phone));// 읽은 데이터를 PhoneDTO 객체로 생성하여 리스트에 추가
			}
			JdbcUtil.close(conn, stmt, rs);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public PhoneDTO selectBySeq(PhoneDTO dto) { // seq로 검색해서 가져옴
		//System.out.println("seq : " + dto.getSeq());
		int seq = dto.getSeq();
		PhoneDTO phoneDto = null;
		
		try {
			conn = JdbcUtil.getConnection();
			stmt = conn.createStatement(); // SQL문을 실행할 Statement 객체 생성 // SQL문을 DB에 전달하는 역할(서술)
			rs = stmt.executeQuery("SELECT * FROM PHONEBOOK WHERE SEQ=" + seq);
			//rs.first(); // 커서를 맨 윗줄로 옮긴다. (반대는 rs.last())
			while(rs.next()){// ResultSet의 다음 행이 존재하는 동안 반복
				String name = rs.getString(2);
				String phone = rs.getString(3);// 현재 행의 데이터를 읽어서 변수에 저장
				phoneDto = new PhoneDTO(seq, name, phone);// 읽은 데이터를 PhoneDTO 객체로 생성하여 리스트에 추가
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.close(conn, stmt, rs);
		}
		
		return phoneDto;
	}
	
	public PhoneDTO selectByName(PhoneDTO dto) { // name으로 검색해서 가져옴
		return null;
	}
	
	public void insert(PhoneDTO dto) {
		System.out.println("DAO의 insert메서드 호출...");
		
		String sql = "insert into phonebook (name, phone) values (?,?)";
		conn = JdbcUtil.getConnection();
		try {
			// PreparedStatement를 사용해 쿼리에 대한 매개변수를 설정
			pstmt = conn.prepareStatement(sql); //sql에 실행할 작업나타냄
			// dto의 필드값을 ?대신 대입시킨다.
			pstmt.setString(1, dto.getName());//forward에서 받은 dto에서 이름 설정
			pstmt.setString(2, dto.getPhone());//forward에서 받은 dto에서 전화번호 설정
			int cnt = pstmt.executeUpdate();
			//처리된 카운트가 0이면 저장x, pstmt가 0보다 크면 입력 성공
			if(cnt>0) {
				System.out.println("입력 성공!!");
			} else {
				System.out.println("입력 실패!");
			}
		} catch (SQLException e) {
			System.out.println("데이터 입력 시 예외 발생!");
		} finally {
			JdbcUtil.close(conn, pstmt, rs);
		}
	}
	
	public void update(PhoneDTO dto) {
		conn = JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("UPDATE PHONEBOOK SET NAME=?, PHONE=? WHERE SEQ=?");
			pstmt.setString(1, dto.getName());
			pstmt.setString(2, dto.getPhone());
			pstmt.setInt(3, dto.getSeq());
			int cnt = pstmt.executeUpdate();
			if(cnt>0) {
				System.out.println("수정 완료!");
			} else {
				System.out.println("수정 실패!");
			}	
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.close(conn, pstmt, rs);
		}
		
	}
	
	public void delete(PhoneDTO dto) {
		conn=JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("DELETE FROM PHONEBOOK WHERE SEQ=?");
			pstmt.setInt(1, dto.getSeq());
			int cnt = pstmt.executeUpdate();
			if(cnt>0) {
				System.out.println("삭제 완료!");
			} else {
				System.out.println("삭제 실패!");
			}
		} catch (SQLException e) {
			
			e.printStackTrace();
		} finally {
			JdbcUtil.close(conn,pstmt, rs);
		}

		
	}
}
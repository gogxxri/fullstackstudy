package org.comstudy.todo.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.comstudy.todo.dbcp.JdbcUtil;

public class TodoDAO implements DAO {
	
	private Connection conn;
	private Statement stmt;
	private ResultSet rs;
	private PreparedStatement pstmt;
	
	@Override
	public List<TodoDTO> selectAll() {
		ArrayList<TodoDTO> list = null;

		try {
			conn = JdbcUtil.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery("SELECT * FROM TODOLIST");
			list = new ArrayList<TodoDTO>();
			
			while(rs.next()) {
				int seq = rs.getInt(1);
				String title = rs.getString(2);
				boolean done = rs.getBoolean(3);
				list.add(new TodoDTO(seq, title, done));
			} 
		} catch (SQLException e) {
			
			e.printStackTrace();
		} finally {
			JdbcUtil.close(conn, stmt, rs);
		}
		return list;
	}

	@Override
	public TodoDTO selectOne(TodoDTO dto) {
	    int seq = dto.getSeq();
	    TodoDTO todoDto = null;
	    try {
	        conn = JdbcUtil.getConnection();
	        pstmt = conn.prepareStatement("SELECT * FROM TODOLIST WHERE SEQ=?"); 
	        pstmt.setInt(1, seq); 
	        rs = pstmt.executeQuery();
	        
	        while(rs.next()) {
	            String title = rs.getString(2);
	            boolean done = rs.getBoolean(3);
	            todoDto = new TodoDTO(seq, title, done);
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    } finally {
	        JdbcUtil.close(conn, pstmt, rs);
	    }
	    return todoDto;
	}

	@Override
	public void insert(TodoDTO dto) {
		String sql = "INSERT INTO TODOLIST (TITLE, DONE) VALUES (?, ?)";
		conn = JdbcUtil.getConnection();
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, dto.getTitle());
			pstmt.setBoolean(2, dto.isDone());
			
			int cnt = pstmt.executeUpdate();
			if(cnt > 0) {
				System.out.println("입력성공");
			} else {
				System.out.println("입력 실패");
			}
		} catch (SQLException e) {
			System.out.println("데이터 입력 시 예외 발생");
		} finally {
			JdbcUtil.close(conn, pstmt, rs);
		}

	}

	@Override
	public void update(TodoDTO dto) {
	    conn = JdbcUtil.getConnection();
	    try {
	        pstmt = conn.prepareStatement("UPDATE TODOLIST SET TITLE=?, DONE=? WHERE SEQ=?");
	        pstmt.setString(1, dto.getTitle());
	        pstmt.setBoolean(2, dto.isDone());
	        pstmt.setInt(3, dto.getSeq());
	        
	        int cnt = pstmt.executeUpdate();
	        if(cnt > 0) {
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

	@Override
	public void delete(TodoDTO dto) {
		conn=JdbcUtil.getConnection();
		try {
			pstmt = conn.prepareStatement("DELETE FROM TODOLIST WHERE SEQ=?");
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

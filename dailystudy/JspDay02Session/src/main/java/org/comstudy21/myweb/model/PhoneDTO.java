package org.comstudy21.myweb.model;

public class PhoneDTO {
	private int seq;
	private String name;
	private String phone;
	
	public PhoneDTO() {
		
	}
	public PhoneDTO(int seq, String name, String phone) {
		this.seq = seq;
		this.name = name;
		this.phone = phone;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	@Override
	public String toString() {
		return "PhoneDTO [seq=" + seq + ", name=" + name + ", phone=" + phone + "]";
	}
	public String mkRow() { // HTML 테이블 행을 생성
		return "<tr><td>" + seq + "</td><td>" + name + "</td><td>" + phone + "</td></tr>";
	}
}
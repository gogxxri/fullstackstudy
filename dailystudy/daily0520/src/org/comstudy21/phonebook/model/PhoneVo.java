package org.comstudy21.phonebook.model;

import java.util.Objects;

public class PhoneVo {
	private int seq;
	private String name;
	private String phone;
	
	public PhoneVo() { }

	public PhoneVo(int seq, String name, String phone) {
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
	
	@Override
	public String toString() {
		return "{seq:" + seq + ", name:" + name + ", phone:" + phone + "}";
	}

	// 컬렉션에서 indexOf를 사용하기 위해서 필요한 Override
	@Override
	public int hashCode() {
		return Objects.hash(name);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PhoneVo other = (PhoneVo) obj;
		return Objects.equals(name, other.name);
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	
	
	
}

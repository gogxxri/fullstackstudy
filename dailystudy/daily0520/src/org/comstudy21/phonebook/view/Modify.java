package org.comstudy21.phonebook.view;

import org.comstudy21.phonebook.model.PhoneVo;

public class Modify implements Command {

	//indexOf를 사용하기 위해 PhoneVo에서 hashCode, equals 오버라이딩 필요
	private void modify() {
		System.out.println(":::: MODIFY ::::");
		System.out.print("전화번호를 수정 할 성명 입력: ");
		String searchName = scan.next();
		int fIndex = phoneBookList.indexOf(new PhoneVo(0, searchName, ""));
		if(fIndex == -1) {
			System.out.println("검색 한 내용이 없습니다.");
			return; // 메서드 기능 종료
		}
		System.out.println("검색 결과 : " + phoneBookList.get(fIndex));
		System.out.print("새 전화번호 입력: ");
		phoneBookList.get(fIndex).setPhone(scan.next());
	}
	
	@Override
	public void execute() {
		modify();
	}

}

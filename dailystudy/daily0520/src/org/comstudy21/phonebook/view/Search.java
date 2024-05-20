package org.comstudy21.phonebook.view;

import org.comstudy21.phonebook.model.PhoneVo;

public class Search implements Command {
	private void search() {
		System.out.println(":::: SEARCH ::::");
		// 의사코드(한국어로 논리적으로 코딩) - 실행순서
		// 1. 성명 입력
		// 2. 해당 성명이 있는 index 찾기
		// 3. 해당 index 내용 출력

		int findIdx = -1;
		System.out.print("검색 할 성명 입력 : ");
		String searchName = scan.next();
		for (int i=0; i<phoneBookList.size(); i++) { //phoneBookList를 순회하여 찾음
			// 테스트를 해보면서 구현(TDD)
			PhoneVo phoneVo = phoneBookList.get(i);
			if(searchName.equals(phoneVo.getName())) {
				System.out.println(searchName + "은 " + i + "번째에 있습니다.");
				findIdx = i;
			}
		}
		// 반복문이 끝나고 findIdx가 -1이면 검색 결과가 없음
		if(findIdx != -1) {
			System.out.println(phoneBookList.get(findIdx)); // 해당 인덱스의 객체 출력
		} else {
			System.out.println("검색결과가 없습니다.");
		}
	}

	@Override
	public void execute() {
		search();
	}

}

package org.comstudy21.phonebook.view;

import org.comstudy21.phonebook.model.PhoneVo;

import static org.comstudy21.phonebook.PhoneBookMain.seq;

public class Input implements Command {
	
	private void input() {
		System.out.println(":::: INPUT ::::");
		System.out.print("성명입력: ");
		String name = scan.next();
		System.out.print("전화번호입력: ");
		String phone = scan.next();
		phoneBookList.add(new PhoneVo(seq++, name, phone));
	}

	@Override
	public void execute() {
		input();
	}
}
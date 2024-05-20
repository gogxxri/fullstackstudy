package org.comstudy21.phonebook.view;

import java.util.ArrayList;
import java.util.Scanner;

import org.comstudy21.phonebook.model.PhoneVo;

public interface Command {
	ArrayList<PhoneVo> phoneBookList = new ArrayList<PhoneVo>();
	Scanner scan = new Scanner(System.in);
	
	void execute(); // 추상메서드
}

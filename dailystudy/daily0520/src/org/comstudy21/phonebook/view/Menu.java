package org.comstudy21.phonebook.view;

import static org.comstudy21.phonebook.PhoneBookMain.*; 

public class Menu implements Command {
	
	private int menu() {
		System.out.println(":::: MENU ::::");
		System.out.println("1.input 2.output 3.search 4.modify 5.delete 6.end");
		System.out.print("Choice: ");
		no = scan.nextInt();
		return no;
	}

	@Override
	public void execute() {
		menu();
	}

}

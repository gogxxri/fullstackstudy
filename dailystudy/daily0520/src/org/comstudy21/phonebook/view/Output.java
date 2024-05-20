package org.comstudy21.phonebook.view;

import static org.comstudy21.phonebook.view.Command.phoneBookList;

public class Output implements Command {
	
	private void output() {
		System.out.println(":::: OUTPUT ::::");
		for(int i=0; i<phoneBookList.size(); i++) {
			System.out.println(phoneBookList.get(i));
		}
	}

	@Override
	public void execute() {
		output();
	}
}

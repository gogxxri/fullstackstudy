package org.comstudy21.phonebook.view;

public class Delete implements Command {

	private void delete() {
		System.out.println(":::: DELETE ::::");
	}
	
	@Override
	public void execute() {
		delete();
	}

}

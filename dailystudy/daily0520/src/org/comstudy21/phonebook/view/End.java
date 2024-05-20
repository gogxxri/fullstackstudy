package org.comstudy21.phonebook.view;

public class End implements Command {

	private void end() {
		System.out.println(":::: THE END ::::");
		System.exit(0); // 프로세스 강제 종료
	}
	
	@Override
	public void execute() {
		end();
	}
}

package org.comstudy.todo.model;

public class TodoDTO {

	private int seq;
	private String title;
	private boolean done;
	
	public TodoDTO() {
	}

	public TodoDTO(int seq, String title, boolean done) {
		this.seq = seq;
		this.title = title;
		this.done = done;
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public boolean isDone() {
		return done;
	}

	public void setDone(boolean done) {
		this.done = done;
	}

	@Override
	public String toString() {
		return "TodoDTO [seq=" + seq + ", title=" + title + ", done=" + done + "]";
	}
}

package com.constructor;

import com.classobject.Student;

public class ConstructorExample {
	int age;
	String name;
	public ConstructorExample() { // Non parameterized constructor
		
	}

	public ConstructorExample(int age, String name) {
		this.age=age;
		this.name=name;
	}
		public static void main(String[] args) {
			ConstructorExample c=new ConstructorExample('A',"Maria");
			ConstructorExample c1=new ConstructorExample();
			System.out.println("Name is  "+c.name);
			System.out.println("Age is  "+c.age);
			Student s=new Student();
		//	s.test();

		}

}

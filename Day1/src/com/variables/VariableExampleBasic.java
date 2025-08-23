package com.variables;
//Instance,Static,Local
public class VariableExampleBasic {
public int age=20;//Instance
public static String name="Angel";//static

int add(int a,int b){	   
	return  a+b;
}
void sayHello() {
	
}

int getLength(String s) {
	return s.length();
	
}

public static void main (String [] args) {	
	VariableExampleBasic   space =new VariableExampleBasic();
	//System.out.println(space.age);
	System.out.println(space.add(2,3));
}
	
}

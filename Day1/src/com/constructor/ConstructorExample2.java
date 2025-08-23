package com.constructor;

public class ConstructorExample2 {
int id;
String name;
private ConstructorExample2(int id,String name) {
	this.id=id;
	this.name=name;
	
}

public ConstructorExample2() {
	super();
}
void test() {
	
}

public static void main(String[] args) {
	ConstructorExample2 c=new ConstructorExample2(2,"Sneha");
	System.out.println(c.id);
	System.out.println(c.name);

	



}
}

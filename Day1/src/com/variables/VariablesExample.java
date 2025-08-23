package com.variables;


//Instance,Static,Local
public class VariablesExample {
  int numInstance; // Instance variable
  static int count = 0; // Static variable
	
  public void increment() {
      count++;
      numInstance++;
      numInstance=100;
  }
  
  public static void display() {
  	VariablesExample v1=new VariablesExample();
      int num=10 ;// Local variable - all local variables must be initialized before it is used      
      System.out.println("num " +num);
      System.out.println("numInstance "+v1.numInstance);
  }
	public static void main(String[] args) {
	   	VariablesExample v=new VariablesExample();
		v.display();//10
		v.increment();//
		v.display();
		System.out.println(count);
		System.out.println("numInstance "+v.numInstance);

	}

}

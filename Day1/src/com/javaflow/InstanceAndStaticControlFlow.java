package com.javaflow;


public class InstanceAndStaticControlFlow {
	{//5
		System.out.println("First Instance Block");
		
	}
	static { //1
		System.out.println("First Static Block");
	}

	InstanceAndStaticControlFlow(){//6
		System.out.println("Constructor");
	}
	public static void main(String[] args) { //2
		InstanceAndStaticControlFlow i=new InstanceAndStaticControlFlow();//4 Instance control flow starts
		System.out.println("Main method");
		InstanceAndStaticControlFlow i2=new InstanceAndStaticControlFlow();
	}
	static{ //3
		System.out.println("Second Static Block");
	}
	 {//7
		System.out.println("Second Instance  Block");
	}

}	
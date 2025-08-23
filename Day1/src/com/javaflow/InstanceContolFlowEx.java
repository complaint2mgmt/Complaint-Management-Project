package com.javaflow;


/*
Whenever v r executing a java class first static control flow will be executed, in the static control
 flow if v r creating an object the following sequence of events will be executed as a part of 
 instance control flow
*/
/*
1.Identification of instance members from top to bottom((If it is the variable 
JVM will assign the default value for the variable based on type))[3-8]
2.Execution of instance variable assignments and blocks from top to bottom[9-14]
3.Execution of Constructor
*** For every object creation all these 3 steps will be executed 
rather in static control flow only one time it will happen
*/
public class InstanceContolFlowEx {
int i=10; //3 //9
{ //4
	m1(); //10
	System.out.println("First instance block");//12
}
InstanceContolFlowEx(){ //5 //15
	System.out.println("Constructor");
}
	public static void main(String[] args) {//1
		InstanceContolFlowEx i=new InstanceContolFlowEx();//2 instance control flow starts
		System.out.println("Main"); //16
		

		
	}
	public void m1() { //6
		System.out.println(j); //11
	}
	{ //7  13
		System.out.println("Second instance block");
	}
	int j=20;  // 8 //14
	
}
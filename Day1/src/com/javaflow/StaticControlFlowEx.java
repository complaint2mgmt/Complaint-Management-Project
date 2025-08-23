package com.javaflow;

/*
static control flow
1.Identification of static members from top to bottom
(If it is the variable JVM will assign the default value for the variables based on type)
[step 1 to 6], so initially i value is 0 and j value is 0 in first step
2.execution of static variable assignments and static blocks from top to
bottom [7-12] j 20, i-10 [R&W]
3.execution of main method[13-15]
[RIWO]->Read indirectly write only
R&W->Read and write
*/
public class StaticControlFlowEx {
	static int i = 10;//0
	 // 1 -> assigning i value ->7 
	static { // 2  //executing static block ->8
		m1(); // it will call m1 method
		System.out.println("First static block"); //10
	}

	public static void main(String[] args) { // 3  execution of main method//13
		m1(); //here j value is 20
		System.out.println("Main method"); //15
	}

	public static void m1() { //4
		System.out.println(j); //9 //14
//		System.out.println(i); 
		
	}

	static { //5 
		System.out.println("Second static block"); //11
	}
	static int j = 20; //6 //12
//	static int i = 10;
}
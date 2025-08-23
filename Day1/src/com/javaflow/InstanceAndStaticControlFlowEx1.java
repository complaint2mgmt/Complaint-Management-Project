package com.javaflow;

public class InstanceAndStaticControlFlowEx1 {
	private static String m1(String msg) //1
	{
		System.out.println(msg); //2 3 1
		return msg;
		
	}
	public  InstanceAndStaticControlFlowEx1(){//4
		m=m1("1");
	}
	
	{//5
		m=m1("2");//2
	}
	
	String m=m1("3");//0 //5 =0 3
	
	
	public static void main(String[] args)//2 //3
	{
		InstanceAndStaticControlFlowEx1 i=new InstanceAndStaticControlFlowEx1();
		//System.out.println(i.m);
	}
}

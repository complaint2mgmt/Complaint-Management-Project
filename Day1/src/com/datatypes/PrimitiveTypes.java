package com.datatypes;

public class PrimitiveTypes {
	public static void main(String[] args) {
		//1. byte
		byte b = 127;// Range from -128 to 127
		System.out.println("byte value b is " + b);//printing

		//2.short
		short s =  3276;// Range from -32768 to 32767 // Explicit type casting
		System.out.println("short value s is " + s);
		short sMin = Short.MIN_VALUE;
		short sMax = Short.MAX_VALUE;
		
		System.out.println("minValue of int " + sMin);
		System.out.println("maxValue of int " + sMax);

		//3.int
		int i = 2147483647;// -2,147,483,648 to 2,147,483,647
		System.out.println("int value is " + i);
		int iMin = Integer.MIN_VALUE; // -2,147,483,648
		int iMax = Integer.MAX_VALUE; // 2,147,483,647
		System.out.println("minValue of int " + iMin);
		System.out.println("maxValue of int " + iMax);

		//4.long ->Must suffixed with L or l(L is for better readability)
		long bigNumber = 9223372036854775807L; // Maximum value
        long smallNumber = -9223372036854775808L; // Minimum value
        long decimalNumber = 123456789L; // Decimal value
		long lMin = Long.MIN_VALUE;
		long lMax = Long.MAX_VALUE;
		System.out.println("minValue of long " + lMin);
		System.out.println("maxValue of long" + lMax);

		//5.float ->Approximately 6 to 7 decimal digits.Literals: Must be suffixed with f or F
		float pi = 3.14f; // float literal
		float e = 2.71828f;
		float largeNumber = 1.2e10f; // Scientific notation
		float fMin = Float.MIN_VALUE;
		float fMax = Float.MAX_VALUE;
		System.out.println("minValue of float " + fMin);
		System.out.println("maxValue of float" + fMax);

		//6.double->end up with D or d is optional->Approximately 15 to 16 decimal digits.
		 double pid = 3.141592653589793;
	        double ed = 2.718281828459045;
	        double largeNumberd = 1.2e100; // Scientific notation
		float dMin = Float.MIN_VALUE;
		float dMax = Float.MAX_VALUE;
		System.out.println("minValue of double " + dMin);
		System.out.println("maxValue of duble" + dMax);
		
		//7.char 
		/*char is a 16-bit Unicode character data type in Java. It is used to store single characters such as
		 letters, digits, punctuation marks, and other symbols. Each char represents a single 16-bit Unicode 
		 character, allowing Java to support a wide range of international characters and symbols.*/
		char letterA = 'A';
        char digitOne = '1';
        char symbol = '$';
        char unicodeChar = '\u0041'; // Unicode for 'A'

        System.out.println("Letter A: " + letterA);
        System.out.println("Digit One: " + digitOne);
        System.out.println("Symbol: " + symbol);
        System.out.println("Unicode character: " + unicodeChar);
        
        
        //boolean
        /*
         * Boolean in Java is a primitive data type used to store logical values. It can have one of two values:
         *  true or false. Boolean variables are typically used in conditional statements, loops, and expressions 
         *  to control program flow based on the evaluation of logical conditions.
         */
        boolean isEnabled=true;
        boolean ischecked=false;
        System.out.println(isEnabled);
        System.out.println(ischecked);
	}
}

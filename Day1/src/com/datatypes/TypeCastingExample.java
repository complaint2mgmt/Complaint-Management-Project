package com.datatypes;

public class TypeCastingExample {
	public static void main(String[] args) {
        // Implicit Type Casting (Widening) - Smaller to Larger Data Type
        int intValue = 100;
        double doubleValue = intValue; // int to double (automatic conversion)
        System.out.println("Implicit Type Casting (Widening):");
        System.out.println("int value: " + intValue);
        System.out.println("Converted double value: " + doubleValue);
        System.out.println();

        // Explicit Type Casting (Narrowing) - Larger to Smaller Data Type
        double largeValue = 99.99;
        int smallValue = (int) largeValue; // double to int (manual conversion)
        System.out.println("Explicit Type Casting (Narrowing):");
        System.out.println("double value: " + largeValue);
        System.out.println("Converted int value: " + smallValue);
        System.out.println();

        // Type Casting between Different Primitive Types
        byte byteValue = 42;
        short shortValue = byteValue; // byte to short (widening)
        long longValue = shortValue; // short to long (widening)
        
        float floatValue = 5.75f;
        int newIntValue = (int) floatValue; // float to int (narrowing)

        System.out.println("Type Casting between Different Primitive Types:");
        System.out.println("byte to short: " + shortValue);
        System.out.println("short to long: " + longValue);
        System.out.println("float to int: " + newIntValue);
    }
}

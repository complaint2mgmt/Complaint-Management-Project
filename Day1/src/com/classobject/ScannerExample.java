package com.classobject;

import java.util.Scanner;

public class ScannerExample {
	  public static void main(String[] args) {
	        // Create Scanner object to read input from keyboard
	        Scanner scanner = new Scanner(System.in);

	        // Read a string
	        System.out.print("Enter your name: ");
	        String name = scanner.nextLine();

	        // Read an integer
	        System.out.print("Enter your age: ");
	        int age = scanner.nextInt();

	        // Read a double
	        System.out.print("Enter your height in meters: ");
	        double height = scanner.nextDouble();

	        // Read a boolean
	        System.out.print("Are you a student? (true/false): ");
	        boolean isStudent = scanner.nextBoolean();

	        // Display the input
	        System.out.println("\n--- User Details ---");
	        System.out.println("Name: " + name);
	        System.out.println("Age: " + age);
	        System.out.println("Height: " + height + " meters");
	        System.out.println("Student: " + isStudent);

	        // Always close the scanner to avoid memory leak
	        scanner.close();
	    }
}

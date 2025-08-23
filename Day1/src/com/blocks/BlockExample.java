package com.blocks;

public class BlockExample {
	 // Static block – runs once when class is loaded
    static {
        System.out.println("1. Static Block: Class is loaded.");
    }
    static {
        // one-time config setup
        System.out.println("Loading configuration from file...");
        // Example: Connect to database, read environment vars, init loggers
    }
    // Instance block – runs every time before constructor
    {
        System.out.println("2. Instance Block: Runs before constructor.");
    }
    public static void main(String[] args) {
        System.out.println("Main starts here...");
        
        BlockExample obj1 = new BlockExample();
        

        System.out.println("\nCreating second object...\n");
        BlockExample obj2 = new BlockExample();
    }
}

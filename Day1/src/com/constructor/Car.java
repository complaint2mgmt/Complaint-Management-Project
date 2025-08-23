package com.constructor;

public class Car {
	// Instance variables (each object gets its own copy)
    String brand;
    int year;

    // Static variable (shared across all objects)
    static int objectCount = 0;

    // Non-parameterized constructor
    Car() {
        // Default initialization
        this.brand = "Toyota";
        this.year = 2020;

        // Startup logic
        System.out.println(" A new car object is created!");

        // Update object count (useful for tracking)
        objectCount++;

        // Log the object's details
        displayInfo();
    }

    //  Parameterized constructor (for comparison)
    Car(String brand, int year) {
        this.brand = brand;
        this.year = year;
        objectCount++;
    }

    //  Method to display car details
    void displayInfo() {
        System.out.println("Brand: " + brand + ", Year: " + year);
    }

    public static void main(String[] args) {
        //  Create object using non-parameterized constructor
        Car car1 = new Car();

        //  Create object using parameterized constructor
        Car car2 = new Car("Honda", 2022);

        System.out.println("Total Cars Created: " + Car.objectCount);
    }
}

package com.example.emailnotification.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.emailnotification.service.EmailNotificationService;

@RestController
public class EmailNotificationController {
	@Autowired
	private EmailNotificationService sendEmailService;
	
	@GetMapping("sendEmail")
	public String sendEmail() {
		sendEmailService.sendEmail("eshwarbharathwaj@gmail.com", "Testing", "Tesing Email Notification Service");
		return "Sent Successfully";
		
	}
	
	
	

}

package com.telecom.faq.controller;


	import com.telecom.faq.model.FAQmodel;
	import com.telecom.faq.service.FAQService;


	import org.springframework.web.bind.annotation.*;

	import java.util.List;

	@RestController
	@RequestMapping("/faq")
	public class FAQController {

	    private final FAQService faqService;

	    public FAQController(FAQService faqService) {
	        this.faqService = faqService;
	    }
	    
	 
	    @PostMapping
	    public FAQmodel createFAQ(@RequestBody FAQmodel faq) {
	        return faqService.saveFAQ(faq);
	    }

	    @GetMapping
	    public List<FAQmodel> getAllFAQs() {
	        return faqService.getAllFAQs();
	    }

	    @GetMapping("/{id}")
	    public FAQmodel getFAQById(@PathVariable ("=id")Long id) {
	        return faqService.getFAQById(id);
	    }
	}



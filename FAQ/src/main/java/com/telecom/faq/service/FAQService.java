package com.telecom.faq.service;


	import com.telecom.faq.model.FAQmodel;

	import java.util.List;
	
	public interface FAQService {
		FAQmodel saveFAQ(FAQmodel faq);

	
	    List<FAQmodel> getAllFAQs();
	    FAQmodel getFAQById(Long id);
	}



package com.telecom.faq.service;


	import com.telecom.faq.model.FAQmodel;
	import com.telecom.faq.repository.FAQRepository;
	
	import org.springframework.stereotype.Service;

	import java.util.List;
import java.util.Optional;


	@Service
	public class FAQServiceImpl implements FAQService {

	    private final FAQRepository faqRepository;
	    @Override
	    public FAQmodel saveFAQ(FAQmodel faq) {
	        return faqRepository.save(faq);
	    }



	    public FAQServiceImpl(FAQRepository faqRepository) {
	        this.faqRepository = faqRepository;
	    }

	    @Override
	    public List<FAQmodel> getAllFAQs() {
	        return faqRepository.findAll();
	    }

	    @Override
	    public FAQmodel getFAQById(Long id) {
	    	Optional<FAQmodel> faq=faqRepository.findById(id);
	        return faq.orElse(null);
	    }
	}




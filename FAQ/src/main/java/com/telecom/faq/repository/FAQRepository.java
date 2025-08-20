package com.telecom.faq.repository;


	import org.springframework.data.jpa.repository.JpaRepository;

	import com.telecom.faq.model.FAQmodel;

	public interface FAQRepository extends JpaRepository<FAQmodel, Long> {

	}



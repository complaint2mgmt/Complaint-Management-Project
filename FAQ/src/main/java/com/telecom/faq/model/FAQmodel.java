package com.telecom.faq.model;



	import jakarta.persistence.*;

	@Entity
	@Table(name = "faq") 
	public class FAQmodel {
			    @Id
			    
			    @GeneratedValue(strategy = GenerationType.IDENTITY)
			    private Long id;

			    @Column(nullable = false)
			    private String question;

			    @Column(nullable = false)
			    private String answer;

				public Long getId() {
					return id;
				}

				public void setId(Long id) {
					this.id = id;
				}

				public String getQuestion() {
					return question;
				}

				public void setQuestion(String question) {
					this.question = question;
				}

				public String getAnswer() {
					return answer;
				}

				public void setAnswer(String answer) {
					this.answer = answer;
				}
			    
			    
			    
			}






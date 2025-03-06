import { useState } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission status

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // EmailJS send function
    emailjs
      .send(
        'service_gj9c6er', // service Id
        'template_m97wjka', // Template ID
        {
          name: data.name,
          email: data.email,
          phone: data.phone || 'Not provided', // Handle optional phone
          message: data.message,
        },
        '0uCvUgGf9P8-i0kWY' // Public key
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setIsSubmitted(true); 
          form.reset(); 
          
          setTimeout(() => setIsSubmitted(false), 15000);
        },
        (error) => {
          console.error('Email sending failed:', error.text);
          alert('Failed to send message. Please try again later.');
        }
      );
  };

  return (
    <div className="contact-container">
      {isSubmitted ? (
        <h2 className="submitted-heading">Submitted</h2>
      ) : (
        <h2>Contact Us</h2>
      )}
      {isSubmitted ? (
        <div className="success-message">
          <p>Message Submitted Successfully!</p>
          <p>Thank you for reaching out to us.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Optional"
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            required
          ></textarea>

          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
};

export default Contact;
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaCamera, FaVideo, FaAd } from 'react-icons/fa';
import './booking.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const services = [
    { id: 'photography', name: 'Photography', icon: <FaCamera />, description: 'Professional photo shoots' },
    { id: 'videography', name: 'Videography', icon: <FaVideo />, description: 'Video production & editing' },
    { id: 'advertising', name: 'Advertising', icon: <FaAd />, description: 'Marketing campaigns' }
  ];

  const budgetRanges = [
    { value: 'under-500', label: 'Under $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000-2500', label: '$1,000 - $2,500' },
    { value: '2500-5000', label: '$2,500 - $5,000' },
    { value: 'over-5000', label: 'Over $5,000' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.budget) newErrors.budget = 'Please select a budget range';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const testAPI = async () => {
    try {
      console.log('Testing API connection...');
      const testData = {
        name: 'Test User',
        email: 'test@test.com',
        phone: '1234567890',
        subject: 'Test Booking',
        message: 'This is a test booking',
        service: 'booking'
      };
      
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });
      
      const result = await response.json();
      console.log('Test API result:', result);
      alert('API test successful! Check console for details.');
    } catch (error) {
      console.error('API test failed:', error);
      alert('API test failed: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Prepare booking data for the contact API
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Booking Request - ${formData.service}`,
        message: `Service: ${formData.service}
Budget: ${formData.budget}
Preferred Date: ${formData.date}
Preferred Time: ${formData.time}
Project Details: ${formData.message}`,
        service: 'booking'
      };

      console.log('Sending booking data:', bookingData);

      // Test the API endpoint first
      console.log('Testing API endpoint...');
      
      // Send to backend contact API
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      }).catch(async (fetchError) => {
        console.error('Fetch error:', fetchError);
        // Fallback to direct backend URL if proxy fails
        console.log('Trying direct backend URL...');
        return await fetch('http://localhost:5001/api/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData)
        });
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Failed to submit booking: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      console.log('Booking submitted successfully:', result);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: '',
        budget: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Booking error:', error);
      alert(`Failed to submit booking: ${error.message}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <div className="booking-header text-center">
                <h1 className="booking-title">Book Your Session</h1>
                <p className="booking-subtitle">
                  Ready to bring your vision to life? Let's create something amazing together.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="booking-container">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            {showSuccess && (
              <Alert variant="success" className="booking-alert" onClose={() => setShowSuccess(false)} dismissible>
                <Alert.Heading>Booking Submitted Successfully!</Alert.Heading>
                <p>
                  Thank you for choosing NuunDigital! We've received your booking request and will contact you within 24 hours to confirm your session.
                </p>
              </Alert>
            )}

            <div className="booking-form-card">
              <Form onSubmit={handleSubmit} className="booking-form">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">
                        <FaUser className="form-icon" />
                        Full Name *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'is-invalid' : ''}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">
                        <FaEnvelope className="form-icon" />
                        Email Address *
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'is-invalid' : ''}
                        placeholder="Enter your email"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">
                        <FaPhone className="form-icon" />
                        Phone Number *
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'is-invalid' : ''}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">
                        <FaAd className="form-icon" />
                        Budget Range *
                      </Form.Label>
                      <Form.Select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={errors.budget ? 'is-invalid' : ''}
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map(range => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.budget && <div className="invalid-feedback">{errors.budget}</div>}
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label className="form-label">
                    <FaCamera className="form-icon" />
                    Service Type *
                  </Form.Label>
                  <div className="service-options">
                    {services.map(service => (
                      <div
                        key={service.id}
                        className={`service-option ${formData.service === service.id ? 'selected' : ''}`}
                        onClick={() => handleChange({ target: { name: 'service', value: service.id } })}
                      >
                        <div className="service-icon">{service.icon}</div>
                        <div className="service-details">
                          <h5>{service.name}</h5>
                          <p>{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.service && <div className="text-danger mt-2">{errors.service}</div>}
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">
                        <FaCalendarAlt className="form-icon" />
                        Preferred Date *
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={errors.date ? 'is-invalid' : ''}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">
                        <FaClock className="form-icon" />
                        Preferred Time *
                      </Form.Label>
                      <Form.Control
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={errors.time ? 'is-invalid' : ''}
                      />
                      {errors.time && <div className="invalid-feedback">{errors.time}</div>}
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label className="form-label">
                    Project Details
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, vision, or any specific requirements..."
                  />
                </Form.Group>

                <div className="booking-submit">
                  <Button
                    type="submit"
                    className="booking-btn"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      'Book Your Session'
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Booking;
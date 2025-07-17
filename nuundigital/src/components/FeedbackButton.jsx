import React, { useState } from "react";
import { MdFeedback } from "react-icons/md";

const FeedbackButton = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          service: 'feedback',
          source: 'feedback-form',
          subject: 'Website Feedback',
        })
      });
      const data = await res.json();
      if (data.success) {
        setResult({ success: true, message: 'Thank you for your feedback!' });
        setForm({ name: '', email: '', message: '' });
      } else {
        setResult({ success: false, message: data.message || 'Failed to send feedback.' });
      }
    } catch (err) {
      setResult({ success: false, message: 'Network error. Please try again.' });
    }
    setLoading(false);
  };

  return (
    <>
      <button className="feedback-float-btn" onClick={() => setOpen(true)} title="Give Feedback">
        <MdFeedback size={28} />
      </button>
      {open && (
        <div className="feedback-modal-overlay" onClick={() => setOpen(false)}>
          <div className="feedback-modal" onClick={e => e.stopPropagation()}>
            <button className="feedback-modal-close" onClick={() => setOpen(false)}>&times;</button>
            <h3 className="feedback-modal-title">We Value Your Feedback</h3>
            <form className="feedback-form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
              <textarea name="message" placeholder="Your Feedback" value={form.message} onChange={handleChange} required rows={4} />
              <button type="submit" className="feedback-submit-btn" disabled={loading}>{loading ? 'Sending...' : 'Submit'}</button>
            </form>
            {result && (
              <div className={result.success ? 'feedback-success' : 'feedback-error'} style={{marginTop: 10, textAlign: 'center'}}>
                {result.message}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton; 
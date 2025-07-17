// Analytics Tracking Script for Nuun Digital
class AnalyticsTracker {
  constructor() {
    this.apiBase = 'http://localhost:5001/api/analytics';
    this.sessionId = this.generateSessionId();
    this.currentPage = window.location.pathname;
  }

  // Generate a unique session ID
  generateSessionId() {
    let sessionId = localStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  // Track page view
  async trackPageView(page = null) {
    try {
      const pageToTrack = page || this.currentPage;
      
      const data = {
        page: pageToTrack,
        userAgent: navigator.userAgent,
        ipAddress: await this.getClientIP(),
        referrer: document.referrer,
        sessionId: this.sessionId
      };

      await fetch(`${this.apiBase}/track/pageview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  // Track contact form submission
  async trackContact(page = null) {
    try {
      const pageToTrack = page || this.currentPage;
      
      const data = {
        page: pageToTrack,
        userAgent: navigator.userAgent,
        ipAddress: await this.getClientIP(),
        referrer: document.referrer,
        sessionId: this.sessionId
      };

      await fetch(`${this.apiBase}/track/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Contact tracking error:', error);
    }
  }

  // Get client IP (this is a simplified version)
  async getClientIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'unknown';
    }
  }

  // Initialize tracking
  init() {
    // Track initial page view
    this.trackPageView();

    // Track page views on navigation (for SPA)
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        this.currentPage = window.location.pathname;
        this.trackPageView();
      }
    }).observe(document, { subtree: true, childList: true });

    // Track contact form submissions
    document.addEventListener('submit', (e) => {
      if (e.target.classList.contains('contact-form') || 
          e.target.action.includes('contact') ||
          e.target.querySelector('input[name="email"]')) {
        this.trackContact();
      }
    });

    // Track project views
    document.addEventListener('click', (e) => {
      if (e.target.closest('.project-card') || e.target.closest('.project-link')) {
        const projectElement = e.target.closest('.project-card') || e.target.closest('.project-link');
        if (projectElement) {
          const projectTitle = projectElement.querySelector('h3, .project-title')?.textContent || 'Unknown Project';
          this.trackProjectView(projectTitle);
        }
      }
    });

    // Track blog views
    document.addEventListener('click', (e) => {
      if (e.target.closest('.blog-card') || e.target.closest('.blog-link')) {
        const blogElement = e.target.closest('.blog-card') || e.target.closest('.blog-link');
        if (blogElement) {
          const blogTitle = blogElement.querySelector('h3, .blog-title')?.textContent || 'Unknown Blog';
          this.trackBlogView(blogTitle);
        }
      }
    });
  }

  // Track project view
  async trackProjectView(projectTitle) {
    try {
      const data = {
        page: this.currentPage,
        userAgent: navigator.userAgent,
        ipAddress: await this.getClientIP(),
        referrer: document.referrer,
        sessionId: this.sessionId,
        metadata: {
          projectTitle,
          type: 'project_view'
        }
      };

      await fetch(`${this.apiBase}/track/pageview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Project view tracking error:', error);
    }
  }

  // Track blog view
  async trackBlogView(blogTitle) {
    try {
      const data = {
        page: this.currentPage,
        userAgent: navigator.userAgent,
        ipAddress: await this.getClientIP(),
        referrer: document.referrer,
        sessionId: this.sessionId,
        metadata: {
          blogTitle,
          type: 'blog_view'
        }
      };

      await fetch(`${this.apiBase}/track/pageview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Blog view tracking error:', error);
    }
  }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.analytics = new AnalyticsTracker();
  window.analytics.init();
});

// Export for use in other modules
export default AnalyticsTracker; 
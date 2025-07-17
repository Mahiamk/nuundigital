import React, { useState, useEffect } from 'react';
import { 
  MdDashboard, 
  MdWork, 
  MdContactMail, 
  MdArticle, 
  MdAnalytics, 
  MdSettings,
  MdAdd,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdVisibilityOff,
  MdStar,
  MdStarBorder,
  MdTrendingUp,
  MdPeople,
  MdEmail,
  MdPhone,
  MdCalendarToday,
  MdRefresh,
  MdDownload,
  MdSearch,
  MdFilterList,
  MdMoreVert,
  MdArrowForward
} from 'react-icons/md';
import Modal from './components/Modal.jsx';
import ProjectForm from './components/ProjectForm.jsx';
import './dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingContact, setViewingContact] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [replyForm, setReplyForm] = useState({ subject: '', message: '' });
  const [isSendingReply, setIsSendingReply] = useState(false);

  const API_BASE = 'http://localhost:5001/api';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      console.log('Admin token available:', !!token);
      if (!token) {
        console.error('No admin token found in localStorage');
        setError('Authentication required. Please log in again.');
        return;
      }
      
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch dashboard stats
      const statsResponse = await fetch(`${API_BASE}/dashboard/stats`, { headers });
      const statsData = await statsResponse.json();
      
      if (statsData.success) {
        setStats(statsData.data);
      }

      // Fetch projects
      const projectsResponse = await fetch(`${API_BASE}/projects`, { headers });
      const projectsData = await projectsResponse.json();
      
      if (projectsData.success) {
        setProjects(projectsData.data.projects || []);
      }

      // Fetch contacts
      const contactsResponse = await fetch(`${API_BASE}/contacts`, { headers });
      const contactsData = await contactsResponse.json();
      
      if (contactsData.success) {
        setContacts(contactsData.data.contacts || []);
      }

      // Fetch blogs
      const blogsResponse = await fetch(`${API_BASE}/blogs`, { headers });
      const blogsData = await blogsResponse.json();
      
      if (blogsData.success) {
        setBlogs(blogsData.data.blogs || []);
      }

      // Fetch analytics
      const analyticsResponse = await fetch(`${API_BASE}/analytics/overview`, { headers });
      const analyticsData = await analyticsResponse.json();
      
      if (analyticsData.success) {
        setAnalytics(analyticsData.data);
      }

    } catch (error) {
      console.error('Dashboard fetch error:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowProjectModal(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const handleProjectSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      if (editingProject) {
        // Update project
        const response = await fetch(`${API_BASE}/projects/${editingProject._id}`, {
          method: 'PUT',
          headers,
          body: formData
        });
        
        if (response.ok) {
          setShowProjectModal(false);
          fetchDashboardData(); // Refresh data
        }
      } else {
        // Create new project
        const response = await fetch(`${API_BASE}/projects`, {
          method: 'POST',
          headers,
          body: formData
        });
        
        if (response.ok) {
          setShowProjectModal(false);
          fetchDashboardData(); // Refresh data
        }
      }
    } catch (error) {
      console.error('Project submission error:', error);
    }
  };

  const handleContactStatusUpdate = async (contactId, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/contacts/${contactId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Contact status update error:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE}/projects/${projectId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          fetchDashboardData(); // Refresh data
        } else {
          console.error('Failed to delete project');
        }
      } catch (error) {
        console.error('Delete project error:', error);
      }
    }
  };

  const handleContactExport = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/contacts/export/csv`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contacts.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Contact export error:', error);
    }
  };

  const handleViewContact = (contact) => {
    console.log('Opening contact modal for:', contact);
    setViewingContact(contact);
    setShowContactModal(true);
    // Pre-fill reply form with subject
    setReplyForm({
      subject: `Re: ${contact.subject || 'Contact Form Submission'}`,
      message: ''
    });
  };

  const handleReplyInputChange = (e) => {
    const { name, value } = e.target;
    setReplyForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!viewingContact) return;

    setIsSendingReply(true);
    try {
      // Mark contact as replied in backend
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      console.log('Sending reply for contact:', viewingContact._id);
      console.log('Reply message:', replyForm.message);
      console.log('API URL:', `${API_BASE}/contacts/${viewingContact._id}/replied`);
      
      const response = await fetch(`${API_BASE}/contacts/${viewingContact._id}/replied`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ replyMessage: replyForm.message })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.error('Could not parse error response:', parseError);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Reply saved successfully:', result);

      // Update local contact status
      setViewingContact(prev => ({
        ...prev,
        status: 'replied'
      }));

      // Reset form and show success message
      setReplyForm({ subject: '', message: '' });
      alert('Reply saved successfully! The contact has been marked as replied.');
      
      // Close modal and refresh contacts data
      setShowContactModal(false);
      fetchDashboardData();
      
    } catch (error) {
      console.error('Error saving reply:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('Network error: Unable to connect to the server. Please check your internet connection and try again.');
      } else {
        alert(`Failed to save reply: ${error.message}`);
      }
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact/feedback? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE}/contacts/${contactId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          fetchDashboardData(); // Refresh data
        } else {
          console.error('Failed to delete contact/feedback');
        }
      } catch (error) {
        console.error('Delete contact/feedback error:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'published':
      case 'read':
        return 'green';
      case 'draft':
      case 'new':
        return 'orange';
      case 'inactive':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getPriorityColor = (priority) => {
    return priority === 'urgent' ? 'red' : 'blue';
  };

  // Add FeedbackTab component
  const FeedbackTab = ({ contacts, onStatusUpdate, onDelete, onReply, onView }) => {
    const feedbacks = contacts.filter(c => c.service === 'feedback');
    const [expandedId, setExpandedId] = useState(null);

    const getInitials = (name) => {
      if (!name) return '?';
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const now = new Date();
      const diff = Math.floor((now - date) / 1000);
      if (diff < 60) return 'Just now';
      if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
      return date.toLocaleString();
    };

    return (
      <div className="dashboard-tab-content feedback-cards-container">
        <h2>Feedback</h2>
        {feedbacks.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          <div className="feedback-cards-grid">
            {feedbacks.map(feedback => (
              <div
                key={feedback._id}
                className={`feedback-card${feedback.status !== 'read' ? ' unread' : ''}`}
              >
                <div className="feedback-card-header">
                  <div className="avatar-circle">{getInitials(feedback.name)}</div>
                  <div className="feedback-card-meta">
                    <div className="feedback-card-name">{feedback.name}</div>
                    <div className="feedback-card-email">{feedback.email}</div>
                  </div>
                  <div className="feedback-card-date">{formatDate(feedback.createdAt)}</div>
                  {feedback.status !== 'read' && <span className="badge-unread">Unread</span>}
                </div>
                <div className="feedback-card-message-preview">
                  {feedback.message.length > 120 && expandedId !== feedback._id
                    ? feedback.message.slice(0, 120) + '...'
                    : feedback.message}
                  {feedback.message.length > 120 && (
                    <button
                      className="expand-btn"
                      onClick={() => setExpandedId(expandedId === feedback._id ? null : feedback._id)}
                    >
                      {expandedId === feedback._id ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
                {expandedId === feedback._id && (
                  <div className="feedback-card-details">
                    <strong>Full Message:</strong>
                    <div className="message-content">{feedback.message}</div>
                  </div>
                )}
                <div className="feedback-card-actions">
                  <button title="Mark as Read" className="action-btn" onClick={() => onStatusUpdate(feedback._id, 'read')}><MdVisibility /></button>
                  <button title="Reply" className="action-btn" onClick={() => onReply(feedback)}><MdEmail /></button>
                  <button title="Delete" className="action-btn delete" onClick={() => onDelete(feedback._id)}><MdDelete /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={fetchDashboardData} className="retry-btn">
          <MdRefresh /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <button onClick={fetchDashboardData} className="refresh-btn">
            <MdRefresh /> Refresh
          </button>
          <button 
            onClick={() => {
              const token = localStorage.getItem('adminToken');
              console.log('Current token:', token ? 'Available' : 'Not found');
              alert(token ? 'Token is available' : 'No token found');
            }} 
            className="refresh-btn"
            style={{ marginLeft: '10px' }}
          >
            Test Auth
          </button>
          <button 
            onClick={async () => {
              try {
                const response = await fetch(`${API_BASE}/health`);
                const data = await response.json();
                alert(`Backend connection: ${data.success ? 'OK' : 'Failed'}`);
              } catch (error) {
                alert(`Backend connection failed: ${error.message}`);
              }
            }} 
            className="refresh-btn"
            style={{ marginLeft: '10px' }}
          >
            Test Connection
          </button>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="dashboard-topnav">
        <ul>
          <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => handleTabChange('overview')}><MdDashboard /> Overview</li>
          <li className={activeTab === 'projects' ? 'active' : ''} onClick={() => handleTabChange('projects')}><MdWork /> Projects</li>
          <li className={activeTab === 'contacts' ? 'active' : ''} onClick={() => handleTabChange('contacts')}><MdContactMail /> Contacts</li>
          <li className={activeTab === 'feedback' ? 'active' : ''} onClick={() => handleTabChange('feedback')}><MdEmail /> Feedback</li>
          <li className={activeTab === 'blogs' ? 'active' : ''} onClick={() => handleTabChange('blogs')}><MdArticle /> Blogs</li>
          <li className={activeTab === 'analytics' ? 'active' : ''} onClick={() => handleTabChange('analytics')}><MdAnalytics /> Analytics</li>
          <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => handleTabChange('settings')}><MdSettings /> Settings</li>
        </ul>
      </nav>

      {/* Content Area */}
      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <OverviewTab stats={stats} analytics={analytics} onTabChange={handleTabChange} />
        )}
        {activeTab === 'projects' && (
          <ProjectsTab 
            projects={projects} 
            searchTerm={searchTerm}
            onSearch={handleSearch}
            filter={filter}
            onFilter={handleFilter}
            onAddProject={handleAddProject}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
          />
        )}
        {activeTab === 'contacts' && (
          <ContactsTab 
            contacts={contacts}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            filter={filter}
            onFilter={handleFilter}
            onExport={handleContactExport}
            onViewContact={handleViewContact}
          />
        )}
        {activeTab === 'feedback' && (
          <FeedbackTab contacts={contacts} onStatusUpdate={handleContactStatusUpdate} onDelete={handleDeleteContact} onReply={handleViewContact} onView={handleViewContact} />
        )}
        {activeTab === 'blogs' && (
          <BlogsTab 
            blogs={blogs}
            searchTerm={searchTerm}
            onSearch={handleSearch}
            filter={filter}
            onFilter={handleFilter}
          />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsTab analytics={analytics} />
        )}
        {activeTab === 'settings' && (
          <SettingsTab />
        )}
      </div>

      {/* Project Modal */}
      <Modal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        title={editingProject ? 'Edit Project' : 'Add New Project'}
        size="large"
      >
        <ProjectForm
          project={editingProject}
          onSubmit={handleProjectSubmit}
          onCancel={() => setShowProjectModal(false)}
        />
      </Modal>
      {/* Contact Modal */}
      <Modal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Contact Details"
        size="large"
      >
        {viewingContact && (
          <div className="contact-modal-content">
            <div className="contact-details">
              <h3>Contact Information</h3>
              <div className="contact-info-grid">
                <div className="info-item">
                  <strong>Name:</strong> {viewingContact.name}
                </div>
                <div className="info-item">
                  <strong>Email:</strong> {viewingContact.email}
                </div>
                <div className="info-item">
                  <strong>Phone:</strong> {viewingContact.phone || 'N/A'}
                </div>
                <div className="info-item">
                  <strong>Status:</strong> 
                  <span className={`status-badge ${viewingContact.status}`}>
                    {viewingContact.status}
                  </span>
                </div>
                <div className="info-item">
                  <strong>Priority:</strong> 
                  <span className={`priority-badge ${viewingContact.priority}`}>
                    {viewingContact.priority}
                  </span>
                </div>
                <div className="info-item">
                  <strong>Date:</strong> {new Date(viewingContact.createdAt).toLocaleString()}
                </div>
              </div>
              
              <div className="original-message">
                <h4>Original Message:</h4>
                <div className="message-content">
                  {viewingContact.message}
                </div>
              </div>
            </div>
            
            <div className="reply-section">
              <h3>Reply to {viewingContact.name}</h3>
              <form onSubmit={handleReplySubmit} className="reply-form">
                <div className="form-group">
                  <label htmlFor="replySubject">Subject:</label>
                  <input
                    type="text"
                    id="replySubject"
                    name="subject"
                    value={replyForm.subject}
                    onChange={handleReplyInputChange}
                    placeholder="Re: Contact Form Submission"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="replyMessage">Message:</label>
                  <textarea
                    id="replyMessage"
                    name="message"
                    value={replyForm.message}
                    onChange={handleReplyInputChange}
                    placeholder="Type your reply message here..."
                    rows="6"
                    required
                  />
                </div>
                <div className="form-actions">
                                    <button type="submit" className="btn btn-primary" disabled={isSendingReply}>
                     {isSendingReply ? 'Saving...' : 'Save Reply'}
                   </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowContactModal(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ stats, analytics, onTabChange }) => {
  if (!stats) return <div>No data available</div>;

  return (
    <div className="overview-tab">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card clickable" onClick={() => onTabChange('projects')} title="Click to view Projects">
          <div className="stat-icon">
            <MdWork />
          </div>
          <div className="stat-content">
            <h3>{stats.overview?.totalProjects || 0}</h3>
            <p>Total Projects</p>
            <span className="click-hint">Click to view</span>
          </div>
          <div className="stat-arrow">
            <MdArrowForward />
          </div>
        </div>

        <div className="stat-card clickable" onClick={() => onTabChange('contacts')} title="Click to view Contacts">
          <div className="stat-icon">
            <MdContactMail />
          </div>
          <div className="stat-content">
            <h3>{stats.overview?.totalContacts || 0}</h3>
            <p>Total Contacts</p>
            <span className="click-hint">Click to view</span>
          </div>
          <div className="stat-arrow">
            <MdArrowForward />
          </div>
        </div>

        <div className="stat-card clickable" onClick={() => onTabChange('blogs')} title="Click to view Blogs">
          <div className="stat-icon">
            <MdArticle />
          </div>
          <div className="stat-content">
            <h3>{stats.overview?.totalBlogs || 0}</h3>
            <p>Total Blogs</p>
            <span className="click-hint">Click to view</span>
          </div>
          <div className="stat-arrow">
            <MdArrowForward />
          </div>
        </div>

        <div className="stat-card clickable" onClick={() => onTabChange('analytics')} title="Click to view Analytics">
          <div className="stat-icon">
            <MdTrendingUp />
          </div>
          <div className="stat-content">
            <h3>{analytics?.overview?.todayPageViews || 0}</h3>
            <p>Today's Views</p>
            <span className="click-hint">Click to view</span>
          </div>
          <div className="stat-arrow">
            <MdArrowForward />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        
        <div className="activity-grid">
          <div className="activity-section">
            <h3>Recent Projects</h3>
            <div className="activity-list">
              {stats.recent?.projects?.map((project, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    <MdWork />
                  </div>
                  <div className="activity-content">
                    <p className="activity-title">{project.title}</p>
                    <p className="activity-meta">{project.category} • {project.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="activity-section">
            <h3>Recent Contacts</h3>
            <div className="activity-list">
              {stats.recent?.contacts?.map((contact, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    <MdContactMail />
                  </div>
                  <div className="activity-content">
                    <p className="activity-title">{contact.name}</p>
                    <p className="activity-meta">{contact.subject} • {contact.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Projects Tab Component
const ProjectsTab = ({ projects, searchTerm, onSearch, filter, onFilter, onAddProject, onEditProject, onDeleteProject }) => {
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || project.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="projects-tab">
      <div className="tab-header">
        <h2>Projects Management</h2>
        <button className="add-btn" onClick={onAddProject}>
          <MdAdd /> Add Project
        </button>
      </div>

      <div className="tab-controls">
        <div className="search-box">
          <MdSearch />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={onSearch}
          />
        </div>

        <div className="filter-controls">
          <select value={filter} onChange={(e) => onFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project._id} className="project-card">
            <div className="project-image">
              {project.featuredImage ? (
                <img src={`http://localhost:5001${project.featuredImage}`} alt={project.title} />
              ) : (
                <div className="no-image">No Image</div>
              )}
                             <div className="project-actions">
                 <button className="action-btn" onClick={() => onEditProject(project)}>
                   <MdEdit />
                 </button>
                 <button className="action-btn" onClick={() => onDeleteProject(project._id)}>
                   <MdDelete />
                 </button>
               </div>
            </div>
            
            <div className="project-content">
              <div className="project-header">
                <h3>{project.title}</h3>
                <div className="project-badges">
                  <span className={`status-badge ${project.status}`}>
                    {project.status}
                  </span>
                  {project.featured && (
                    <span className="featured-badge">
                      <MdStar />
                    </span>
                  )}
                </div>
              </div>
              
              <p className="project-description">
                {project.description?.substring(0, 100)}...
              </p>
              
              <div className="project-meta">
                <span className="category">{project.category}</span>
                <span className="date">
                  <MdCalendarToday />
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contacts Tab Component
const ContactsTab = ({ contacts, searchTerm, onSearch, filter, onFilter, onExport, onViewContact }) => {
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || contact.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="contacts-tab">
      <div className="tab-header">
        <h2>Contact Management</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="export-btn" onClick={onExport}>
            <MdDownload /> Export
          </button>
                      <button 
              className="export-btn" 
              onClick={() => {
                console.log('Testing contact modal');
                const testContact = {
                  _id: 'test-id',
                  name: 'Test User',
                  email: 'test@example.com',
                  subject: 'Test Subject',
                  message: 'Test message',
                  status: 'new',
                  priority: 'medium',
                  createdAt: new Date().toISOString()
                };
                onViewContact(testContact);
              }}
            >
              Test Modal
            </button>
            <button 
              className="export-btn" 
              onClick={async () => {
                try {
                  const token = localStorage.getItem('adminToken');
                  if (!token) {
                    alert('No token found. Please log in first.');
                    return;
                  }
                  
                  const response = await fetch(`${API_BASE}/contacts/68732881b8a12c04d31e4435/replied`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ replyMessage: 'Test reply from frontend' })
                  });
                  
                  if (response.ok) {
                    alert('Reply test successful!');
                  } else {
                    const error = await response.json();
                    alert(`Reply test failed: ${error.message}`);
                  }
                } catch (error) {
                  alert(`Reply test error: ${error.message}`);
                }
              }}
            >
              Test Reply
            </button>
        </div>
      </div>

      <div className="tab-controls">
        <div className="search-box">
          <MdSearch />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={onSearch}
          />
        </div>

        <div className="filter-controls">
          <select value={filter} onChange={(e) => onFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      <div className="contacts-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact._id}>
                <td>
                  <div className="contact-info">
                    <strong>{contact.name}</strong>
                    {contact.phone && (
                      <span className="phone">
                        <MdPhone /> {contact.phone}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <span className="email">
                    <MdEmail /> {contact.email}
                  </span>
                </td>
                <td>{contact.subject}</td>
                <td>
                  <span className={`status-badge ${contact.status}`}>
                    {contact.status}
                  </span>
                </td>
                <td>
                  <span className={`priority-badge ${contact.priority}`}>
                    {contact.priority}
                  </span>
                </td>
                <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn" onClick={() => onViewContact(contact)}>
                      <MdVisibility />
                    </button>
                    <button className="action-btn">
                      <MdEdit />
                    </button>
                    <button className="action-btn">
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Blogs Tab Component
const BlogsTab = ({ blogs, searchTerm, onSearch, filter, onFilter }) => {
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || blog.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="blogs-tab">
      <div className="tab-header">
        <h2>Blog Management</h2>
        <button className="add-btn">
          <MdAdd /> Add Blog
        </button>
      </div>

      <div className="tab-controls">
        <div className="search-box">
          <MdSearch />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={onSearch}
          />
        </div>

        <div className="filter-controls">
          <select value={filter} onChange={(e) => onFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="blogs-grid">
        {filteredBlogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <div className="blog-image">
              {blog.featuredImage ? (
                <img src={`http://localhost:5001${blog.featuredImage}`} alt={blog.title} />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <div className="blog-actions">
                <button className="action-btn">
                  <MdEdit />
                </button>
                <button className="action-btn">
                  <MdDelete />
                </button>
              </div>
            </div>
            
            <div className="blog-content">
              <div className="blog-header">
                <h3>{blog.title}</h3>
                <div className="blog-badges">
                  <span className={`status-badge ${blog.status}`}>
                    {blog.status}
                  </span>
                  <span className="views-badge">
                    <MdVisibility /> {blog.views || 0}
                  </span>
                </div>
              </div>
              
              <p className="blog-excerpt">
                {blog.excerpt?.substring(0, 150)}...
              </p>
              
              <div className="blog-meta">
                <span className="category">{blog.category}</span>
                <span className="date">
                  <MdCalendarToday />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Analytics Tab Component
const AnalyticsTab = ({ analytics }) => {
  if (!analytics) return <div>No analytics data available</div>;

  return (
    <div className="analytics-tab">
      <h2>Website Analytics</h2>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Page Views</h3>
          <div className="analytics-stats">
            <div className="stat">
              <span className="stat-number">{analytics.overview?.totalPageViews || 0}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat">
              <span className="stat-number">{analytics.overview?.todayPageViews || 0}</span>
              <span className="stat-label">Today</span>
            </div>
            <div className="stat">
              <span className="stat-number">{analytics.overview?.weekPageViews || 0}</span>
              <span className="stat-label">This Week</span>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Contact Submissions</h3>
          <div className="analytics-stats">
            <div className="stat">
              <span className="stat-number">{analytics.overview?.totalContacts || 0}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat">
              <span className="stat-number">{analytics.overview?.todayContacts || 0}</span>
              <span className="stat-label">Today</span>
            </div>
            <div className="stat">
              <span className="stat-number">{analytics.overview?.weekContacts || 0}</span>
              <span className="stat-label">This Week</span>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Unique Visitors</h3>
          <div className="analytics-stats">
            <div className="stat">
              <span className="stat-number">{analytics.overview?.uniqueVisitors || 0}</span>
              <span className="stat-label">Today</span>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-sections">
        <div className="analytics-section">
          <h3>Top Pages</h3>
          <div className="top-pages">
            {analytics.topPages?.map((page, index) => (
              <div key={index} className="page-item">
                <span className="page-name">{page._id}</span>
                <span className="page-views">{page.count} views</span>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-section">
          <h3>Traffic Sources</h3>
          <div className="traffic-sources">
            {analytics.trafficSources?.map((source, index) => (
              <div key={index} className="source-item">
                <span className="source-name">{source._id}</span>
                <span className="source-count">{source.count} visits</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings Tab Component
const SettingsTab = () => {
  return (
    <div className="settings-tab">
      <h2>Settings</h2>
      <p>Settings configuration will be implemented here.</p>
    </div>
  );
};

export default Dashboard;
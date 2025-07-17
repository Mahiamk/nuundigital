import React, { useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';

const ProjectForm = ({ project = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    category: project?.category || '',
    client: project?.client || '',
    technologies: project?.technologies?.join(', ') || '',
    projectUrl: project?.projectUrl || '',
    githubUrl: project?.githubUrl || '',
    featured: project?.featured || false,
    status: project?.status || 'draft'
  });

  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(project?.featuredImage || null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        if (key === 'technologies') {
          formDataToSend.append(key, JSON.stringify(formData[key].split(',').map(tech => tech.trim())));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add image if selected
      if (featuredImage) {
        formDataToSend.append('featuredImage', featuredImage);
      }

      await onSubmit(formDataToSend);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Project Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-input"
            required
            placeholder="Enter project title"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">Select category</option>
            <option value="web-development">Web Development</option>
            <option value="ui-ux-design">UI/UX Design</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="print-design">Print Design</option>
            <option value="video-production">Video Production</option>
            <option value="wedding">Wedding</option>
            <option value="advertising">Advertising</option>
            <option value="print">Print</option>
            <option value="digital">Digital</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="form-textarea"
          required
          placeholder="Enter project description"
          rows="4"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Client</label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter client name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Technologies</label>
        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleInputChange}
          className="form-input"
          placeholder="React, Node.js, MongoDB (comma separated)"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Project URL</label>
          <input
            type="url"
            name="projectUrl"
            value={formData.projectUrl}
            onChange={handleInputChange}
            className="form-input"
            placeholder="https://example.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label">GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleInputChange}
            className="form-input"
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Featured Image</label>
        <div className="file-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="featured-image"
          />
          <label htmlFor="featured-image" className="file-upload-label">
            <MdCloudUpload />
            {imagePreview ? 'Change Image' : 'Choose Image'}
          </label>
        </div>
        {imagePreview && (
          <div className="file-preview">
            <img 
              src={imagePreview} 
              alt="Preview" 
              style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
        )}
      </div>

      <div className="form-group">
        <div className="form-checkbox">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
            id="featured"
          />
          <label htmlFor="featured">Featured Project</label>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm; 
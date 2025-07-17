import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  content: {
    type: String,
    required: [true, 'Blog content is required'],
    trim: true
  },
  excerpt: {
    type: String,
    trim: true,
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  featuredImage: {
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    caption: {
      type: String,
      default: ''
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['wedding', 'advertising', 'design', 'tips', 'news', 'other'],
    default: 'other'
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  readTime: {
    type: Number,
    default: 0
  },
  seo: {
    metaTitle: {
      type: String,
      maxlength: [60, 'Meta title cannot exceed 60 characters']
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description cannot exceed 160 characters']
    },
    keywords: [{
      type: String,
      trim: true
    }],
    ogImage: {
      type: String
    }
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Generate slug from title
blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  
  // Calculate read time (average 200 words per minute)
  if (this.isModified('content')) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / 200);
  }
  
  next();
});

// Index for better search performance
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1, featured: 1 });

export default mongoose.model('Blog', blogSchema); 
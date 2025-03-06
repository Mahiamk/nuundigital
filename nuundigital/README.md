# NuunDigital Solution

Welcome to NuunDigital Solution, your one-stop solution for professional photography, decoration, banner design & printing, web development, and advertising services. This project showcases our portfolio, client testimonials, and various services we offer.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Introduction

NuunDigital Solution is a dynamic and forward-thinking company that connects innovation with success. We specialize in creative design, advanced technology, and strategic marketing to help businesses thrive in the digital era. Our mission is to bridge the gap between brands and their audiences by delivering high-quality digital experiences that inspire, engage, and drive growth.

## Features

- **Responsive Design**: The website is fully responsive and works seamlessly on all devices.
- **Interactive Components**: Includes interactive components like image carousels, modals, and forms.
- **Client Testimonials**: Showcases testimonials from our satisfied clients.
- **Service Portfolio**: Displays our portfolio of services including photography, video editing, and more.
- **Contact Form**: Allows users to get in touch with us easily.
- **Social Media Integration**: Links to our social media profiles for easy connection.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Bootstrap**: Bootstrap components built with React.
- **React Router**: Declarative routing for React applications.
- **EmailJS**: Service to send emails directly from the client-side.
- **CSS**: Styling the components and layout.
- **Google Maps**: Embedded Google Maps for location display.

# Tree-Structure
```
.
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   ├── speed.mp3
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── Log
│   │   └── signin.jsx
│   ├── Test
│   │   └── Type.jsx
│   ├── UI
│   │   └── style.css
│   ├── admin
│   │   ├── CMS.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── auth.jsx
│   │   ├── dashboard.jsx
│   │   ├── dashbord.jsx
│   │   └── login.jsx
│   ├── api.js
│   ├── backend
│   │   └── backendapi.jsx
│   ├── components
│   │   ├── About
│   │   │   ├── AC.css
│   │   │   ├── About.jsx
│   │   │   ├── AboutCard.jsx
│   │   │   ├── Map.css
│   │   │   └── Map.jsx
│   │   ├── Blogs
│   │   │   └── Blogs.jsx
│   │   ├── Contact
│   │   │   ├── Contact.css
│   │   │   └── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Home
│   │   │   ├── Advert.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Home2.jsx
│   │   │   ├── Testimonial.jsx
│   │   │   ├── Type.jsx
│   │   │   ├── advertgallery.css
│   │   │   ├── home2.css
│   │   │   └── testimonial.css
│   │   ├── Navbar.jsx
│   │   ├── Particle.jsx
│   │   ├── Pre.jsx
│   │   └── Projects
│   │       ├── Print.jsx
│   │       ├── ProjectCards.jsx
│   │       ├── Projects.jsx
│   │       ├── advert.jsx
│   │       └── wedding.jsx
│   ├── index.css
│   └── main.jsx
└── vite.config.js
```

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Mahiamk/nuundigital.git
    cd nuundigital
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create a [.env](http://_vscodecontentref_/0) file** in the `src/backend` directory and add your MongoDB URI and JWT secret:
    ```properties
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&ssl=true
    JWT_SECRET=your_secret_key
    ```

4. **Start the development server**:
    ```bash
    npm start
    ```

## Usage

Once the development server is running, you can access the website at `http://localhost:3000`. Explore the various sections including the homepage, about us, projects, and contact form.

## Components

### Home.jsx

Displays the main landing section with a welcoming message and background image.

### Home2.jsx

Provides additional information about the company, including a media grid and social links.

### Navbar.jsx

Contains the navigation bar with links to different sections of the website.

### Footer.jsx

Displays the footer with social media links and copyright information.

### Contact.jsx

Includes a contact form for users to get in touch with us using EmailJS.

### Testimonial.jsx

Showcases client testimonials with images and reviews.

### Advert.jsx

Displays an advertisement gallery with an image carousel and modal functionality.

### Map.jsx

Embeds a Google Map showing the location of NuunDigital Solution.

## Contributing

We welcome contributions to improve this project. To contribute, follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Make your changes**.
4. **Commit your changes**:
    ```bash
    git commit -m "Add your detailed commit message here"
    ```
5. **Push to the branch**:
    ```bash
    git push origin feature/your-feature-name
    ```
6. **Create a pull request**.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Thank you for using NuunDigital Solution! If you have any questions or feedback, feel free to contact us.
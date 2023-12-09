# Blood Donation Application

## Table of Contents
1. [Introduction](#introduction)
2. [User Roles and Permissions](#user-roles-and-permissions)
3. [User Authentication](#user-authentication)
4. [Dashboard](#dashboard)
    - [Donor Dashboard](#donor-dashboard)
    - [Admin Dashboard](#admin-dashboard)
    - [Volunteer Dashboard](#volunteer-dashboard)
5. [Home Page](#home-page)
6. [Search Page](#search-page)
7. [Blood Donation Requests](#blood-donation-requests)
8. [Blood Donation Details Page](#blood-donation-details-page)
9. [Blog Page](#blog-page)
10. [Bonus Section](#bonus-section)
11. [Responsive](#responsive)
12. [JWT](#jwt)
13. [Resources](#resources)
14. [Guidelines](#guidelines)
15. [What to Submit](#what-to-submit)

## Introduction
### 1.1 Purpose
The Blood Donation Application aims to create a user-friendly platform facilitating blood donation activities, connecting donors with those in need of blood.

### 1.2 Scope
Built using the MERN stack (MongoDB, Express.js, React, Node.js), the application includes features for user registration, blood donation requests, donor management, content management, and role-based access control.

## User Roles and Permissions
### 2.1 Role Management
- **Admin 🌐**: Has access to all features.
- **Donor🩸**: Can register, view and respond to donation requests, maintain their profile.
- **Volunteer 🤝**: Can create and manage donation requests.

### 3. User Authentication (public)
#### 3.1 Registration
- Registration page with input fields: email, name, avatar, blood group, district, upazila, password, confirm_password.
- Default user role is "donor," with a default status of "active."

#### 3.2 Login
- Login page for registered users.

## Dashboard (private🔒)
### 4. Dashboard Layout
- Sidebar layout for all user roles.

### 4.1 Donor Dashboard
- Dashboard Home page displaying welcome message and 3 recent donation requests.
- My Donation Requests Page with pagination and filtering options.
- Create Donation Request Page with form for donation request creation.

### 4.2 Admin Dashboard
- Dashboard Home page with featured cards showing statistics.
- All Users Page with user data in tabular format.
- All Blood Donation Request Page with features similar to the Donor Dashboard.

### 4.3 Volunteer Dashboard
- Dashboard Home Page and All Blood Donation Request Page with limited permissions.

## Home Page (public)
- Navbar with links for registration, login, and dashboard.
- Banner with "Join as a donor" and "Search Donors" buttons.
- Featured section.
- Contact Us section with a contact form and contact number.
- Footer with useful links.

## Search page (public)
- Search form with input fields for blood group, district, upazila, email, and search button.
- Display donor list based on search criteria.

## Blood Donation requests (public)
- Display all pending donation requests with requester name, location, date, time, and view button.

## Blood Donation Details Page (private🔒)
- Display all information provided during the creation of a donation request.
- Donate button opening a modal with a form for donation confirmation.

## Blog Page (public)
- Display all published blogs.


## Responsive
- Ensure responsiveness throughout the website, including the dashboard.

## JWT
- Implement JWT on login, store the token, and protect private APIs.

## Resources
- Use [this GitHub repository](https://github.com/nuhil/bangladesh-geocode) for districts and upazilas data.

## Guidelines
- Spend 15-20 minutes deciding on the core features.
- Start with a basic idea and progressively add more features.
- Prioritize user experience, data security, and seamless payment integration.
- Use ChatGPT for generating sample data initially and adapt as needed.
- Regularly commit and update the readme as you progress.

## code details

1. **Admin email:** [aamirhossain2002@gmail.com]
2. **Admin password:** [amir123]
3. **Front-end Live Site Link:** [https://blood-donation-auth-adf7b.web.app/]
4. **Client Side GitHub Repository Link:** [[Your client-side repository link](https://github.com/amir811537/blood-donation-clientside)]
5. **Server Side GitHub Repository Link:** [[Your server-side repository link](https://github.com/amir811537/blood-donation-serverside)https://github.com/amir811537/blood-donation-serverside]

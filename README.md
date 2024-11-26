# Hotjar-platform


Hotjar :  Survey Platform  (I am still working on the project....)

Overview
--------

This project is a comprehensive survey platform tailored specifically for Avito. It enables administrators to create, manage, and deploy surveys that integrate seamlessly with both web and mobile applications. Through this platform, admins can design and configure surveys that clients use to provide valuable feedback about their experiences with Avito. Clients can report any issues or problems they encounter on the Avito platform, providing Avito with critical insights to address and enhance its services. The system includes a variety of components for survey design, management of survey templates, and detailed analysis of responses.

Features
--------

1. Create surveys with multiple components (text input, NPS, radio button, multi-select, CTA).
2. Deploy surveys on web and mobile applications.
3. Manage survey templates.
5. View and analyze survey responses.
5. User authentication for restricted access.
6. Integration with an analytics platform like Looker Studio for data visualization.

Technologies Used
-----------------

* Frontend: Next.js, React

* Backend: Node.js, Express

* Database: MongoDB

* Authentication: JWT

* Email Service: Mailtrap

Getting Started
---------------

Follow these instructions to set up and run the project on your local machine.

Installation
-----------------

1. Clone the repository:


            git clone git@github.com:SouchenOu/Hotjar-platform.git
            cd hotjar-survey-platform

2. Install dependencies for both client and server:


            # Install server dependencies
            cd serverSide
            npm install

            # Install client dependencies
            cd ../clientSide
            npm install

3. Set up environment variables:

Create a .env file in the root of your server directory and add the following:

        MONGO_URI=mongodb+srv://soukainaouchen:souchenavito@cluster0.vatqxqg.mongodb.net/Hotjar_app?retryWrites=true&w=majority&appName=Cluster0

Running the Server
------------------

1. Start the server:


            cd serverSide
            npm run start

    The server will start on http://localhost:8000.

2. Start the client:


            cd clientSide
            npm run start

    The client will start on http://localhost:3000.

Database Setup
--------------

Ensure MongoDB is running on your local machine or connected to a cloud instance. The connection URI is already specified in the .env file as MONGO_URI.

Usage
------

1. Open your browser and navigate to http://localhost:3000 to access the platform.
2. Sign up or log in to access survey creation and management features.
3. click new Survey button to go to the survey creation form to build and deploy surveys.
4. Manage survey templates from the template list page.
5. View survey details and responses from the survey details page............

Folder Structure
------------

        hotjar-survey-platform/
        ├── clientSide/
        │   ├── src/
        │   ├── public/
        │   └
        ├── serverSide/
        │   ├── Controllers/
        │   ├── Models/
        │   ├── Routes/
        │   └── Utils/
        ├── .env
        ├── package.json
        └── README.md




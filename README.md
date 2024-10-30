# E-Commerce API + React

This is a project combining the Coding Temple E-Commerce API assignment with ReactJS to create a front-end interface that allows creation, editing, removal, and viewing of information in a MySQL database.

## How to run:

Start by creating a MySQL database on your system on port 3306. The password 'my-secret-pw' should be used for the root user (this is default for the MySQL docker container from their example set-up). Create a database with the name 'ecommerce-app'.

From the E-commerce_API folder, run the command './.env/bin/flask run'. This will create the necessary tables for the app to run. Ensure this is running on port 5000.

To start the front-end locally, open the E-commerce*API*+\_React folder and run the npm install command from inside the project folder to install the necessary dependencies. Then run the command 'npm run dev'.

Navigate to the webpage that is listed in the terminal afterwards, and you will be able to interact with the database from the web interface.

## Features:

The application has the capability to:

- Add customers
- View customers if the proper id is given in the route
- Delete customers
- Modify customer data using a form
- View all available products
- Create new products
- Modify product details via modal
- Delete products
- Create orders

### Additional information on the flask server is available in the E-commerce_API folder

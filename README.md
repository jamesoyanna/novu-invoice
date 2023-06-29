## Novu Invoice App

## Description: 

### About Project
 Online Invoicing application for creating and Sending invoices to customers via email, suitable for Startups, Business Owners and Freelancers. 


This project is a is a user-friendly full-stack Online Invoicing application designed to streamline the process of creating and sending invoices to customers via email. 

This application caters to the needs of startups, business owners, and freelancers who require a simple yet efficient invoicing system. 

The project is built using React and Node.js, making use of the Novu API for seamless delivery of invoices as email messages.

## Application Features
- ### Invoice Creation: 
The application provides a user-friendly interface for creating professional invoices. 

Users can input relevant details such as the customer's name, billing information, item descriptions, quantities, prices, and notes. 

- ### Invoice Sending: 
The invoicing application integrates the Novu API, enabling users to send invoices in PDF format directly to customers via email. 

With a unified delivery API, the application ensures reliable and efficient delivery of invoices to the intended recipients.

- ### Edit Invoice Functionality: 
To cater to changing requirements or corrections, the application incorporates an edit invoice functionality. 

Users can seamlessly update invoice details, such as customer information, item descriptions, quantities, and prices. 

The application automatically recalculates the total quantity and amount based on the edited values.


#### Live view of the application Demo can be VIEWED here- [Invoice App](https://novu-invoice.netlify.app/)


### Screenshots of the Application.

Front page display.

![front-page](https://github.com/jamesoyanna/novu-invoice/assets/26815113/30d86838-cf58-4135-a00c-7b52c0d94019)




Invoice Creation View
![Invoice-creation](https://github.com/jamesoyanna/novu-invoice/assets/26815113/7f48281c-3a6e-4e2a-853d-6fdaa60d6ca1)


Created Invoice:
![created-invoice](https://github.com/jamesoyanna/novu-invoice/assets/26815113/5c8e0f49-e90c-4276-aa16-ee620fe7e688)


Invoice Sample:
![invoice-sample](https://github.com/jamesoyanna/novu-invoice/assets/26815113/9493c579-4745-4d0d-bceb-b0f120b9e967)


## How to use the application

## Table of Contents
- [Getting Started](#getting-started)
	- [Tools Required](#tools-required)
	- [Installation](#installation)
- [Development](#development)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
- [Authors](#authors)
- [License](#license)

## Getting Started

#### Dependencies
##### Client Side

The project is built with;
* [React JS](https://beta.reactjs.org/) -Library for building user interfaces
* [Axios](https://axios-http.com) - Promise based HTTP client for the browser and node.js
* [React-router](https://reactrouter.com) - Enables the to implementation of dynamic routing in a web app.
* [Tailwind CSS](https://mui.com) - A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.


##### Server Side
* [novu/node](https://novu.co/) - Simple components and APIs for managing all communication channels in one place: Email, SMS, Direct, and Push
* [Express JS](https://expressjs.com/) - flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [HTML-PDF](https://www.npmjs.com/package/html-pdf?activeTab=readme) - HTML to PDF converter that uses phantomjs
* [Mongoose](https://mongoosejs.com) - Provides a straight-forward, schema-based solution to model application data 

* [Node.js](https://nodejs.org/en)- Cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.

##### Database
* [MongoDB](https://www.mongodb.com/)- Source-available cross-platform document-oriented database program.

 
### Prerequisites
Ensure you have NodeJS installed by entering node -v on your terminal If you don't have NodeJS installed, you can go to the NodeJS Website, and follow the download instructions


### Tools Required
The following tools are required to run this application:

* A text editor like Visual Studio Code
* Command Line

### Getting the source code
You can clone the repository directly using this command:
git clone git@github.com:jamesoyanna/novu-invoice.git
OR clicking on the code button ontop to clone the application.

### Installation
Installation steps:

Node.js and Yarn or Npm
You should have Nodejs installed, and NPM to run this application .You can download Node.js from https://nodejs.org . NPM comes with Node.js

![nodejs](https://user-images.githubusercontent.com/26815113/132867561-bf2ec1a2-cd63-461f-95dd-e95c1c6676c7.PNG)

## Install Npm Packages
Upon clonning the application, to run the client application locally, you will have to install all the dependencies and packages. 

Open your terminal and navigate into the client folder using the command:
cd client

 Run yarn or npm install from the root of the client folder.

### Development server

#### Running the client App

  ``` 
Run yarn start or npm start from the root of the client folder to start the development server. 
Go to http://localhost:3000 on your browser. Your app should be running.

The app will automatically reload if you make changes to any of the source files.
  ```

#### Running the Server
Open the project folder you cloned. 
Create a .env file in the root folder
Fill in the following credentials WITH YOURS:

NODE_VERSION = 16.14.2

NOVU_API_KEY= YOUR NOVU_API_KEY

MONGODB_URI= YOUR MONGODB_URI


Run npm install from your terminal.
Then run npm start. 
Your server should start running on  port 5000.

## About Me 
I am Frontend Engineer. I have a proven track record of successfully developing and managing client-centric mobile & Web applications. 


#### James Oyanna
* [GitHub](https://github.com/jamesoyanna)
* [LinkedIn](https://www.linkedin.com/in/jamesoyanna)



<!-- Screenshot of main page -->

<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" height="20" /><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" height="20" /><img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" height="20" /><img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white" height="20" /><img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" height="20" /><img src="https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white" height="20" /><img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" height="20" /><img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" height="20" /><img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white" height="20" /><img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" height="20" />

This **React** application is an advanced employee and project **sales management system**, offering a highly intuitive interface for streamlined data management. Users can view, add, edit, or remove companies, employees, projects, invoices, and their correlations. Some of the key features include:

- Powered by **React** and **Redux** for efficient state management, the app implements **React Router** to ensure seamless navigation between pages.
- **Axios** facilitates secure HTTP requests, enabling smooth interactions with the backend server and **Oracle database**.
- Incorporates localization support through **React Intl**, accommodating users from diverse linguistic backgrounds.
- On the server-side, **Express** serves as the robust server framework, while **MySQL** efficiently handles data storage and retrieval.

With its integration of these cutting-edge technologies, this sales management application stands out as a competitive development practice, making it an invaluable asset for any organization.

# Table of Contents

- [How to start](#how-to-start)
  - [AKS environment](#aks-environment)
  - [Development environment](#development-environment)
  - [Debugging](#debugging)
- [Installation](#installation)
  - [Tools](#tools)
  - [Dependencies](#dependencies)
- [Containerization and AKS cluster](#containerization-and-aks-cluster)
  - [Pre-requisites](#pre-requisites)
- [Architecture](#architecture)
  - [3-tier application](#3-tier-application)
- [Additional Resources](#additional-resources)
  - [Testing](#testing)
  - [Mock data](#mock-data)
  - [Setup development environment](#setup-development-environment)
  - [Environment variables](#environment-variables)
- [Screenshots](#screenshots)

## How to start

### AKS environment

- AKS Service external IP: **TBD**
- User ID: testUser
- Password: 123456

### Development environment

#### 1. Start the backend service

- `npm run service` in the service-side terminal
- Start the backend service at _localhost:4000_.

#### 2. Start the BFF (Backend for Frontend) server

- `npm run server` in the UI-side terminal
- Start the BFF server at _localhost:3000_.
- Proxies are set in 'setupProxy.js' during development mode to redirect API requests to the BFF Express app and hook up proxy middleware.

#### 3. Start the application in development mode

- `npm run start` in the UI-side terminal
- Start the front-end app in development mode, enabling automatic reload upon code changes.
- If the BFF is already using _localhost:3000_, system automatically assigns port 3001 for the UI.

#### Optional: Build production to be deployed

- `npm run build` in the UI-side terminal
- Build the application for production in the '/build' directory.

### Debugging

For both debugging modes, start the backend service by running `npm run service` in the service terminal.

- BFF debugging mode

1. Run `npm run build`.
2. Choose "Debug BFF" from the debugger list.
3. Log in to _localhost:3000_.

- Front-end debugging mode

1. Start the BFF - `npm run server`.
2. Start the React App - `npm run start`.
3. Launch Chrome with port 3001 from the debugger list.
4. Log in to _localhost:3001_ on the debugger browser.

## Installation

Before getting started, you need to ensure you have the following tools and dependencies.

### Tools

- [Node.js](https://nodejs.org/en/download) and [VS Code](https://code.visualstudio.com/download): Install Node.js to run the application and VS Code to edit code.
- VS Code Extensions: It is recommended to install several extensions to enhance code security and productivity.
  - ESlint
  - SonarLint
  - Debugger for Chrome
  - Prettier
  - Git History
  - GitLens
  - Snyk Code
- [Git](https://git-scm.com/downloads): Install Git to manage version control and collaborate with team effectively.
- [Java JRE](https://www.oracle.com/java/technologies/downloads/): Java Runtime Engine is required for executing Selenium BDD end-to-end tests.
- [Postman](https://www.postman.com/downloads/): Use Postman to test APIs and interact with the backend services.
- [nvm](https://github.com/nvm-sh/nvm): Ensure your Node Version Manager is set to a minimum version of 8.x.x and 16.x.x for Node.js.

### Dependencies

- axios: Library for making HTTP requests.
- bcryptjs: Helps hash and compare passwords securely.
- body-parser: Parses incoming request bodies in Express.
- dayjs: Library for handling dates and times.
- dotenv: Loads environment variables from a .env file.
- express: Web framework for Node.js.
- express-session: Provides session middleware for Express.
- fs: File system module for Node.js.
- path: Node.js path module for working with file and directory paths.
- prop-types: Runtime type checking for React props.
- react-toastify: Toast notification system for React apps.

## Containerization and AKS cluster

### Pre-requisites

- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli#install): `az` and `kubectl` commands vary from pushing and managing image tags in AKS, to deploying and enabling services.
- [Azure Kubernetes System](https://azure.microsoft.com/en-ca): Keep images in Registries and maintain deployments/services in the Kubernetes cluster.
- [Docker](https://www.docker.com/): Build local images, containers, and create tags for the AKS cluster.

Most Azure and Kubernetes commands can be found in the '/resource' directory of [service-side repository](https://github.com/jkang0724/sales-management-service).

## Architecture

### 3-tier application

#### 1) Front-end

Contains code for the user interface, including React components and UI elements.

#### 2) BFF (Back-end For Front-end)

Serves as an intermediary between the frontend and backend service, handling Axios requests and responses.

#### 3) Back-end

Manages the backend service, responsible for API requests and database interactions.

## Additional Resources

### Testing

To test the application, you can run both **TDD** (Test-Driven Development) and **BDD** (Behavior-Driven Development) tests:

- TDD: Execute **Jest** to run the test suite for test-driven development.

- BDD: Run **Cucumber** for BDD tests to ensure the application behaves according to user requirements.

### Mock data

Mock data is made available using **MySQL Workbench** for testing purposes. To test the application, you can use the curated mock data and verify the functionality of different features.

### Setup development environment

For a consistent development environment, consider setting the following:

- EOL (End-of-Line): Configure your code editor to manage EOL settings properly.
- SonarQube: Use SonarQube for continuous code quality analysis.
- VS Code Environment Setting: Set up your VS Code environment with the appropriate settings for better productivity.

### Environment variables

The application uses environment variables with the "REACT_APP\_" prefix. Please refer to the manifest file and [Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) in React's official documentation.

## Screenshots

<!-- Screenshots to be added -->

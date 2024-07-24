# MamaHub

## About

MamaHub is a comprehensive online platform designed to support mothers at all stages of their journey - prenatal, postnatal, and aspiring mothers. Our mission is to create a nurturing community where mothers can connect, share experiences, and access valuable resources for raising children in today's challenging world.

## Table of Contents

- [MamaHub](#mamahub)
  - [About](#about)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [API Documentation](#api-documentation)
  - [Frontend Structure](#frontend-structure)
  - [Database Schema](#database-schema)
  - [Testing](#testing)
  - [Deployment](#deployment)
  - [Contributing](#contributing)
  - [Privacy](#privacy)
  - [License](#license)

## Features

- **Discussion Forums**: Themed spaces for various topics related to motherhood and child-rearing.
- **Expert Advice**: Regular contributions from pediatricians, psychologists, and experienced mothers.
- **Resource Library**: Curated articles, videos, and podcasts on parenting topics.
- **Event Calendar**: Online and local meetups, webinars, and workshops.
- **Private Messaging**: Secure one-on-one communication between users.
- **Milestone Tracking**: Tools to record and celebrate children's growth and development.

## Technology Stack

- **Design**: Figma
- **Backend**: Node.js with Express.js
- **Frontend**: React.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **API**: RESTful API

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0 or later)
- Git
- getStream account

## Installation

1. Clone the repository:

```bash
git clone https://github.com/addymwenda12/MamaHub.git
```

2. Install backend dependencies:

   ```bash
   cd server

   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd client

   npm install
   ```

## Configuration

1. Backend configuration:

- Create a `.env` file in the `server` directory
- Add the following environment variables:
  ```
  PORT=5000
  MONGODB_URI=mongodb://localhost:27017/MamaHub
  STREAM_APP_ID = your_stream_APP_ID
  STREAM_API_KEY = your_stream_API_KEY
  STREAM_API_SECRET = your_stream_API_SECRET
  ```

1. Frontend configuration:

- Update the API base URL in `client/src/config.js` if necessary

## Running the Application

1. Start the MongoDB service on your machine

2. Run the backend server:

   ```bash
   cd backend

   npm run start
   ```

3. In a new terminal, run the frontend development server:

   ```bash
   cd server

   npm run dev
   ```

4. Access the application at `http://localhost:5173/`

## API Documentation

API documentation is available at `http://localhost:5000/api-docs` when the backend server is running.

## Frontend Structure

Designs for the user interface are available at `https://www.figma.com/design/6riXBDQkMQLlLmfbAsAlh7/MamaHub?node-id=0-1&t=acKq8nyBvWIvGzFm-1`.

The React.js frontend is organized as follows:

- `src/components`: Reusable React components
- `src/pages`: Page-level React components
- `src/context`: React store for state management
- `src/assets`: Static assets like images and global styles

## Database Schema

Key MongoDB collections:

- Users
- Groups

Detailed schema definitions can be found in `server/models/`.

## Testing

- Run backend tests: `cd server && npm run test`
- Run frontend tests: `cd client && npm run test:unit`

## Deployment

Deployment instructions for various platforms:

1. Heroku:

- Install the Heroku CLI
- Run `heroku create`
- Set environment variables: `heroku config:set NODE_ENV=production`
- Push to Heroku: `git push heroku main`

2. DigitalOcean:

- Create a droplet
- SSH into your droplet
- Clone the repository and follow the installation steps
- Use PM2 to manage the Node.js process

Detailed deployment guides for other platforms can be found in `DEPLOYMENT.md`.

## Contributing

We welcome contributions from the community. Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Privacy

We take user privacy seriously. Please review our [Privacy Policy](PRIVACY.md) for information on how we protect and use your data.

## License

MamaHub is licensed under the [MIT License](LICENSE.md).
om.

Join MamaHub today and be part of a community that understands and supports the beautiful journey of motherhood!

NOTE!
The current version of mamahub is yet to be completed.
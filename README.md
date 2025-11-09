# Florida Birds Backend API

A RESTful API built with Node.js, Express, and MongoDB for managing and analyzing bird observation data in Florida.

## GitHub Repository

https://github.com/as872832/florida-birds-backend

*(You'll update this with your actual GitHub URL later)*

## Project Description

This backend system provides CRUD operations for bird observation records and answers eight analytical questions about Florida bird sightings. The API uses MongoDB for data persistence and includes comprehensive unit tests with Jest.

## Features

- Full CRUD operations for bird observations
- Eight analytical endpoints answering specific questions about the dataset
- MongoDB integration with Mongoose ODM
- RESTful API design
- Comprehensive unit tests with Jest
- Error handling and validation

##  Project Structure
```
florida-birds-backend/
│
├── models/
│   └── birdModel.js          # Mongoose schema
├── routes/
│   └── api.js                # API routes
├── controllers/
│   └── birdController.js     # Business logic
├── tests/
│   └── api.test.js          # Jest tests
├── app.js                    # Express app
├── importData.js             # Data seeding script
├── package.json              # Dependencies
├── .env                      # Environment variables (not in Git)
└── README.md                # This file
```

##  Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm package manager

### Installation Steps

1. **Clone the repository**
```bash
   git clone https://github.com/YOUR_USERNAME/florida-birds-backend.git
   cd florida-birds-backend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure environment variables**
   - Create a `.env` file in project root
   - Add your MongoDB connection string:
```
     MONGODB_URI=your_mongodb_connection_string_here
     PORT=3000
```

4. **Import sample data**
```bash
   node importData.js
```

5. **Start the server**
```bash
   npm start
```

6. **Run tests**
```bash
   npm test
```

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### CRUD Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/observations` | Create a new bird observation |
| GET | `/observations` | Get all bird observations |
| GET | `/observations/:id` | Get a specific observation by ID |
| PUT | `/observations/:id` | Update an observation |
| DELETE | `/observations/:id` | Delete an observation |

### Question Endpoints

| Endpoint | Question |
|----------|----------|
| GET `/questions/highest-observation-species` | Which bird species has the highest total number of observations? |
| GET `/questions/average-per-observation` | What is the average number of birds per observation? |
| GET `/questions/most-diverse-location` | Which location reports the greatest number of unique species? |
| GET `/questions/busiest-observation-date` | On what date were the most bird observations recorded? |
| GET `/questions/distinct-species-count` | How many distinct bird species have been observed in Florida? |
| GET `/questions/most-frequent-large-groups` | Which species is most frequently observed in groups larger than 10? |
| GET `/questions/rare-species-percentage` | What percentage of observations are flagged as rare species? |
| GET `/questions/widest-distribution` | Which species has the widest geographic distribution? |

## Example Requests

### Create Observation
```json
POST http://localhost:3000/api/observations
Content-Type: application/json

{
  "speciesCode": "norcrd",
  "commonName": "Northern Cardinal",
  "scientificName": "Cardinalis cardinalis",
  "observationCount": 3,
  "locationName": "Paynes Prairie Preserve",
  "latitude": 29.6116,
  "longitude": -82.2807,
  "observationDate": "2025-09-15T08:30:00Z",
  "isRare": false
}
```

### Get All Observations
```
GET http://localhost:3000/api/observations
```

### Question Example
```
GET http://localhost:3000/api/questions/highest-observation-species
```

##  Testing

Run unit tests with:
```bash
npm test
```

Test coverage includes:
- CRUD operations
- All eight question endpoints
- Error handling
- Edge cases

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Jest** - Testing framework
- **Supertest** - HTTP assertions
- **dotenv** - Environment variable management

## 👤 Author

**Ashley Brookman**
- GitHub: [@as872832](https://github.com/as872832)

##  License

MIT License

## 📝 Assignment Notes

This project was created for Backend Development Assignment  
Date: November 9th 2025
```


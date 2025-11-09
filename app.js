import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/florida-birds';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Florida Birds API',
    version: '1.0.0',
    endpoints: {
      crud: {
        create: 'POST /api/observations',
        readAll: 'GET /api/observations',
        readOne: 'GET /api/observations/:id',
        update: 'PUT /api/observations/:id',
        delete: 'DELETE /api/observations/:id'
      },
      questions: {
        q1: 'GET /api/questions/highest-observation-species',
        q2: 'GET /api/questions/average-per-observation',
        q3: 'GET /api/questions/most-diverse-location',
        q4: 'GET /api/questions/busiest-observation-date',
        q5: 'GET /api/questions/distinct-species-count',
        q6: 'GET /api/questions/most-frequent-large-groups',
        q7: 'GET /api/questions/rare-species-percentage',
        q8: 'GET /api/questions/widest-distribution'
      }
    }
  });
});

app.use('/api', apiRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;

// Only start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
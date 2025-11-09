import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import BirdObservation from '../models/birdModel.js';

// Test database URI
const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/florida-birds-test';

// Connect to MongoDB once before all tests
beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_TEST_URI);
  }
});

// Clear database before each test
beforeEach(async () => {
  await BirdObservation.deleteMany({});
});

// Close connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Bird Observations API - CRUD Operations', () => {

  describe('POST /api/observations', () => {
    it('should create a new bird observation', async () => {
      const newObservation = {
        speciesCode: 'rocpig',
        commonName: 'Rock Pigeon',
        scientificName: 'Columba livia',
        observationCount: 15,
        locationName: 'Orange Creek Restoration Area',
        latitude: 29.5853,
        longitude: -82.1426,
        observationDate: '2025-09-14T07:23:00Z',
        isRare: false
      };

      const response = await request(app)
        .post('/api/observations')
        .send(newObservation)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.commonName).toBe('Rock Pigeon');
      expect(response.body.data.observationCount).toBe(15);
    });

    it('should return error when required fields are missing', async () => {
      const invalidObservation = { commonName: 'Test Bird' };

      const response = await request(app)
        .post('/api/observations')
        .send(invalidObservation)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/observations', () => {
    it('should return all bird observations', async () => {
      await BirdObservation.create([
        { speciesCode: 'rocpig', commonName: 'Rock Pigeon', scientificName: 'Columba livia', observationCount: 15, locationName: 'Orange Creek', latitude: 29.5853, longitude: -82.1426, observationDate: '2025-09-14T07:23:00Z' },
        { speciesCode: 'norcrd', commonName: 'Northern Cardinal', scientificName: 'Cardinalis cardinalis', observationCount: 3, locationName: 'Paynes Prairie', latitude: 29.6116, longitude: -82.2807, observationDate: '2025-09-15T08:30:00Z' }
      ]);

      const response = await request(app)
        .get('/api/observations')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(2);
      expect(response.body.data).toHaveLength(2);
    });
  });

  describe('GET /api/observations/:id', () => {
    it('should return a specific bird observation', async () => {
      const observation = await BirdObservation.create({
        speciesCode: 'rocpig', commonName: 'Rock Pigeon', scientificName: 'Columba livia', observationCount: 15,
        locationName: 'Orange Creek', latitude: 29.5853, longitude: -82.1426, observationDate: '2025-09-14T07:23:00Z'
      });

      const response = await request(app)
        .get(`/api/observations/${observation._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.commonName).toBe('Rock Pigeon');
    });

    it('should return 404 for non-existent observation', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/observations/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/observations/:id', () => {
    it('should update a bird observation', async () => {
      const observation = await BirdObservation.create({
        speciesCode: 'rocpig', commonName: 'Rock Pigeon', scientificName: 'Columba livia', observationCount: 15,
        locationName: 'Orange Creek', latitude: 29.5853, longitude: -82.1426, observationDate: '2025-09-14T07:23:00Z'
      });

      const response = await request(app)
        .put(`/api/observations/${observation._id}`)
        .send({ observationCount: 20 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.observationCount).toBe(20);
    });
  });

  describe('DELETE /api/observations/:id', () => {
    it('should delete a bird observation', async () => {
      const observation = await BirdObservation.create({
        speciesCode: 'rocpig', commonName: 'Rock Pigeon', scientificName: 'Columba livia', observationCount: 15,
        locationName: 'Orange Creek', latitude: 29.5853, longitude: -82.1426, observationDate: '2025-09-14T07:23:00Z'
      });

      const response = await request(app)
        .delete(`/api/observations/${observation._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      const found = await BirdObservation.findById(observation._id);
      expect(found).toBeNull();
    });
  });
});

describe('Bird Observations API - Question Endpoints', () => {

  beforeEach(async () => {
    await BirdObservation.create([
      { speciesCode: 'rocpig', commonName: 'Rock Pigeon', scientificName: 'Columba livia', observationCount: 25, locationName: 'Orange Creek', latitude: 29.5853, longitude: -82.1426, observationDate: '2025-09-14T07:23:00Z', isRare: false },
      { speciesCode: 'rocpig', commonName: 'Rock Pigeon', scientificName: 'Columba livia', observationCount: 18, locationName: 'Paynes Prairie', latitude: 29.6116, longitude: -82.2807, observationDate: '2025-09-14T08:30:00Z', isRare: false },
      { speciesCode: 'norcrd', commonName: 'Northern Cardinal', scientificName: 'Cardinalis cardinalis', observationCount: 3, locationName: 'Orange Creek', latitude: 29.5853, longitude: -82.1426, observationDate: '2025-09-15T07:00:00Z', isRare: false },
      { speciesCode: 'paibun', commonName: 'Painted Bunting', scientificName: 'Passerina ciris', observationCount: 1, locationName: 'Sweetwater Wetlands', latitude: 29.6744, longitude: -82.3970, observationDate: '2025-09-16T09:15:00Z', isRare: true }
    ]);
  });

  it('GET /questions/highest-observation-species', async () => {
    const response = await request(app).get('/api/questions/highest-observation-species').expect(200);
    expect(response.body.answer).toBe('Rock Pigeon');
    expect(response.body.details.totalObservations).toBe(43);
  });

  it('GET /questions/average-per-observation', async () => {
    const response = await request(app).get('/api/questions/average-per-observation').expect(200);
    expect(parseFloat(response.body.answer)).toBeGreaterThan(0);
  });

  it('GET /questions/most-diverse-location', async () => {
    const response = await request(app).get('/api/questions/most-diverse-location').expect(200);
    expect(response.body.answer).toBe('Orange Creek');
    expect(response.body.speciesCount).toBe(2);
  });

  it('GET /questions/busiest-observation-date', async () => {
    const response = await request(app).get('/api/questions/busiest-observation-date').expect(200);
    expect(response.body.answer).toBeDefined();
  });

  it('GET /questions/distinct-species-count', async () => {
    const response = await request(app).get('/api/questions/distinct-species-count').expect(200);
    expect(response.body.answer).toBe(3);
  });

  it('GET /questions/most-frequent-large-groups', async () => {
    const response = await request(app).get('/api/questions/most-frequent-large-groups').expect(200);
    expect(response.body.answer).toBeDefined();
  });

  it('GET /questions/rare-species-percentage', async () => {
    const response = await request(app).get('/api/questions/rare-species-percentage').expect(200);
    expect(response.body.rareCount).toBe(1);
    expect(response.body.totalCount).toBe(4);
  });

  it('GET /questions/widest-distribution', async () => {
    const response = await request(app).get('/api/questions/widest-distribution').expect(200);
    expect(response.body.answer).toBeDefined();
  });
});

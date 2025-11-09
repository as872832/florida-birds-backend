import express from 'express';
import {
  createObservation,
  getAllObservations,
  getObservationById,
  updateObservation,
  deleteObservation,
  getHighestObservationSpecies,
  getAveragePerObservation,
  getMostDiverseLocation,
  getBusiestObservationDate,
  getDistinctSpeciesCount,
  getMostFrequentLargeGroups,
  getRareSpeciesPercentage,
  getWidestDistribution
} from '../controllers/birdController.js';

const router = express.Router();

// CRUD Routes
router.post('/observations', createObservation);
router.get('/observations', getAllObservations);
router.get('/observations/:id', getObservationById);
router.put('/observations/:id', updateObservation);
router.delete('/observations/:id', deleteObservation);

// Question Routes
router.get('/questions/highest-observation-species', getHighestObservationSpecies);
router.get('/questions/average-per-observation', getAveragePerObservation);
router.get('/questions/most-diverse-location', getMostDiverseLocation);
router.get('/questions/busiest-observation-date', getBusiestObservationDate);
router.get('/questions/distinct-species-count', getDistinctSpeciesCount);
router.get('/questions/most-frequent-large-groups', getMostFrequentLargeGroups);
router.get('/questions/rare-species-percentage', getRareSpeciesPercentage);
router.get('/questions/widest-distribution', getWidestDistribution);

export default router;
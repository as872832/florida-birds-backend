import BirdObservation from '../models/birdModel.js';

// Create a new bird observation
export const createObservation = async (req, res) => {
  try {
    const observation = new BirdObservation(req.body);
    await observation.save();
    res.status(201).json({
      success: true,
      data: observation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all bird observations
export const getAllObservations = async (req, res) => {
  try {
    const observations = await BirdObservation.find();
    res.status(200).json({
      success: true,
      count: observations.length,
      data: observations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single bird observation by ID
export const getObservationById = async (req, res) => {
  try {
    const observation = await BirdObservation.findById(req.params.id);
    if (!observation) {
      return res.status(404).json({
        success: false,
        error: 'Observation not found'
      });
    }
    res.status(200).json({
      success: true,
      data: observation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update a bird observation
export const updateObservation = async (req, res) => {
  try {
    const observation = await BirdObservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!observation) {
      return res.status(404).json({
        success: false,
        error: 'Observation not found'
      });
    }
    res.status(200).json({
      success: true,
      data: observation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a bird observation
export const deleteObservation = async (req, res) => {
  try {
    const observation = await BirdObservation.findByIdAndDelete(req.params.id);
    if (!observation) {
      return res.status(404).json({
        success: false,
        error: 'Observation not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {},
      message: 'Observation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Question 1: Which bird species has the highest total number of observations?
export const getHighestObservationSpecies = async (req, res) => {
  try {
    const result = await BirdObservation.aggregate([
      {
        $group: {
          _id: '$commonName',
          totalObservations: { $sum: '$observationCount' },
          recordCount: { $sum: 1 }
        }
      },
      { $sort: { totalObservations: -1 } },
      { $limit: 1 }
    ]);

    res.status(200).json({
      question: 'Which bird species has the highest total number of observations?',
      answer: result.length > 0 ? result[0]._id : 'No data available',
      details: result[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Question 2: What is the average number of birds per observation?
export const getAveragePerObservation = async (req, res) => {
  try {
    const result = await BirdObservation.aggregate([
      {
        $group: {
          _id: null,
          avgCount: { $avg: '$observationCount' }
        }
      }
    ]);

    const average = result.length > 0 ? result[0].avgCount.toFixed(2) : 0;

    res.status(200).json({
      question: 'What is the average number of birds per observation?',
      answer: average
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Question 3: Which location reports the greatest number of unique species?
export const getMostDiverseLocation = async (req, res) => {
  try {
    const result = await BirdObservation.aggregate([
      {
        $group: {
          _id: '$locationName',
          uniqueSpecies: { $addToSet: '$commonName' }
        }
      },
      {
        $project: {
          location: '$_id',
          speciesCount: { $size: '$uniqueSpecies' }
        }
      },
      { $sort: { speciesCount: -1 } },
      { $limit: 1 }
    ]);

    res.status(200).json({
      question: 'Which location reports the greatest number of unique species?',
      answer: result.length > 0 ? result[0].location : 'No data available',
      speciesCount: result.length > 0 ? result[0].speciesCount : 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Question 4: On what date were the most bird observations recorded?
export const getBusiestObservationDate = async (req, res) => {
  try {
    const result = await BirdObservation.aggregate([
      {
        $group: {
          _id: '$observationDate',
          recordCount: { $sum: 1 }
        }
      },
      { $sort: { recordCount: -1 } },
      { $limit: 1 }
    ]);

    res.status(200).json({
      question: 'On what date were the most bird observations recorded?',
      answer: result.length > 0 ? result[0]._id : 'No data available',
      recordCount: result.length > 0 ? result[0].recordCount : 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Question 5: How many distinct bird species have been observed in Florida?
export const getDistinctSpeciesCount = async (req, res) => {
  try {
    const count = await BirdObservation.distinct('commonName');

    res.status(200).json({
      question: 'How many distinct bird species have been observed in Florida?',
      answer: count.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Question 6: Which species is most frequently observed in groups larger than 10?
export const getMostFrequentLargeGroups = async (req, res) => {
  try {
    const result = await BirdObservation.aggregate([
      { $match: { observationCount: { $gt: 10 } } },
      {
        $group: {
          _id: '$commonName',
          occurrences: { $sum: 1 }
        }
      },
      { $sort: { occurrences: -1 } },
      { $limit: 1 }
    ]);

    res.status(200).json({
      question: 'Which species is most frequently observed in groups larger than 10?',
      answer: result.length > 0 ? result[0]._id : 'No data available',
      occurrences: result.length > 0 ? result[0].occurrences : 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Question 7: What percentage of observations are flagged as rare species?
export const getRareSpeciesPercentage = async (req, res) => {
  try {
    const totalCount = await BirdObservation.countDocuments();
    const rareCount = await BirdObservation.countDocuments({ isRare: true });
    const percentage = totalCount > 0 ? ((rareCount / totalCount) * 100).toFixed(2) : 0;

    res.status(200).json({
      question: 'What percentage of observations are flagged as rare species?',
      answer: `${percentage}%`,
      rareCount: rareCount,
      totalCount: totalCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Question 8: Which species has the widest geographic distribution?
export const getWidestDistribution = async (req, res) => {
  try {
    const result = await BirdObservation.aggregate([
      {
        $group: {
          _id: '$commonName',
          locations: { $addToSet: '$locationName' }
        }
      },
      {
        $project: {
          species: '$_id',
          locationCount: { $size: '$locations' }
        }
      },
      { $sort: { locationCount: -1 } },
      { $limit: 1 }
    ]);

    res.status(200).json({
      question: 'Which species has the widest geographic distribution?',
      answer: result.length > 0 ? result[0].species : 'No data available',
      locationCount: result.length > 0 ? result[0].locationCount : 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

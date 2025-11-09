// Bird Observation Model
// Defines the schema for storing bird sighting data in MongoDB
import mongoose from 'mongoose';

const birdObservationSchema = new mongoose.Schema({
  speciesCode: {
    type: String,
    required: true
  },
  commonName: {
    type: String,
    required: true,
    index: true
  },
  scientificName: {
    type: String,
    required: true
  },
  observationCount: {
    type: Number,
    required: true,
    min: 0
  },
  locationName: {
    type: String,
    required: true,
    index: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  observationDate: {
    type: Date,
    required: true,
    index: true
  },
  isRare: {
    type: Boolean,
    default: false
  },
  protocol: {
    type: String
  },
  duration: {
    type: Number
  }
}, {
  timestamps: true
});

// Index for geospatial queries
birdObservationSchema.index({ latitude: 1, longitude: 1 });

// Index for species queries
birdObservationSchema.index({ commonName: 1, observationDate: -1 });

const BirdObservation = mongoose.model('BirdObservation', birdObservationSchema);

export default BirdObservation;
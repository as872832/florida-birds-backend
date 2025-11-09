import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BirdObservation from './models/birdModel.js';

dotenv.config();

const sampleBirds = [
  {
    speciesCode: 'rocpig',
    commonName: 'Rock Pigeon',
    scientificName: 'Columba livia',
    observationCount: 25,
    locationName: 'Orange Creek Restoration Area--Alachua Co.',
    latitude: 29.5853,
    longitude: -82.1426,
    observationDate: new Date('2025-09-14T07:23:00Z'),
    isRare: false
  },
  {
    speciesCode: 'rocpig',
    commonName: 'Rock Pigeon',
    scientificName: 'Columba livia',
    observationCount: 18,
    locationName: 'Paynes Prairie Preserve',
    latitude: 29.6116,
    longitude: -82.2807,
    observationDate: new Date('2025-09-14T08:30:00Z'),
    isRare: false
  },
  {
    speciesCode: 'norcrd',
    commonName: 'Northern Cardinal',
    scientificName: 'Cardinalis cardinalis',
    observationCount: 3,
    locationName: 'Orange Creek Restoration Area--Alachua Co.',
    latitude: 29.5853,
    longitude: -82.1426,
    observationDate: new Date('2025-09-15T07:00:00Z'),
    isRare: false
  },
  {
    speciesCode: 'blujay',
    commonName: 'Blue Jay',
    scientificName: 'Cyanocitta cristata',
    observationCount: 5,
    locationName: 'Orange Creek Restoration Area--Alachua Co.',
    latitude: 29.5853,
    longitude: -82.1426,
    observationDate: new Date('2025-09-14T07:23:00Z'),
    isRare: false
  },
  {
    speciesCode: 'paibun',
    commonName: 'Painted Bunting',
    scientificName: 'Passerina ciris',
    observationCount: 1,
    locationName: 'Sweetwater Wetlands Park',
    latitude: 29.6744,
    longitude: -82.3970,
    observationDate: new Date('2025-09-16T09:15:00Z'),
    isRare: true
  },
  {
    speciesCode: 'grehaw',
    commonName: 'Great Blue Heron',
    scientificName: 'Ardea herodias',
    observationCount: 2,
    locationName: 'Paynes Prairie Preserve',
    latitude: 29.6116,
    longitude: -82.2807,
    observationDate: new Date('2025-09-14T08:30:00Z'),
    isRare: false
  },
  {
    speciesCode: 'amekes',
    commonName: 'American Kestrel',
    scientificName: 'Falco sparverius',
    observationCount: 1,
    locationName: 'Sweetwater Wetlands Park',
    latitude: 29.6744,
    longitude: -82.3970,
    observationDate: new Date('2025-09-16T09:15:00Z'),
    isRare: false
  },
  {
    speciesCode: 'mocdov',
    commonName: 'Mourning Dove',
    scientificName: 'Zenaida macroura',
    observationCount: 12,
    locationName: 'Orange Creek Restoration Area--Alachua Co.',
    latitude: 29.5853,
    longitude: -82.1426,
    observationDate: new Date('2025-09-14T07:23:00Z'),
    isRare: false
  },
  {
    speciesCode: 'rehwoo',
    commonName: 'Red-headed Woodpecker',
    scientificName: 'Melanerpes erythrocephalus',
    observationCount: 2,
    locationName: 'Sweetwater Wetlands Park',
    latitude: 29.6744,
    longitude: -82.3970,
    observationDate: new Date('2025-09-17T08:45:00Z'),
    isRare: false
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');

    await BirdObservation.deleteMany();
    console.log('🗑️  Existing data deleted');

    await BirdObservation.insertMany(sampleBirds);
    console.log(`✅ ${sampleBirds.length} bird observations imported successfully`);

    await mongoose.connection.close();
    console.log('👋 Database connection closed');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

importData();
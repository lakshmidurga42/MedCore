import { RegionAssessment, Doctor } from '../types';

export const mockRegions: RegionAssessment[] = [
  {
    id: 'reg-1',
    name: 'Main Medical Block',
    lastUpdated: new Date().toISOString(),
    coordinates: { lat: 17.3850, lng: 78.4867 },
    facilities: {
      beds: { available: 15, total: 100, required: 110 },
      icus: { available: 2, total: 20, required: 25 },
      vaccines: { available: 1200, required: 5000 },
      oxygen: { available: 45, required: 100 },
      nurses: { available: 8, total: 50, required: 60 },
      diagnosticKits: { available: 300, required: 1000 },
      staffMembers: { available: 12, total: 80, required: 100 },
      doctors: { available: 5, total: 15, required: 20 }
    },
    nearbyHospitals: [
      { id: 'h-1', name: 'Apollo Health City', distance: 5.2, icuAvailable: 12, oxygenAvailable: 80, bedsAvailable: 45 },
      { id: 'h-2', name: 'Care Hospitals', distance: 3.8, icuAvailable: 5, oxygenAvailable: 30, bedsAvailable: 20 }
    ],
    trends: [
      { date: '2024-01', occupancyRate: 45, resourceStrain: 30 },
      { date: '2024-02', occupancyRate: 65, resourceStrain: 55 },
      { date: '2024-03', occupancyRate: 85, resourceStrain: 80 },
    ]
  },
  {
    id: 'reg-2',
    name: 'Emergency & Trauma Center',
    lastUpdated: new Date().toISOString(),
    coordinates: { lat: 17.3855, lng: 78.4870 },
    facilities: {
      beds: { available: 65, total: 100, required: 80 },
      icus: { available: 12, total: 15, required: 18 },
      vaccines: { available: 5000, required: 4000 },
      oxygen: { available: 120, required: 100 },
      nurses: { available: 25, total: 30, required: 35 },
      diagnosticKits: { available: 1500, required: 1000 },
      staffMembers: { available: 40, total: 50, required: 55 },
      doctors: { available: 12, total: 15, required: 18 }
    },
    nearbyHospitals: [
      { id: 'h-3', name: 'NIMS Hospital', distance: 2.1, icuAvailable: 8, oxygenAvailable: 50, bedsAvailable: 30 },
      { id: 'h-4', name: 'Yashoda Hospitals', distance: 4.5, icuAvailable: 15, oxygenAvailable: 120, bedsAvailable: 60 }
    ],
    trends: [
      { date: '2024-01', occupancyRate: 20, resourceStrain: 15 },
      { date: '2024-02', occupancyRate: 25, resourceStrain: 18 },
      { date: '2024-03', occupancyRate: 35, resourceStrain: 22 },
    ]
  },
  {
    id: 'reg-3',
    name: 'Specialized Maternity Wing',
    lastUpdated: new Date().toISOString(),
    coordinates: { lat: 17.3860, lng: 78.4875 },
    facilities: {
      beds: { available: 35, total: 120, required: 50 },
      icus: { available: 5, total: 25, required: 10 },
      vaccines: { available: 800, required: 2000 },
      oxygen: { available: 30, required: 50 },
      nurses: { available: 15, total: 60, required: 70 },
      diagnosticKits: { available: 200, required: 500 },
      staffMembers: { available: 20, total: 100, required: 110 },
      doctors: { available: 8, total: 25, required: 30 }
    },
    nearbyHospitals: [
      { id: 'h-5', name: 'Rainbow Childrens Hospital', distance: 1.5, icuAvailable: 20, oxygenAvailable: 40, bedsAvailable: 50 }
    ],
    trends: [
      { date: '2024-01', occupancyRate: 40, resourceStrain: 45 },
      { date: '2024-02', occupancyRate: 55, resourceStrain: 60 },
      { date: '2024-03', occupancyRate: 70, resourceStrain: 75 },
    ]
  },
  {
    id: 'reg-4',
    name: 'General Outpatient (OPD)',
    lastUpdated: new Date().toISOString(),
    coordinates: { lat: 17.3865, lng: 78.4880 },
    facilities: {
      beds: { available: 80, total: 100, required: 50 },
      icus: { available: 8, total: 10, required: 5 },
      vaccines: { available: 300, required: 1000 },
      oxygen: { available: 15, required: 30 },
      nurses: { available: 10, total: 12, required: 15 },
      diagnosticKits: { available: 100, required: 500 },
      staffMembers: { available: 15, total: 20, required: 25 },
      doctors: { available: 4, total: 10, required: 12 }
    },
    nearbyHospitals: [
      { id: 'h-6', name: 'Continental Hospitals', distance: 6.8, icuAvailable: 10, oxygenAvailable: 60, bedsAvailable: 40 }
    ],
    trends: [
      { date: '2024-01', occupancyRate: 10, resourceStrain: 10 },
      { date: '2024-02', occupancyRate: 15, resourceStrain: 12 },
      { date: '2024-03', occupancyRate: 20, resourceStrain: 15 },
    ]
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    experience: '15 years',
    availability: 'Available',
    contact: '+91 98765 43210',
    department: 'General Medicine',
    image: 'https://picsum.photos/seed/doc1/200/200'
  },
  {
    id: 'd2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    experience: '12 years',
    availability: 'In Surgery',
    contact: '+91 98765 43211',
    department: 'Emergency & Trauma',
    image: 'https://picsum.photos/seed/doc2/200/200'
  },
  {
    id: 'd3',
    name: 'Dr. Priya Sharma',
    specialty: 'Pediatrics',
    experience: '8 years',
    availability: 'On Call',
    contact: '+91 98765 43212',
    department: 'Pediatrics',
    image: 'https://picsum.photos/seed/doc3/200/200'
  },
  {
    id: 'd4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    experience: '20 years',
    availability: 'Available',
    contact: '+91 98765 43213',
    department: 'Emergency & Trauma',
    image: 'https://picsum.photos/seed/doc4/200/200'
  },
  {
    id: 'd5',
    name: 'Dr. Anita Desai',
    specialty: 'Obstetrics & Gynecology',
    experience: '10 years',
    availability: 'Available',
    contact: '+91 98765 43214',
    department: 'Specialized Maternity Wing',
    image: 'https://picsum.photos/seed/doc5/200/200'
  }
];

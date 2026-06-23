export type UserRole = 'Doctor' | 'Nurse' | 'Administrator' | 'Lab Technician' | 'Ward Staff';

export interface User {
  name: string;
  role: UserRole;
  hospitalId: string;
  department: string;
  language: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: Date;
  read: boolean;
  category: 'Resource' | 'Patient' | 'System';
}

export interface WardTask {
  id: string;
  title: string;
  patientName: string;
  bedNumber: string;
  status: 'pending' | 'completed';
  assignedTo: string;
  dueTime: string;
}

export interface PatientTimelineEvent {
  id: string;
  patientId: string;
  stage: 'Registration' | 'Admission' | 'Bed/ICU' | 'Lab' | 'Discharge';
  timestamp: Date;
  status: 'completed' | 'current' | 'pending';
  note?: string;
}

export interface TransferRecommendation {
  id: string;
  hospitalName: string;
  distance: string;
  availableBeds: number;
  availableICUs: number;
  oxygenLevel: string;
  eta: string;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: Date;
  department: string;
}

export interface HospitalFacilities {
  beds: { available: number; total: number; required: number };
  icus: { available: number; total: number; required: number };
  vaccines: { available: number; required: number };
  oxygen: { available: number; required: number }; // cylinders
  nurses: { available: number; total: number; required: number };
  diagnosticKits: { available: number; required: number };
  staffMembers: { available: number; total: number; required: number };
  doctors: { available: number; total: number; required: number };
}

export interface NearbyHospital {
  id: string;
  name: string;
  distance: number; // in km
  icuAvailable: number;
  oxygenAvailable: number;
  bedsAvailable: number;
}

export interface RegionData {
  id: string;
  name: string;
  lastUpdated: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  facilities: HospitalFacilities;
  nearbyHospitals: NearbyHospital[];
}

export interface FacilityTrend {
  date: string;
  occupancyRate: number; // percentage of beds used
  resourceStrain: number; // 0-100
}

export interface RegionAssessment extends RegionData {
  trends: FacilityTrend[];
}

export interface FacilityPrediction {
  facilityType: string;
  quantityNeeded: string;
  urgency: 'Critical' | 'High' | 'Moderate';
  governmentRequest: string;
  impact: string;
}

export interface AIInsight {
  summary: string;
  recommendations: string[];
  resourceAllocation: {
    item: string;
    priority: 'Low' | 'Medium' | 'High';
    reason: string;
  }[];
  facilityPredictions: FacilityPrediction[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  availability: 'Available' | 'On Call' | 'In Surgery' | 'Off Duty';
  contact: string;
  image?: string;
  department: string;
}

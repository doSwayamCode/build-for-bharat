/**
 * Location-based District Detection
 * Automatically detects user's district using browser geolocation
 */

interface DistrictLocation {
  code: string;
  name: string;
  stateCode: string;
  stateName: string;
  latitude: number;
  longitude: number;
  radius: number; // km
}

// District coordinates (approximate center points) - UPDATED TO MATCH BACKEND CODES
const DISTRICT_LOCATIONS: DistrictLocation[] = [
  // Rajasthan
  { code: 'RAJ001', name: 'Jaipur', stateCode: 'RAJ', stateName: 'Rajasthan', latitude: 26.9124, longitude: 75.7873, radius: 50 },
  { code: 'RAJ002', name: 'Udaipur', stateCode: 'RAJ', stateName: 'Rajasthan', latitude: 24.5854, longitude: 73.7125, radius: 50 },
  { code: 'RAJ003', name: 'Jodhpur', stateCode: 'RAJ', stateName: 'Rajasthan', latitude: 26.2389, longitude: 73.0243, radius: 50 },
  { code: 'RAJ004', name: 'Ajmer', stateCode: 'RAJ', stateName: 'Rajasthan', latitude: 26.4499, longitude: 74.6399, radius: 40 },
  { code: 'RAJ005', name: 'Alwar', stateCode: 'RAJ', stateName: 'Rajasthan', latitude: 27.5530, longitude: 76.6346, radius: 40 },
  
  // Uttar Pradesh
  { code: 'UP001', name: 'Lucknow', stateCode: 'UP', stateName: 'Uttar Pradesh', latitude: 26.8467, longitude: 80.9462, radius: 50 },
  { code: 'UP002', name: 'Kanpur', stateCode: 'UP', stateName: 'Uttar Pradesh', latitude: 26.4499, longitude: 80.3319, radius: 50 },
  { code: 'UP003', name: 'Agra', stateCode: 'UP', stateName: 'Uttar Pradesh', latitude: 27.1767, longitude: 78.0081, radius: 40 },
  { code: 'UP004', name: 'Meerut', stateCode: 'UP', stateName: 'Uttar Pradesh', latitude: 28.9845, longitude: 77.7064, radius: 40 },
  { code: 'UP005', name: 'Varanasi', stateCode: 'UP', stateName: 'Uttar Pradesh', latitude: 25.3176, longitude: 82.9739, radius: 40 },
  
  // Bihar
  { code: 'BIH001', name: 'Patna', stateCode: 'BIH', stateName: 'Bihar', latitude: 25.5941, longitude: 85.1376, radius: 50 },
  { code: 'BIH002', name: 'Gaya', stateCode: 'BIH', stateName: 'Bihar', latitude: 24.7955, longitude: 84.9994, radius: 40 },
  { code: 'BIH003', name: 'Muzaffarpur', stateCode: 'BIH', stateName: 'Bihar', latitude: 26.1225, longitude: 85.3906, radius: 40 },
  { code: 'BIH004', name: 'Darbhanga', stateCode: 'BIH', stateName: 'Bihar', latitude: 26.1542, longitude: 85.8918, radius: 40 },
  { code: 'BIH005', name: 'Bhagalpur', stateCode: 'BIH', stateName: 'Bihar', latitude: 25.2425, longitude: 86.9842, radius: 40 },
  
  // Madhya Pradesh
  { code: 'MP001', name: 'Bhopal', stateCode: 'MP', stateName: 'Madhya Pradesh', latitude: 23.2599, longitude: 77.4126, radius: 50 },
  { code: 'MP002', name: 'Indore', stateCode: 'MP', stateName: 'Madhya Pradesh', latitude: 22.7196, longitude: 75.8577, radius: 50 },
  { code: 'MP003', name: 'Jabalpur', stateCode: 'MP', stateName: 'Madhya Pradesh', latitude: 23.1815, longitude: 79.9864, radius: 40 },
  { code: 'MP004', name: 'Gwalior', stateCode: 'MP', stateName: 'Madhya Pradesh', latitude: 26.2183, longitude: 78.1828, radius: 40 },
  { code: 'MP005', name: 'Ujjain', stateCode: 'MP', stateName: 'Madhya Pradesh', latitude: 23.1765, longitude: 75.7885, radius: 40 },
  
  // Odisha
  { code: 'OD001', name: 'Bhubaneswar', stateCode: 'OD', stateName: 'Odisha', latitude: 20.2961, longitude: 85.8245, radius: 50 },
  { code: 'OD002', name: 'Cuttack', stateCode: 'OD', stateName: 'Odisha', latitude: 20.4625, longitude: 85.8830, radius: 40 },
  { code: 'OD003', name: 'Berhampur', stateCode: 'OD', stateName: 'Odisha', latitude: 19.3150, longitude: 84.7941, radius: 40 },
  { code: 'OD004', name: 'Sambalpur', stateCode: 'OD', stateName: 'Odisha', latitude: 21.4669, longitude: 83.9812, radius: 40 },
  { code: 'OD005', name: 'Rourkela', stateCode: 'OD', stateName: 'Odisha', latitude: 22.2604, longitude: 84.8536, radius: 40 },
  
  // Jharkhand
  { code: 'JH001', name: 'Ranchi', stateCode: 'JH', stateName: 'Jharkhand', latitude: 23.3441, longitude: 85.3096, radius: 50 },
  { code: 'JH002', name: 'Jamshedpur', stateCode: 'JH', stateName: 'Jharkhand', latitude: 22.8046, longitude: 86.2029, radius: 40 },
  { code: 'JH003', name: 'Dhanbad', stateCode: 'JH', stateName: 'Jharkhand', latitude: 23.7957, longitude: 86.4304, radius: 40 },
  { code: 'JH004', name: 'Bokaro', stateCode: 'JH', stateName: 'Jharkhand', latitude: 23.6693, longitude: 86.1511, radius: 40 },
  { code: 'JH005', name: 'Deoghar', stateCode: 'JH', stateName: 'Jharkhand', latitude: 24.4854, longitude: 86.6947, radius: 40 },
  
  // West Bengal
  { code: 'WB001', name: 'Kolkata', stateCode: 'WB', stateName: 'West Bengal', latitude: 22.5726, longitude: 88.3639, radius: 50 },
  { code: 'WB002', name: 'Howrah', stateCode: 'WB', stateName: 'West Bengal', latitude: 22.5958, longitude: 88.2636, radius: 40 },
  { code: 'WB003', name: 'Durgapur', stateCode: 'WB', stateName: 'West Bengal', latitude: 23.5204, longitude: 87.3119, radius: 40 },
  { code: 'WB004', name: 'Asansol', stateCode: 'WB', stateName: 'West Bengal', latitude: 23.6739, longitude: 86.9524, radius: 40 },
  { code: 'WB005', name: 'Siliguri', stateCode: 'WB', stateName: 'West Bengal', latitude: 26.7271, longitude: 88.3953, radius: 40 },
];

/**
 * Calculate distance between two points using Haversine formula
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Detect user's district from GPS coordinates
 */
export function detectDistrictFromLocation(latitude: number, longitude: number): DistrictLocation | null {
  let closestDistrict: DistrictLocation | null = null;
  let minDistance = Infinity;

  for (const district of DISTRICT_LOCATIONS) {
    const distance = calculateDistance(latitude, longitude, district.latitude, district.longitude);
    
    // If within district radius, return it
    if (distance <= district.radius && distance < minDistance) {
      closestDistrict = district;
      minDistance = distance;
    }
  }

  return closestDistrict;
}

/**
 * Get user's current location and detect district
 */
export async function getUserDistrict(): Promise<{
  success: boolean;
  district?: DistrictLocation;
  error?: string;
  latitude?: number;
  longitude?: number;
}> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        success: false,
        error: 'Geolocation not supported by browser / ब्राउज़र स्थान का समर्थन नहीं करता'
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const district = detectDistrictFromLocation(latitude, longitude);

        if (district) {
          resolve({
            success: true,
            district,
            latitude,
            longitude
          });
        } else {
          resolve({
            success: false,
            error: 'District not found for your location / आपके स्थान के लिए जिला नहीं मिला',
            latitude,
            longitude
          });
        }
      },
      (error) => {
        let errorMessage = 'Location access denied / स्थान पहुंच अस्वीकृत';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied / स्थान अनुमति अस्वीकृत';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location unavailable / स्थान उपलब्ध नहीं';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timeout / स्थान अनुरोध समय समाप्त';
            break;
        }

        resolve({
          success: false,
          error: errorMessage
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}

/**
 * Save detected location to localStorage
 */
export function saveDetectedLocation(district: DistrictLocation): void {
  localStorage.setItem('detectedDistrict', JSON.stringify(district));
  localStorage.setItem('detectedAt', new Date().toISOString());
}

/**
 * Get saved location from localStorage
 */
export function getSavedLocation(): DistrictLocation | null {
  try {
    const saved = localStorage.getItem('detectedDistrict');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading saved location:', e);
  }
  return null;
}

/**
 * Clear saved location
 */
export function clearSavedLocation(): void {
  localStorage.removeItem('detectedDistrict');
  localStorage.removeItem('detectedAt');
}

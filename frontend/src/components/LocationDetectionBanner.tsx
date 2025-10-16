import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDistrict, getSavedLocation, saveDetectedLocation, clearSavedLocation } from '../utils/locationDetector';

const LocationDetectionBanner: React.FC = () => {
  const navigate = useNavigate();
  const [detecting, setDetecting] = useState(false);
  const [detected, setDetected] = useState(getSavedLocation());
  const [error, setError] = useState<string>('');
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // Check if already detected
    const saved = getSavedLocation();
    if (saved) {
      setDetected(saved);
    }
  }, []);

  const handleDetectLocation = async () => {
    setDetecting(true);
    setError('');

    const result = await getUserDistrict();

    if (result.success && result.district) {
      setDetected(result.district);
      saveDetectedLocation(result.district);
      setError('');
    } else {
      setError(result.error || 'Unable to detect location');
    }

    setDetecting(false);
  };

  const handleViewMyDistrict = () => {
    if (detected) {
      navigate(`/state/${detected.stateCode}`);
    }
  };

  const handleClearLocation = () => {
    clearSavedLocation();
    setDetected(null);
    setError('');
  };

  if (!showBanner) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #2B5A33 0%, #1e4024 100%)',
      color: 'white',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '30px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      position: 'relative'
    }}>
      <button
        onClick={() => setShowBanner(false)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: 'white',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ✕
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '42px' }}>📍</div>
        
        <div style={{ flex: 1, minWidth: '250px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600' }}>
            Find Your District Automatically
          </h3>
          <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
            अपना जिला स्वचालित रूप से खोजें
          </p>
          
          {detected && (
            <div style={{
              marginTop: '10px',
              padding: '10px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px'
            }}>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>
                📌 Detected: {detected.name}, {detected.stateName}
              </p>
              <p style={{ margin: '5px 0 0 0', fontSize: '13px', opacity: 0.9 }}>
                पता लगाया: {detected.name}, {detected.stateName}
              </p>
            </div>
          )}

          {error && (
            <div style={{
              marginTop: '10px',
              padding: '10px',
              background: 'rgba(231,76,60,0.3)',
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              ⚠️ {error}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {!detected ? (
            <button
              onClick={handleDetectLocation}
              disabled={detecting}
              style={{
                padding: '12px 24px',
                background: 'white',
                color: '#2B5A33',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: detecting ? 'not-allowed' : 'pointer',
                opacity: detecting ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {detecting ? (
                <>
                  <span>🔄</span>
                  <span>Detecting... / पता लगाना...</span>
                </>
              ) : (
                <>
                  <span>📍</span>
                  <span>Detect My Location / मेरा स्थान पता करें</span>
                </>
              )}
            </button>
          ) : (
            <>
              <button
                onClick={handleViewMyDistrict}
                style={{
                  padding: '12px 24px',
                  background: 'white',
                  color: '#2B5A33',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                View My District / मेरा जिला देखें
              </button>
              <button
                onClick={handleClearLocation}
                style={{
                  padding: '12px 20px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Change / बदलें
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationDetectionBanner;

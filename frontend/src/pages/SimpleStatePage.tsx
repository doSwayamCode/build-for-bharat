import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

interface District {
  code: string;
  name: string;
  hindi_name: string;
  state_code: string;
  job_cards: number;
  active_workers: number;
  wage_expenditure: number;
}

interface StateInfo {
  code: string;
  name: string;
  hindi_name: string;
  district_count: number;
  total_job_cards: number;
  total_active_workers: number;
  total_wage_expenditure: number;
}

const SimpleStatePage: React.FC = () => {
  const { stateCode } = useParams<{ stateCode: string }>();
  const navigate = useNavigate();
  const [stateData, setStateData] = useState<{ state: StateInfo; districts: District[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    console.log('Fetching from:', `${API_URL}/api/states/${stateCode}`);
    fetch(`${API_URL}/api/states/${stateCode}`)
      .then(res => {
        console.log('Response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Data received:', data);
        if (data.success && data.data) {
          setStateData(data.data);
        } else {
          setError('No data received from API');
        }
      })
      .catch(err => {
        console.error('Fetch Error:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [stateCode]);

  if (loading) {
    return (
      <div style={{ 
        padding: '60px', 
        textAlign: 'center', 
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        minHeight: '100vh',
        background: '#f5f5f5'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏛️</div>
        <h2 style={{ fontSize: '28px', color: '#2B5A33', fontWeight: '600' }}>
          Loading... लोड हो रहा है...
        </h2>
      </div>
    );
  }

  if (!stateData) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        minHeight: '100vh',
        background: '#f5f5f5'
      }}>
        <h2 style={{ color: '#E74C3C', fontSize: '24px', fontWeight: '600' }}>
          State not found / राज्य नहीं मिला
        </h2>
        {error && (
          <p style={{ color: '#666', fontSize: '16px', marginTop: '10px' }}>
            Error: {error}
          </p>
        )}
        <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
          API URL: {API_URL}
        </p>
        <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
          State Code: {stateCode}
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            background: '#2B5A33',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          ← Back to Home / मुख्य पृष्ठ पर वापस जाएं
        </button>
      </div>
    );
  }

  const formatNumber = (num: number): string => {
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(1)} L`;
    }
    return num.toLocaleString('en-IN');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        background: '#2B5A33',
        color: 'white',
        padding: '20px 30px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '700' }}>
              🏛️ MGNREGA Portal
            </h1>
            <p style={{ margin: '5px 0 0 0', fontSize: '16px', opacity: 0.9 }}>
              हमारी आवाज़, हमारे अधिकार
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '10px 20px',
              background: 'white',
              color: '#2B5A33',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            ← Home / मुख्य पृष्ठ
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* State Header */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '64px', marginBottom: '15px' }}>🏛️</div>
            <h2 style={{ 
              color: '#2B5A33', 
              fontSize: '36px', 
              fontWeight: '700',
              margin: '0 0 10px 0'
            }}>
              {stateData.state.name}
            </h2>
            <p style={{ 
              color: '#4A7C59', 
              fontSize: '28px', 
              fontWeight: '600',
              margin: 0
            }}>
              {stateData.state.hindi_name}
            </p>
          </div>

          {/* State Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}>
            <div style={{
              background: '#E8F5E8',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              border: '2px solid #C5E8C5'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#2B5A33' }}>
                {formatNumber(stateData.state.total_job_cards)}
              </div>
              <div style={{ fontSize: '14px', color: '#555', fontWeight: '600', marginTop: '8px' }}>
                Job Cards / जॉब कार्ड
              </div>
            </div>

            <div style={{
              background: '#E8F5E8',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              border: '2px solid #C5E8C5'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#2B5A33' }}>
                {formatNumber(stateData.state.total_active_workers)}
              </div>
              <div style={{ fontSize: '14px', color: '#555', fontWeight: '600', marginTop: '8px' }}>
                Active Workers / सक्रिय श्रमिक
              </div>
            </div>

            <div style={{
              background: '#E8F5E8',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              border: '2px solid #C5E8C5'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#2B5A33' }}>
                ₹{formatNumber(stateData.state.total_wage_expenditure)}
              </div>
              <div style={{ fontSize: '14px', color: '#555', fontWeight: '600', marginTop: '8px' }}>
                Wage Expenditure / मजदूरी खर्च
              </div>
            </div>

            <div style={{
              background: '#E8F5E8',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              border: '2px solid #C5E8C5'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#2B5A33' }}>
                {stateData.state.district_count}
              </div>
              <div style={{ fontSize: '14px', color: '#555', fontWeight: '600', marginTop: '8px' }}>
                Districts / जिले
              </div>
            </div>
          </div>
        </div>

        {/* Districts Section */}
        <div>
          <h3 style={{
            color: '#2B5A33',
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '3px solid #4A7C59'
          }}>
            Districts / जिले ({stateData.districts.length})
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {stateData.districts.map((district) => (
              <div
                key={district.code}
                style={{
                  background: 'white',
                  border: '2px solid #4A7C59',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <h4 style={{
                  color: '#2B5A33',
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: '0 0 5px 0'
                }}>
                  {district.name}
                </h4>
                <p style={{
                  color: '#4A7C59',
                  fontSize: '16px',
                  fontWeight: '600',
                  margin: '0 0 15px 0'
                }}>
                  {district.hindi_name}
                </p>

                <div style={{ borderTop: '1px solid #E8F5E8', paddingTop: '15px' }}>
                  <div style={{ marginBottom: '10px', fontSize: '14px', color: '#333' }}>
                    <strong style={{ color: '#2B5A33' }}>Job Cards:</strong> {formatNumber(district.job_cards)}
                  </div>
                  <div style={{ marginBottom: '10px', fontSize: '14px', color: '#333' }}>
                    <strong style={{ color: '#2B5A33' }}>Workers:</strong> {formatNumber(district.active_workers)}
                  </div>
                  <div style={{ fontSize: '14px', color: '#333' }}>
                    <strong style={{ color: '#2B5A33' }}>Wages:</strong> ₹{formatNumber(district.wage_expenditure)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleStatePage;

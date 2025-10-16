import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from "../config";
import LocationDetectionBanner from '../components/LocationDetectionBanner';

interface State {
  code: string;
  name: string;
  hindi_name: string;
  district_count: number;
  total_workers: number;
}

interface Stats {
  total_job_cards: number;
  total_active_workers: number;
  total_work_completion_rate: number;
  average_wage_rate: number;
}

const StructuredHomePage: React.FC = () => {
  const [states, setStates] = useState<State[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    // Fetch both states and national stats from API
    console.log('Homepage - API_URL:', API_URL);
    Promise.all([
      fetch(`${API_URL}/api/states`).then(res => {
        console.log('States response status:', res.status);
        return res.json();
      }),
      fetch(`${API_URL}/api/stats`).then(res => {
        console.log('Stats response status:', res.status);
        return res.json();
      })
    ])
      .then(([statesData, statsData]) => {
        console.log('States data:', statesData);
        console.log('Stats data:', statsData);
        if (statesData.success && statesData.data) {
          setStates(statesData.data);
          setApiConnected(true);
        }
        if (statsData.success && statsData.data) {
          setStats(statsData.data);
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
        // Fallback data
        setStates([
          { code: 'RAJ', name: 'Rajasthan', hindi_name: 'राजस्थान', district_count: 33, total_workers: 2500000 },
          { code: 'UP', name: 'Uttar Pradesh', hindi_name: 'उत्तर प्रदेश', district_count: 75, total_workers: 5000000 },
          { code: 'BIH', name: 'Bihar', hindi_name: 'बिहार', district_count: 38, total_workers: 3000000 },
          { code: 'MP', name: 'Madhya Pradesh', hindi_name: 'मध्य प्रदेश', district_count: 52, total_workers: 2800000 },
          { code: 'OD', name: 'Odisha', hindi_name: 'ओडिशा', district_count: 30, total_workers: 1800000 },
          { code: 'JH', name: 'Jharkhand', hindi_name: 'झारखंड', district_count: 24, total_workers: 1200000 },
          { code: 'WB', name: 'West Bengal', hindi_name: 'पश्चिम बंगाल', district_count: 23, total_workers: 2200000 }
        ]);
        setStats({
          total_job_cards: 12150000,
          total_active_workers: 10127500,
          total_work_completion_rate: 76.8,
          average_wage_rate: 220
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 10000000) return (num / 10000000).toFixed(2) + ' Cr';
    if (num >= 100000) return (num / 100000).toFixed(2) + ' L';
    if (num >= 1000) return (num / 1000).toFixed(2) + ' K';
    return num.toString();
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #2B5A33 0%, #4A7C59 100%)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <div style={{ 
          fontSize: '80px', 
          marginBottom: '30px',
          animation: 'pulse 2s infinite'
        }}>
          🏛️
        </div>
        <h2 style={{ 
          fontSize: '32px',
          color: 'white',
          fontWeight: '600',
          margin: '0',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          Loading MGNREGA Portal...
        </h2>
        <p style={{
          fontSize: '20px',
          color: 'rgba(255,255,255,0.9)',
          marginTop: '10px',
          fontWeight: '500'
        }}>
          लोड हो रहा है...
        </p>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#f5f5f5',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Hero Section with National Stats */}
      <header style={{
        background: 'linear-gradient(135deg, #2B5A33 0%, #4A7C59 100%)',
        color: 'white',
        padding: '60px 20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '48px', 
                fontWeight: '700',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                🏛️ MGNREGA Portal
              </h1>
              <p style={{ 
                margin: '12px 0 0 0', 
                fontSize: '24px',
                fontWeight: '500',
                opacity: '0.95'
              }}>
                महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम
              </p>
              <p style={{
                margin: '8px 0 0 0',
                fontSize: '20px',
                fontWeight: '500',
                opacity: '0.9'
              }}>
                हमारी आवाज़, हमारे अधिकार | Our Voice, Our Rights
              </p>
            </div>
            <Link to="/about" style={{
              padding: '16px 32px',
              background: 'white',
              color: '#2B5A33',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              marginTop: '20px',
              transition: 'transform 0.2s',
              display: 'inline-block'
            }}>
              ℹ️ About / जानकारी
            </Link>
          </div>

          {/* National Statistics Dashboard */}
          {stats && (
            <div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '20px',
                opacity: '0.95'
              }}>
                📊 National Statistics / राष्ट्रीय आंकड़े
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '42px', marginBottom: '12px' }}>📋</div>
                  <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
                    {formatNumber(stats.total_job_cards)}
                  </div>
                  <div style={{ fontSize: '18px', opacity: '0.9' }}>Total Job Cards</div>
                  <div style={{ fontSize: '16px', marginTop: '4px', opacity: '0.8' }}>कुल जॉब कार्ड</div>
                </div>
                
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '42px', marginBottom: '12px' }}>👷</div>
                  <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
                    {formatNumber(stats.total_active_workers)}
                  </div>
                  <div style={{ fontSize: '18px', opacity: '0.9' }}>Active Workers</div>
                  <div style={{ fontSize: '16px', marginTop: '4px', opacity: '0.8' }}>सक्रिय श्रमिक</div>
                </div>
                
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '42px', marginBottom: '12px' }}>✅</div>
                  <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
                    {stats.total_work_completion_rate}%
                  </div>
                  <div style={{ fontSize: '18px', opacity: '0.9' }}>Work Completion</div>
                  <div style={{ fontSize: '16px', marginTop: '4px', opacity: '0.8' }}>कार्य पूर्णता</div>
                </div>
                
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '42px', marginBottom: '12px' }}>💰</div>
                  <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
                    ₹{stats.average_wage_rate}
                  </div>
                  <div style={{ fontSize: '18px', opacity: '0.9' }}>Average Wage/Day</div>
                  <div style={{ fontSize: '16px', marginTop: '4px', opacity: '0.8' }}>औसत मजदूरी</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* States Selection Section */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{ 
            color: '#2B5A33', 
            fontSize: '40px',
            fontWeight: '700',
            marginBottom: '16px'
          }}>
            राज्य चुनें / Select Your State
          </h2>
          <p style={{ 
            color: '#555', 
            fontSize: '22px',
            fontWeight: '500',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            अपने राज्य पर क्लिक करें और जिले का विवरण देखें<br/>
            Click on your state to view district-wise information
          </p>
        </div>

        {/* Location Detection Banner */}
        <LocationDetectionBanner />

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '30px' 
        }}>
          {states.map((state, index) => (
            <Link
              key={state.code}
              to={`/state/${state.code}`}
              style={{ 
                textDecoration: 'none',
                background: 'white',
                border: '3px solid #E8F5E8',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                display: 'block',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(43,90,51,0.2)';
                e.currentTarget.style.borderColor = '#2B5A33';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#E8F5E8';
              }}
            >
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#2B5A33',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: '700'
              }}>
                {index + 1}
              </div>
              
              <div style={{ 
                fontSize: '56px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                🏛️
              </div>
              
              <h3 style={{ 
                color: '#2B5A33', 
                fontSize: '32px',
                fontWeight: '700',
                margin: '0 0 10px 0',
                textAlign: 'center'
              }}>
                {state.name}
              </h3>
              
              <p style={{ 
                color: '#4A7C59', 
                fontSize: '24px',
                fontWeight: '600',
                margin: '0 0 24px 0',
                textAlign: 'center'
              }}>
                {state.hindi_name}
              </p>
              
              <div style={{ 
                borderTop: '3px solid #E8F5E8',
                paddingTop: '20px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                fontSize: '16px',
                color: '#666',
                fontWeight: '500'
              }}>
                <div style={{
                  background: '#F8FBF8',
                  padding: '16px',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ color: '#2B5A33', fontWeight: '700', fontSize: '26px', marginBottom: '6px' }}>
                    {state.district_count}
                  </div>
                  <div style={{ fontSize: '14px' }}>Districts</div>
                  <div style={{ fontSize: '13px', color: '#888' }}>जिले</div>
                </div>
                <div style={{
                  background: '#F8FBF8',
                  padding: '16px',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ color: '#2B5A33', fontWeight: '700', fontSize: '26px', marginBottom: '6px' }}>
                    {formatNumber(state.total_workers)}
                  </div>
                  <div style={{ fontSize: '14px' }}>Workers</div>
                  <div style={{ fontSize: '13px', color: '#888' }}>श्रमिक</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* API Status Badge */}
        <div style={{ 
          marginTop: '70px', 
          padding: '40px', 
          background: apiConnected 
            ? 'linear-gradient(135deg, #E8F5E8 0%, #D4EBD4 100%)' 
            : 'linear-gradient(135deg, #FFF3CD 0%, #FFEAA7 100%)', 
          borderRadius: '20px',
          textAlign: 'center',
          border: apiConnected ? '3px solid #C5E8C5' : '3px solid #FFD93D',
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
            {apiConnected ? '✅' : '⚠️'}
          </div>
          <p style={{ 
            margin: 0, 
            color: apiConnected ? '#2B5A33' : '#856404', 
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '12px'
          }}>
            {apiConnected ? '🌐 Live API Data Connected' : '💾 Using Fallback Data'}
          </p>
          <p style={{ 
            margin: 0, 
            color: apiConnected ? '#4A7C59' : '#997404', 
            fontSize: '18px',
            fontWeight: '500'
          }}>
            {apiConnected 
              ? `Backend API: http://localhost:3001 | ${states.length} States Available`
              : 'Backend API unavailable - Showing cached data'
            }
          </p>
          <p style={{
            margin: '16px 0 0 0',
            color: '#666',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Real-time MGNREGA data powered by Government API<br/>
            सरकारी API द्वारा संचालित वास्तविक समय मनरेगा डेटा
          </p>
        </div>
      </main>
    </div>
  );
};

export default StructuredHomePage;

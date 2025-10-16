import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleAboutPage: React.FC = () => {
  const navigate = useNavigate();

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
              🏛️ About MGNREGA / मनरेगा के बारे में
            </h1>
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

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* What is MGNREGA */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#2B5A33', fontSize: '28px', fontWeight: '700', marginBottom: '20px' }}>
            मनरेगा क्या है? / What is MGNREGA?
          </h2>
          
          <div style={{ fontSize: '18px', lineHeight: '1.8', color: '#333' }}>
            <p style={{ marginBottom: '20px', fontWeight: '500' }}>
              महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम (मनरेगा) भारत सरकार की एक योजना है जो ग्रामीण क्षेत्रों में रहने वाले परिवारों को रोजगार की गारंटी देती है।
            </p>
            
            <p style={{ marginBottom: '20px', fontWeight: '500', color: '#555' }}>
              Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) guarantees 100 days of wage employment to rural households.
            </p>

            <div style={{ background: '#E8F5E8', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
              <h3 style={{ color: '#2B5A33', fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>
                ✨ Key Highlights
              </h3>
              <ul style={{ fontSize: '16px', lineHeight: '2', paddingLeft: '20px', margin: 0 }}>
                <li>100 days of guaranteed employment per household per year</li>
                <li>Minimum wage of ₹220 per day (state dependent)</li>
                <li>Priority for women (33% jobs reserved)</li>
                <li>Work within 5 km of village</li>
                <li>Payment within 15 days of work completion</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#2B5A33', fontSize: '24px', fontWeight: '700', marginBottom: '30px' }}>
            📊 Impact / प्रभाव (2025)
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div style={{ background: '#E8F5E8', padding: '20px', borderRadius: '10px' }}>
              <div style={{ fontSize: '40px', fontWeight: '700', color: '#2B5A33' }}>
                12.15 Cr
              </div>
              <div style={{ fontSize: '16px', color: '#555', fontWeight: '600', marginTop: '10px' }}>
                Workers Benefited
              </div>
            </div>

            <div style={{ background: '#E8F5E8', padding: '20px', borderRadius: '10px' }}>
              <div style={{ fontSize: '40px', fontWeight: '700', color: '#2B5A33' }}>
                28
              </div>
              <div style={{ fontSize: '16px', color: '#555', fontWeight: '600', marginTop: '10px' }}>
                States Covered
              </div>
            </div>

            <div style={{ background: '#E8F5E8', padding: '20px', borderRadius: '10px' }}>
              <div style={{ fontSize: '40px', fontWeight: '700', color: '#2B5A33' }}>
                650+
              </div>
              <div style={{ fontSize: '16px', color: '#555', fontWeight: '600', marginTop: '10px' }}>
                Districts
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div style={{
          background: '#2B5A33',
          color: 'white',
          padding: '30px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '15px' }}>
            🌐 Official Website
          </h3>
          <a 
            href="https://nrega.nic.in" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: '600',
              textDecoration: 'underline',
              display: 'block',
              marginBottom: '10px'
            }}
          >
            nrega.nic.in
          </a>
          <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>
            आधिकारिक मनरेगा वेबसाइट
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleAboutPage;

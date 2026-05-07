const Loader = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh', 
      flexDirection: 'column' 
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid #1e293b',
        borderTop: '5px solid #e50914',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{ marginTop: '15px', color: '#94a3b8' }}>Fetching from the database...</p>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
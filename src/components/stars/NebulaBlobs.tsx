export default function NebulaBlobs() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '-200px',
          right: '-100px',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: '#C084FC',
          filter: 'blur(120px)',
          opacity: 0.07,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '-100px',
          left: '200px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: '#7FECDC',
          filter: 'blur(120px)',
          opacity: 0.07,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: '300px',
          left: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: '#FFD97D',
          filter: 'blur(120px)',
          opacity: 0.06,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}

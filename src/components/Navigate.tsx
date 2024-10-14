import { useLocation, useNavigate } from 'react-router-dom';

function HomeIcon() {
    const location = useLocation();
    const navigate = useNavigate();
    if (location.pathname === '/' || location.pathname === '/login') {
      return null;
    }
    return (
      <div
        onClick={() => navigate('/')}
        style={{ 
        position: 'absolute',
        top: '10px',
        left: '10px',
        cursor: 'pointer',
        fontSize: '2rem',
        border: '2px solid black',
        borderRadius: '8px',
        padding: '8px',
        display: 'inline-block' }}
      >
        🏠
      </div>
    );
}

export default HomeIcon;

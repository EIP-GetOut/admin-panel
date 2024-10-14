import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@chakra-ui/react'
import { IoMdHome } from 'react-icons/io';

function HomeButton() {
    const location = useLocation();
    const navigate = useNavigate();
    if (location.pathname === '/' || location.pathname === '/login') {
      return null;
    }
    return (
      <Icon sx={{
            position: 'absolute',
            top: '5px',
            right: '10px',
            cursor: 'pointer',
            fontSize: '3rem',
            border: '2px solid black',
            borderRadius: '8px',
            padding: '3px',
            display: 'inline-block'
      }} as={IoMdHome}
          onClick={() => navigate('/')}
         />
    );
}

export default HomeButton;

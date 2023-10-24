import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Image, Center, Text, Divider } from '@chakra-ui/react';


const Header: React.FC = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const handleModeration = () => {
        navigate('/moderation');
    }

    const handleUsers = () => {
        navigate('/users');
    }

    const handleHistory = () => {
        navigate('/history');
    }

    return (
        <Box bgImage="pictures/background.png" backgroundSize="cover" h="calc(10vh)" display='flex' justifyContent='center'>
            <Center>
            <Link to="/moderation">
                <Image height={'calc(8vh)'} src="pictures/icons/Moderation.png" onClick={handleModeration} />
                <Text marginLeft={3} fontFamily="Roboto" fontStyle={ location.pathname === '/moderation' ? 'italic' : 'normal'}> Moderation </Text>
                {location.pathname === '/moderation' && (
                    <Divider
                      bottom="5"
                      borderColor="black.500"
                      borderWidth="5px"
                      opacity="1"
                    />
                )}
            </Link>
            <Link to="/history">
                <Image marginLeft={400} height={'calc(8vh)'} src="pictures/icons/History.png" onClick={handleHistory} />
                <Text marginLeft={440} fontFamily="Roboto"> History </Text>
                {location.pathname === '/history' && (
                    <Divider marginLeft={400}
                      bottom="5"
                      width="20%"
                      borderColor="black.500"
                      borderWidth="5px"
                      opacity="1"
                    />
                )}
            </Link>
            <Link to="/users">
                <Image marginLeft={400} height={'calc(8vh)'} src="pictures/icons/User.png" onClick={handleUsers} />
                <Text marginLeft={440} fontFamily="Roboto"> Users </Text>
                {location.pathname === '/users' && (
                    <Divider marginLeft={400}
                      bottom="5"
                      width="20%"
                      borderColor="black.500"
                      borderWidth="5px"
                      opacity="1"
                    />
                )}
            </Link>
            </Center>
        </Box>
    );
};

export default Header;

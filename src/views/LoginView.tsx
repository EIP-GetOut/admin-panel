import {
  Flex,
  Image,
  Box,
  Center,
  Button,
  Text,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  const navigate = useNavigate();
  const handleModeration = () => {
    navigate("/moderation");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    // Add your custom logic here
    handleModeration();
    alert("Form submitted!"); // Example alert
  };

  return (
  
    <Flex>
      {/* Left Half */}
      <Box
        flex={1}
        bgImage="pictures/background.png"
        backgroundSize="cover"
        w="100%"
        h="100vh"
        objectFit="cover"
      >
        <Center>
          <Image
            marginTop={624}
            height={"calc(10vh)"}
            src="pictures/getOutBackOfficeLogo.png"
          />
        </Center>
      </Box>

      {/* Right Half */}
      <Box flex={1} bg="white" h="100vh">
        <Center h="45vh">
          <Text fontSize="3xl" as="u">
            LOG IN
          </Text>
        </Center>
        <Container maxW="container.md">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="mail">ADRESSE MAIL</FormLabel>
              <Input
                type="text"
                id="name"
                placeholder="Entrez votre adresse mail"
                mb={4}
              />
              <FormLabel htmlFor="email">MOT DE PASSE</FormLabel>
              <Input
                type="email"
                id="email"
                placeholder="Entrez votre mot de passe"
                mb={4}
              />
              <Center>
                <Button colorScheme="blue" type="submit">
                  Submit
                </Button>
              </Center>
            </FormControl>
          </form>
        </Container>
      </Box>
    </Flex>
  );
};

export default LoginView;

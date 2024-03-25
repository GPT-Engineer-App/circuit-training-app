import React, { useState } from "react";
import { Box, Heading, Text, VStack, Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const StartScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleStartWorkout = () => {
    navigate("/workout");
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    console.log("Name:", name);
    console.log("Email:", email);
    setName("");
    setEmail("");
  };

  return (
    <Box maxWidth="600px" margin="0 auto" padding={8}>
      <VStack spacing={6}>
        <Heading as="h1" size="xl" textAlign="center">
          Welcome to MovLab Circuit Training
        </Heading>
        <Text textAlign="center">Get ready to challenge yourself with a comprehensive workout session focusing on lower body power, core stability, and lateral strength.</Text>
        <Button onClick={handleStartWorkout} colorScheme="blue" size="lg">
          Start Workout
        </Button>
        <Box width="100%">
          <Heading as="h2" size="md" textAlign="center" marginBottom={4}>
            Participant Sign Up
          </Heading>
          <form onSubmit={handleSignUp}>
            <VStack spacing={4}>
              <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Button type="submit" colorScheme="green">
                Sign Up
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Box>
  );
};

export default StartScreen;

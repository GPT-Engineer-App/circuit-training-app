import React, { useState } from "react";
import { Box, Heading, Text, VStack, Button, Input, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { addParticipant } from "../db";

const StartScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleStartWorkout = () => {
    navigate("/workout");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Removed try-catch block since we are simulating with promises and not using async-await here
    addParticipant(name, email)
      .then(() => {
        toast({
          title: "Sign Up Successful",
          description: "Welcome! Starting your workout now.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/workout");
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        toast({
          title: "Sign Up Error",
          description: "An error occurred while signing up. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
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

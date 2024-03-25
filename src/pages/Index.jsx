import React, { useState, useEffect } from "react";
import { Box, Heading, Text, VStack, HStack, Button, Image, Progress, useToast, Input } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const exercises = [
  {
    name: "Lower Body Power Station",
    description: "Combine Nordic Hamstring Curl, Poliquin Step-ups, and ATG Split Squats for a comprehensive lower body workout.",
    exercises: [
      {
        name: "Nordic Hamstring Curl",
        sets: 3,
        reps: 10,
      },
      {
        name: "Poliquin Step-ups",
        sets: 3,
        reps: 10,
      },
      {
        name: "ATG Split Squats",
        sets: 3,
        reps: 10,
      },
    ],
    video: "https://images.unsplash.com/photo-1532200846567-1bd8bd5b23aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxsb3dlciUyMGJvZHklMjBwb3dlciUyMHN0YXRpb24lMjBleGVyY2lzZXxlbnwwfHx8fDE3MTEzMzgwMTF8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    name: "ATG Slide Pulls",
    description: "Perform slide pulls to target your core and improve stability.",
    duration: 300,
    video: "path/to/transparent/atg-slide-pulls.png",
  },
  {
    name: "BSAA 10x10x10 Band Combo",
    description: "Complete Band Monster Walk, Band Right Side Push Away, and Band Left Side Push Away for lateral strength.",
    duration: 90,
    video: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxic2FhJTIwYmFuZCUyMGNvbWJvJTIwZXhlcmNpc2V8ZW58MHx8fHwxNzExMzM4MDEyfDA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const SetsRepsInput = ({ exerciseName, sets, reps, onSetsChange, onRepsChange }) => {
  return (
    <HStack>
      <Text>{exerciseName}</Text>
      <Input type="number" value={sets} onChange={(e) => onSetsChange(exerciseName, parseInt(e.target.value))} width="60px" />
      <Text>sets</Text>
      <Input type="number" value={reps} onChange={(e) => onRepsChange(exerciseName, parseInt(e.target.value))} width="60px" />
      <Text>reps</Text>
    </HStack>
  );
};

const Index = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(exercises[currentExerciseIndex].duration || 0);
  const [setsReps, setSetsReps] = useState(
    exercises[currentExerciseIndex].exercises?.reduce((acc, exercise) => {
      acc[exercise.name] = { sets: exercise.sets, reps: exercise.reps };
      return acc;
    }, {}) || {},
  );
  const [isRunning, setIsRunning] = useState(false);
  const toast = useToast();

  useEffect(() => {
    let timer;
    if (isRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      toast({
        title: "Exercise Completed",
        description: "Great job! Moving to the next exercise.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      handleNext();
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeRemaining]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
      setTimeRemaining(exercises[currentExerciseIndex + 1].duration);
    } else {
      toast({
        title: "Workout Completed",
        description: "Congratulations! You have finished the circuit.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setCurrentExerciseIndex(0);
      setTimeRemaining(exercises[0].duration);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prevIndex) => prevIndex - 1);
      setTimeRemaining(exercises[currentExerciseIndex - 1].duration);
    }
  };

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <Box maxWidth="600px" margin="0 auto" padding={8}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        MovLab Circuit Training
      </Heading>
      <VStack spacing={6}>
        <Image src={currentExercise.video} alt={currentExercise.name} />
        <Heading as="h2" size="lg">
          {currentExercise.name}
        </Heading>
        <Text>{currentExercise.description}</Text>
        {currentExercise.exercises ? (
          currentExercise.exercises.map((exercise) => (
            <SetsRepsInput
              key={exercise.name}
              exerciseName={exercise.name}
              sets={setsReps[exercise.name]?.sets || 0}
              reps={setsReps[exercise.name]?.reps || 0}
              onSetsChange={(exerciseName, sets) =>
                setSetsReps((prevSetsReps) => ({
                  ...prevSetsReps,
                  [exerciseName]: { ...prevSetsReps[exerciseName], sets },
                }))
              }
              onRepsChange={(exerciseName, reps) =>
                setSetsReps((prevSetsReps) => ({
                  ...prevSetsReps,
                  [exerciseName]: { ...prevSetsReps[exerciseName], reps },
                }))
              }
            />
          ))
        ) : currentExercise.name === "ATG Slide Pulls" ? (
          <>
            <Text fontSize="xl" fontWeight="bold">
              {Math.floor(timeRemaining / 60)
                .toString()
                .padStart(2, "0")}
              :{(timeRemaining % 60).toString().padStart(2, "0")}
            </Text>
            <HStack>
              <Button onClick={() => setTimeRemaining(300)}>5 min</Button>
              <Button onClick={() => setTimeRemaining(600)}>10 min</Button>
            </HStack>
          </>
        ) : (
          <Text>No time remaining</Text>
        )}
        <HStack spacing={4}>
          <Button leftIcon={<FaBackward />} onClick={handlePrevious} disabled={currentExerciseIndex === 0}>
            Previous
          </Button>
          {isRunning ? (
            <Button leftIcon={<FaPause />} onClick={handlePause}>
              Pause
            </Button>
          ) : (
            <Button leftIcon={<FaPlay />} onClick={handleStart}>
              Start
            </Button>
          )}
          <Button leftIcon={<FaForward />} onClick={handleNext} disabled={currentExerciseIndex === exercises.length - 1}>
            Next
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Index;

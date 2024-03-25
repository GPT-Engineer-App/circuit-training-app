import { useState } from "react";

const participantsDB = [];

export const addParticipant = (name, email) => {
  const newParticipant = { name, email, id: participantsDB.length + 1 };
  participantsDB.push(newParticipant);
  return Promise.resolve(newParticipant);
};

export const getParticipants = () => {
  return Promise.resolve(participantsDB);
};

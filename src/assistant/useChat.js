import { useEffect, useState } from "react";
import { answerQuestion, suggestions } from "./knowledge.js";

const storageKey = "portfolio.ask-my-ai.v1";
const storedCount = 8;

export const inputLimits = { chat: 600, recruiter: 4000 };

function restore() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw || raw.length > 32_000) return [];
    const stored = JSON.parse(raw);
    if (!Array.isArray(stored)) return [];
    return stored
      .slice(-storedCount)
      .filter((turn) => turn && typeof turn.id === "string" && suggestions.includes(turn.question) &&
        Number.isFinite(turn.time) && Math.abs(turn.time) <= 8.64e15)
      .map(({ id, question, time }) => ({
        id, question, time, mode: "chat", remember: true, ...answerQuestion(question, "chat"),
      }));
  } catch {
    return [];
  }
}

function persist(turns) {
  try {
    const safe = turns.filter(({ remember }) => remember).slice(-storedCount)
      .map(({ id, question, time }) => ({ id, question, time }));
    if (safe.length) localStorage.setItem(storageKey, JSON.stringify(safe));
    else localStorage.removeItem(storageKey);
  } catch {
    // Device storage can be disabled, so keep the conversation usable in memory.
  }
}

export function useChat() {
  const [turns, setTurns] = useState(restore);
  useEffect(() => persist(turns), [turns]);

  function send(question, mode, suggestion = false) {
    const message = question.trim();
    if (!message || message.length > inputLimits[mode]) return;
    const time = Date.now();
    const id = crypto.randomUUID?.() ?? time + "-" + Math.random().toString(36).slice(2);
    const remember = mode === "chat" && suggestion && suggestions.includes(message);
    setTurns((current) => {
      const previous = remember || mode === "recruiter" ? undefined : current.findLast((turn) => turn.mode === "chat");
      return [...current, { id, time, question: message, mode, remember, ...answerQuestion(message, mode, previous?.project) }].slice(-24);
    });
  }

  function clear() {
    setTurns([]);
    persist([]);
  }

  return { turns, send, clear };
}

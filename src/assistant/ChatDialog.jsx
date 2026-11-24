import React, { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Sparkle } from "./ChatLauncher.jsx";
import { actions, suggestions } from "./knowledge.js";
import { inputLimits, useChat } from "./useChat.js";
import "./dialog.css";

const icons = {
  close: "m6 6 12 12M18 6 6 18",
  clear: "M4 7h16m-10 4v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3",
  send: "M4 12h15m-6-6 6 6-6 6",
};

function Icon({ name }) {
  return <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[name]} /></svg>;
}

function Stamp({ time }) {
  const date = new Date(time);
  return <time dateTime={date.toISOString()}>{date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</time>;
}

const MarkdownAnswer = memo(function MarkdownAnswer({ text }) {
  function inline(line) {
    return line.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
      part.startsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part);
  }
  return text.split("\n\n").map((block, index) => block.startsWith("- ")
    ? <ul key={index}>{block.split("\n").map(line => <li key={line}>{inline(line.slice(2))}</li>)}</ul>
    : <p key={index}>{inline(block)}</p>);
});

const Turn = memo(function Turn({ turn, onNavigate, onCopy }) {
  const { question, text, time, ids } = turn;
  return <li className="ai-turn">
    <article className="ai-user" aria-label={turn.mode === "recruiter" ? "Your job description" : "Your message"}>
      <p>{question}</p>
      <Stamp time={time} />
    </article>
    <article className="ai-answer" aria-label="Ask My AI reply">
      <div className="ai-answer-mark"><Sparkle /></div>
      <div className="ai-answer-content">
        <div className="ai-markdown"><MarkdownAnswer text={text} /></div>
        {!!ids?.length && <div className="ai-links">{ids.map((id) => {
          const { label, href, download, external } = actions[id];
          return <a key={id} href={href} download={download || undefined} target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            onClick={!download && !external ? (event) => onNavigate(event, href) : undefined}>{label}</a>;
        })}</div>}
        <div className="ai-message-meta">
          <Stamp time={time} />
          <button type="button" onClick={() => onCopy(text)}>Copy response</button>
        </div>
      </div>
    </article>
  </li>;
});

export default function ChatDialog({ open, onDismiss }) {
  const dialog = useRef(null);
  const heading = useRef(null);
  const scroll = useRef(null);
  const pinned = useRef(true);
  const [mode, setMode] = useState("chat");
  const [drafts, setDrafts] = useState({ chat: "", recruiter: "" });
  const [copied, setCopied] = useState("");
  const copyTimer = useRef(null);
  const { turns, send, clear } = useChat();
  const visibleTurns = turns.filter((turn) => turn.mode === mode);
  const draft = drafts[mode];

  useLayoutEffect(() => {
    const node = dialog.current;
    if (!open) {
      if (node.open) node.close();
      return;
    }
    if (!node.open) node.showModal();
    heading.current?.focus({ preventScroll: true });
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const viewport = window.visualViewport;
    function sizeDialog() {
      if (!viewport) return;
      node.style.setProperty("--ai-viewport-height", viewport.height + "px");
      node.style.setProperty("--ai-viewport-offset", (window.innerHeight - viewport.height - viewport.offsetTop) + "px");
    }
    sizeDialog();
    viewport?.addEventListener("resize", sizeDialog);
    viewport?.addEventListener("scroll", sizeDialog);
    return () => {
      document.documentElement.style.overflow = previous;
      viewport?.removeEventListener("resize", sizeDialog);
      viewport?.removeEventListener("scroll", sizeDialog);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !scroll.current) return;
    if (!visibleTurns.length) scroll.current.scrollTop = 0;
    else if (pinned.current) scroll.current.scrollTop = scroll.current.scrollHeight;
  }, [turns, mode, open, visibleTurns.length]);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  function switchMode(next) {
    if (mode === next) return;
    pinned.current = true;
    setMode(next);
  }

  function ask(question, suggestion = false) {
    if (!question.trim()) return;
    pinned.current = true;
    if (suggestion) scroll.current?.focus({ preventScroll: true });
    else setDrafts((current) => ({ ...current, [mode]: "" }));
    send(question, mode, suggestion);
  }

  async function copy(text) {
    setCopied("");
    clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(text);
      setCopied("Response copied.");
    } catch {
      setCopied("Copy unavailable. You can select the reply text.");
    }
    copyTimer.current = setTimeout(() => setCopied(""), 4500);
  }

  function navigate(event, href) {
    if (document.querySelector('base[target="_blank"]')) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = new URL(href, window.location.href);
    if (target.pathname === window.location.pathname && target.hash) {
      event.preventDefault();
      dialog.current.close();
      onDismiss();
      window.location.hash = target.hash;
      requestAnimationFrame(() => {
        const section = document.getElementById(target.hash.slice(1));
        if (!section) return;
        section.scrollIntoView();
        if (!section.hasAttribute("tabindex")) section.setAttribute("tabindex", "-1");
        section.focus({ preventScroll: true });
      });
    }
  }

  return <dialog ref={dialog} id="ask-my-ai" className="ai-dialog" aria-labelledby="ai-title" onCancel={(event) => {
    event.preventDefault();
    onDismiss();
  }}>
    <header className="ai-header">
      <div className="ai-avatar"><Sparkle /></div>
      <div className="ai-heading">
        <h2 id="ai-title" ref={heading} tabIndex={-1}>Ask My AI</h2>
        <p className="ai-status">Runs on this device</p>
      </div>
      <div className="ai-header-tools">
        <button type="button" aria-label="Clear conversation" title="Clear conversation" disabled={!turns.length}
          onClick={() => {
            pinned.current = true;
            clear();
            setDrafts({ chat: "", recruiter: "" });
            heading.current?.focus();
          }}><Icon name="clear" /></button>
        <button type="button" aria-label="Close chat" title="Close chat" onClick={onDismiss}><Icon name="close" /></button>
      </div>
    </header>
    <div className="ai-mode" role="group" aria-label="Conversation mode">
      <button type="button" aria-pressed={mode === "chat"} onClick={() => switchMode("chat")}>Portfolio chat</button>
      <button type="button" aria-pressed={mode === "recruiter"} onClick={() => switchMode("recruiter")}>Recruiter mode</button>
    </div>
    <div className="ai-scroll" ref={scroll} tabIndex={0} aria-label={visibleTurns.length ? "Conversation" : "Chat introduction"}
      onScroll={(event) => {
        const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
        pinned.current = scrollHeight - scrollTop - clientHeight < 45;
      }}>
      {!visibleTurns.length && (mode === "chat" ? <div className="ai-welcome">
        <div className="ai-welcome-icon"><Sparkle /></div>
        <h3>Meet your portfolio guide</h3>
        <p>Ask about Ayush’s experience, explore a project, or compare a job description with his documented skills.</p>
        <div className="ai-suggestions" aria-label="Suggested questions">{suggestions.map((question) =>
          <button key={question} type="button" onClick={() => ask(question, true)}>{question}</button>)}</div>
      </div> : <div className="ai-welcome ai-recruiter">
        <div className="ai-welcome-icon"><Sparkle /></div>
        <h3>Compare a role</h3>
        <p>Paste a job description to find documented skills, relevant projects, and requirements to discuss with Ayush.</p>
      </div>)}
      <ol className="ai-messages" aria-live="polite" aria-relevant="additions">{visibleTurns.map((turn) =>
        <Turn key={turn.id} turn={turn}
          onCopy={copy} onNavigate={navigate} />)}</ol>
    </div>
    <div className="ai-compose">
      <form onSubmit={(event) => {
        event.preventDefault();
        ask(draft);
      }}>
        <label className="ai-visually-hidden" htmlFor="ai-input">{mode === "chat" ? "Your question" : "Job description"}</label>
        <textarea id="ai-input" aria-describedby="ai-privacy" maxLength={inputLimits[mode]} value={draft} rows={mode === "chat" ? 1 : 3}
          placeholder={mode === "chat" ? "Ask about Ayush…" : "Paste a public job description…"}
          onChange={(event) => { const value = event.target.value; setDrafts((current) => ({ ...current, [mode]: value })); }}
          onKeyDown={(event) => {
            if (mode === "chat" && event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              ask(draft);
            }
          }} />
        <button type="submit" className="ai-send" title={mode === "recruiter" ? "Compare role" : "Send message"}
          aria-label={mode === "recruiter" ? "Compare role" : "Send message"} disabled={!draft.trim()}><Icon name="send" /></button>
      </form>
      <p className="ai-privacy" id="ai-privacy">
        {mode === "chat" ? "Only suggested questions are saved on this device." : "Job descriptions stay in this tab and are never saved."}
      </p>
    </div>
    <p className="ai-visually-hidden" role="status" aria-atomic="true">{copied}</p>
    {copied && <p className="ai-copy-note" aria-hidden="true">{copied}</p>}
  </dialog>;
}

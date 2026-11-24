import React, { lazy, Suspense, useRef, useState } from "react";
import "./launcher.css";

const ChatDialog = lazy(() => import("./ChatDialog.jsx"));

export function Sparkle() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 3.5 12 9l5.5 2-5.5 2-2 5.5L8 13l-5.5-2L8 9 10 3.5ZM18.5 3v5m-2.5-2.5h5M18 15v5m-2.5-2.5h5" />
  </svg>;
}

class ChatLoadBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return this.props.open ? <p className="ai-load-note" role="status">Chat couldn’t load. <a href="#contact" onClick={this.props.close}>Contact Ayush</a> or refresh to try again.</p> : null;
  }
}

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const launcher = useRef(null);
  function close() {
    setOpen(false);
    requestAnimationFrame(() => launcher.current?.focus({ preventScroll: true }));
  }
  return <>
    <button ref={launcher} type="button" className="ai-launcher" aria-haspopup="dialog" aria-expanded={open}
      title="Ask about Ayush’s skills, projects, or experience" onClick={() => {
        setLoaded(true);
        setOpen(!open);
      }}>
      <Sparkle /> Ask My AI
    </button>
    {loaded && <ChatLoadBoundary open={open} close={close}>
      <Suspense fallback={open ? <p className="ai-load-note" role="status">Opening Ask My AI…</p> : null}>
        <ChatDialog open={open} onDismiss={close} />
      </Suspense>
    </ChatLoadBoundary>}
  </>;
}

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowRight } from "lucide-react";
import { runTerminalCommand, terminalCommands } from "./commands";
import "./TerminalApp.css";

type TerminalEntry = {
  id: number;
  command: string;
  lines: string[];
  error?: boolean;
};

const HISTORY_LIMIT = 100;

function Prompt() {
  return (
    <span className="terminal-input-prompt" aria-hidden="true">
      <span className="terminal-prompt">eren@workspace</span>{" "}
      <span className="terminal-muted">~ %</span>
    </span>
  );
}

export function TerminalApp() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [showGuide, setShowGuide] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const draftRef = useRef("");
  const nextId = useRef(0);

  useEffect(() => {
    inputRef.current?.scrollIntoView({ block: "nearest" });
  }, [entries]);

  function submitCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = input.trim();
    const result = runTerminalCommand(command);
    if (result.type === "empty") return;

    setHistory((previous) => [...previous, command].slice(-HISTORY_LIMIT));
    setHistoryIndex(null);
    setInput("");
    draftRef.current = "";

    if (result.type === "clear") {
      setEntries([]);
      setShowGuide(false);
    } else {
      const entry = {
        id: nextId.current++,
        command,
        lines: result.lines,
        error: result.error,
      };
      setEntries((previous) => [...previous, entry].slice(-HISTORY_LIMIT));
    }
    inputRef.current?.focus();
  }

  function navigateHistory(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing || !history.length) return;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (historyIndex === null) draftRef.current = input;
      const index =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setInput(history[index]);
    } else if (event.key === "ArrowDown" && historyIndex !== null) {
      event.preventDefault();
      const index = historyIndex + 1;
      if (index >= history.length) {
        setHistoryIndex(null);
        setInput(draftRef.current);
      } else {
        setHistoryIndex(index);
        setInput(history[index]);
      }
    }
  }

  return (
    <div className="terminal-content interactive-terminal">
      {showGuide && (
        <section
          className="terminal-guide"
          aria-labelledby="terminal-guide-title"
        >
          <p className="terminal-muted">
            EREN.OS [Sürüm 0.1.0] — portfolyo terminali
          </p>
          <h3 id="terminal-guide-title">
            Merhaba! Buradan da keşfedebilirsin.
          </h3>
          <p className="terminal-muted">
            Bir komut yazıp Enter’a bas. Kullanabileceğin komutlar:
          </p>
          <dl className="terminal-command-guide">
            {terminalCommands.map(({ name, description }) => (
              <div key={name}>
                <dt>
                  <code>{name}</code>
                </dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
          <p id="terminal-input-hint" className="terminal-keyboard-hint">
            Enter: çalıştır · ↑ / ↓: komut geçmişi
            <br />
            Bu terminal yalnızca portfolyo komutlarına yanıt verir.
          </p>
        </section>
      )}
      <div
        className="terminal-log"
        role="log"
        aria-label="Terminal çıktıları"
        aria-live="polite"
        aria-relevant="additions"
      >
        {entries.map((entry) => (
          <div className="terminal-entry" key={entry.id}>
            <div className="terminal-command-line">
              <Prompt />
              <span>{entry.command}</span>
            </div>
            <pre
              className={`terminal-output${entry.error ? " terminal-error" : ""}`}
            >
              {entry.lines.join("\n")}
            </pre>
          </div>
        ))}
      </div>
      <form className="terminal-form" onSubmit={submitCommand}>
        <Prompt />
        <label className="sr-only" htmlFor="terminal-command">
          Terminal komutu
        </label>
        <input
          id="terminal-command"
          ref={inputRef}
          data-initial-focus
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setHistoryIndex(null);
            draftRef.current = event.target.value;
          }}
          onKeyDown={navigateHistory}
          placeholder="help"
          aria-describedby={showGuide ? "terminal-input-hint" : undefined}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="send"
          maxLength={500}
        />
        <button
          type="submit"
          aria-label="Komutu çalıştır"
          title="Komutu çalıştır"
        >
          <ArrowRight size={16} />
        </button>
      </form>
      {!showGuide && (
        <p className="terminal-keyboard-hint">
          Komut listesi için help yazabilirsin.
        </p>
      )}
    </div>
  );
}

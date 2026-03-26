import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { chatScenarios, IDLE_HINTS, type ChatMessage } from "@/data/chat";
import { cn } from "@/lib/utils";

type Phase = "idle" | "exiting" | "waiting" | "entering" | "visible";

const STAGGER_IN = 280;
const STAGGER_OUT = 140;
const FADE_IN_MS = 380;
const FADE_OUT_MS = 260;
const BEAT_AFTER_EXIT = 180;
const BUTTON_FADE_IN = 320;

const IDLE_HINTS = [
  "Можешь просто покликать карточки, это тоже план ✌️",
  "Я, кстати, не обижусь, если ты сначала всё исследуешь",
];

const ChatBubble = ({
  message,
  phase,
  delay,
}: {
  message: ChatMessage;
  phase: "entering" | "visible" | "exiting" | "hidden";
  delay: number;
}) => (
  <div
    className={cn(
      "max-w-[90%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed transition-all",
      message.from === "anton"
        ? "self-start bg-bubble text-bubble-foreground"
        : "self-end bg-primary text-primary-foreground",
      phase === "entering" && "animate-bubble-in",
      phase === "exiting" && "animate-bubble-out",
      phase === "hidden" && "opacity-0 pointer-events-none"
    )}
    style={{
      animationDelay: `${delay}ms`,
      animationFillMode: "both",
      animationDuration:
        phase === "entering"
          ? `${FADE_IN_MS}ms`
          : phase === "exiting"
          ? `${FADE_OUT_MS}ms`
          : undefined,
    }}
  >
    {message.text}
  </div>
);

const ChatPanel = () => {
  const [currentScenario, setCurrentScenario] = useState("start");
  const [displayMessages, setDisplayMessages] = useState<ChatMessage[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [showButtons, setShowButtons] = useState(true);
  const [hintShown, setHintShown] = useState(false);
  const [hintMessage, setHintMessage] = useState<ChatMessage | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();
  const phaseRef = useRef<Phase>("idle");

  // Keep phaseRef in sync
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Idle hint
  useEffect(() => {
    if (hintShown || displayMessages.length > 0) return;
    idleTimer.current = setTimeout(() => {
      if (phaseRef.current !== "idle" || hintShown) return;
      const text = IDLE_HINTS[Math.floor(Math.random() * IDLE_HINTS.length)];
      setHintMessage({ id: "hint", text, from: "anton" });
      setHintShown(true);
    }, 12000);
    return () => clearTimeout(idleTimer.current);
  }, [hintShown, displayMessages.length]);

  const handleChoice = useCallback(
    (label: string, nextScenario: string) => {
      if (phase !== "idle" && phase !== "visible") return;

      clearTimeout(idleTimer.current);
      setHintMessage(null);

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        text: label,
        from: "user",
      };
      const nextScene = chatScenarios[nextScenario];
      const oldCount = displayMessages.length;

      // 1. Disable buttons immediately
      setShowButtons(false);

      if (oldCount > 0) {
        // 2. Exit current messages
        setPhase("exiting");

        const exitDuration = oldCount * STAGGER_OUT + FADE_OUT_MS;
        setTimeout(() => {
          // 3. Beat
          setDisplayMessages([]);
          setPhase("waiting");

          setTimeout(() => {
            // 4. Enter new scene
            const newMessages = [userMsg, ...nextScene.messages];
            setDisplayMessages(newMessages);
            setCurrentScenario(nextScenario);
            setPhase("entering");

            const enterDuration =
              newMessages.length * STAGGER_IN + FADE_IN_MS;
            setTimeout(() => {
              setPhase("visible");
              setShowButtons(true);
            }, enterDuration);
          }, BEAT_AFTER_EXIT);
        }, exitDuration);
      } else {
        // No old messages — just enter
        const newMessages = [userMsg, ...nextScene.messages];
        setDisplayMessages(newMessages);
        setCurrentScenario(nextScenario);
        setPhase("entering");

        const enterDuration =
          newMessages.length * STAGGER_IN + FADE_IN_MS;
        setTimeout(() => {
          setPhase("visible");
          setShowButtons(true);
        }, enterDuration);
      }
    },
    [phase, displayMessages.length]
  );

  const scenario = chatScenarios[currentScenario];
  const buttonsDisabled = phase !== "idle" && phase !== "visible";

  return (
    <div className="fixed left-0 top-0 flex h-screen w-[40%] flex-col justify-center px-10 xl:px-16 max-lg:relative max-lg:w-full max-lg:h-auto max-lg:py-12 max-lg:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground xl:text-5xl">
          Привет мир!
          <br />
          Я Антон — дизайнер
        </h1>
      </div>

      {/* Static intro bubble */}
      <div className="mb-6 inline-block self-start rounded-2xl bg-bubble px-5 py-3 text-[15px] text-bubble-foreground">
        Занимаюсь UX/UI дизайном в сфере финансовых технологий.
      </div>

      {/* Message area */}
      <div className="flex flex-col gap-3 mb-6 min-h-[140px]">
        {displayMessages.map((msg, i) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            phase={
              phase === "entering"
                ? "entering"
                : phase === "exiting"
                ? "exiting"
                : "visible"
            }
            delay={
              phase === "entering"
                ? i * STAGGER_IN
                : phase === "exiting"
                ? i * STAGGER_OUT
                : 0
            }
          />
        ))}

        {/* Idle hint */}
        {hintMessage && displayMessages.length === 0 && (
          <ChatBubble
            message={hintMessage}
            phase="entering"
            delay={0}
          />
        )}
      </div>

      {/* Buttons */}
      <div
        className={cn(
          "flex flex-wrap gap-3 transition-opacity",
          showButtons
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        )}
        style={{
          transitionDuration: `${BUTTON_FADE_IN}ms`,
        }}
      >
        {scenario.buttons.map((btn) => (
          <Button
            key={btn.label}
            variant="bubble"
            size="lg"
            onClick={() => handleChoice(btn.label, btn.nextScenario)}
            disabled={buttonsDisabled}
            className="transition-all duration-200 hover:brightness-95 active:scale-[0.97]"
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChatPanel;

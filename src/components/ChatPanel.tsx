import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { chatScenarios, type ChatMessage } from "@/data/cards";
import { cn } from "@/lib/utils";

const ChatBubble = ({ message, index }: { message: ChatMessage; index: number }) => (
  <div
    className={cn(
      "animate-fade-in max-w-[90%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed",
      message.from === "anton"
        ? "self-start bg-bubble text-bubble-foreground"
        : "self-end bg-primary text-primary-foreground"
    )}
    style={{ animationDelay: `${index * 150}ms`, animationFillMode: "both" }}
  >
    {message.text}
  </div>
);

const ChatPanel = () => {
  const [currentScenario, setCurrentScenario] = useState("start");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChoice = useCallback((label: string, nextScenario: string) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const userMsg: ChatMessage = { id: `user-${Date.now()}`, text: label, from: "user" };
    const scenario = chatScenarios[nextScenario];

    setMessages([userMsg]);

    setTimeout(() => {
      setMessages([userMsg, ...scenario.messages]);
      setCurrentScenario(nextScenario);
      setIsAnimating(false);
    }, 200);
  }, [isAnimating]);

  const scenario = chatScenarios[currentScenario];

  return (
    <div className="fixed left-0 top-0 flex h-screen w-[40%] flex-col justify-center px-10 xl:px-16 max-lg:relative max-lg:w-full max-lg:h-auto max-lg:py-12 max-lg:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground xl:text-5xl">
          Привет мир!
          <br />
          Я Антон — дизайнер
        </h1>
      </div>

      <div className="mb-6 inline-block self-start rounded-2xl bg-bubble px-5 py-3 text-[15px] text-bubble-foreground">
        Занимаюсь UX/UI дизайном в сфере финансовых технологий.
      </div>

      <div className="flex flex-col gap-3 mb-6 min-h-[120px]">
        {messages.map((msg, i) => (
          <ChatBubble key={msg.id} message={msg} index={i} />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {scenario.buttons.map((btn) => (
          <Button
            key={btn.label}
            variant="bubble"
            size="lg"
            onClick={() => handleChoice(btn.label, btn.nextScenario)}
            disabled={isAnimating}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChatPanel;

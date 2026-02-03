type TopBarProps = {
  messages: string[];
};

export function TopBar({ messages }: TopBarProps) {
  if (!messages.length) return null;

  return (
    <div className="w-full bg-pearl/90 text-foreground backdrop-blur-sm">
      <div className="container flex flex-wrap items-center gap-3 py-2 text-[13px] text-muted-foreground">
        {messages.map((message) => (
          <span
            key={message}
            className="flex items-center gap-2 rounded-full bg-card/80 px-3 py-1"
          >
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PeacockDivider({
  className = "",
}: { className?: string }) {
  return (
    <div className={`peacock-divider ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
      <span className="text-lg">🦚</span>
      <span className="gold-text font-display text-xl">✦</span>
      <span className="text-lg">🪷</span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
    </div>
  );
}

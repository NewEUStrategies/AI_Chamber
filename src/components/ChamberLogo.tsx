export function ChamberLogo({ className = 'h-8' }: { className?: string }) {
  return (
    <img
      src="/image.png"
      alt="AI Chamber"
      className={`w-auto shrink-0 ${className}`}
    />
  );
}

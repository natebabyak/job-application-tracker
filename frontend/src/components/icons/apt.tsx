export function AptIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      className={className}
    >
      <path
        d="M 0 500 
           C 0    500,  500 500, 500  0
           C 500  0,    500 500, 1000 500
           C 1000 500,  500 500, 500  1000
           C 500  1000, 500 500, 0    500"
        fill="currentColor"
      />
    </svg>
  );
}

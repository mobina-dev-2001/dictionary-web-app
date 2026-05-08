import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------

type Props = { className?: string; [key: string]: unknown };

// ----------------------------------------------------------------------

export const ArrowDownIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 14 8"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      {...props}
    >
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d="m1 1 6 6 6-6" />
    </svg>
  );
};

// ----------------------------------------------------------------------

export const MoonIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
      />
    </svg>
  );
};

// ----------------------------------------------------------------------

export const SearchIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
      />
    </svg>
  );
};

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

// ----------------------------------------------------------------------

export const PlayIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 75 75"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      {...props}
    >
      <g fillRule="evenodd">
        <circle
          cx="37.5"
          cy="37.5"
          r="37.5"
          className="fill-current opacity-25 transition-opacity duration-200 group-hover:opacity-100"
        />
        <path
          d="M29 27v21l21-10.5z"
          className="fill-current transition-colors duration-200 group-hover:fill-white"
        />
      </g>
    </svg>
  );
};

// ----------------------------------------------------------------------

export const NewWindowIcon = ({ className, ...props }: Props) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 14 14"
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
        d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
      />
    </svg>
  );
};

// Utility function for merging Tailwind CSS classes with conditional logic
// Uses clsx for conditional className logic and tailwind-merge to resolve Tailwind conflicts
// Usage: cn('p-2', condition && 'bg-red-500', 'text-center')
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// cn: Combines class names and merges Tailwind classes intelligently
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

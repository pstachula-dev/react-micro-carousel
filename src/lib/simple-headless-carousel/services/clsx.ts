export const clsx = (...args: (string | boolean | undefined)[]) =>
  args.filter(Boolean).join(' ');

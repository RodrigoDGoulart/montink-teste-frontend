import type { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
  error?: boolean;
}

export default function Label(props: Props) {
  return (
    <label className="flex flex-col gap-1">
      <span className={`text-gray-500 text-md font-bold ${props.error ? 'text-red-400' : ''}`}>{props.label}</span>
      {props.children}
    </label>
  )
}
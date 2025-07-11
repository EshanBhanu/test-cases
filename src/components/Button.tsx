import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string
  children?: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({ label, children, className, type = 'button', ...props }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`py-2 px-4 rounded-lg font-semibold shadow-md transition duration-200 ${className}`}
      {...props}
    >
      {children || label}
    </button>
  )
}

export { Button }

"use client"

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "danger"
  className?: string
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = ""
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition"

  const variants = {
    primary: "bg-primary-blue text-white hover:bg-cyan-800 focus:ring-cyan-900",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
interface HeaderProps {
  title: string
  description?: string
  icon?: string
}

const Header = ({ 
  title, 
  description, 
  icon, 
}: HeaderProps) => {
  return (
    <div className="text-center mb-8 relative mt-6">
      {icon && <div className="text-6xl mb-4">{icon}</div>}
      <h1 className="text-3xl font-bold text-[#3e3e3e] mb-2">{title}</h1>
      {description && <h2 className="text-lg text-[#7b5e48]">{description}</h2>}
    </div>
  )
}

export default Header
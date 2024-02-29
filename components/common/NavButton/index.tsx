type Props = {
  listNav: string[]
  nav: number
  onClick: (nav: number) => void
  className?: string
}

const NavButton = ({ listNav, nav, onClick, className }: Props) => {
  return (
    <nav className='flex flex-row space-x-4'>
      {listNav.map((name, index) => (
        <button
          data-testid='button'
          key={index}
          className={`first-letter:uppercase p-4 border-t-0 border-l-0 border-r-0 border-4 cursor-pointer focus:outline-none outline-none ${
            nav === index ? 'border-orange-400' : 'border-white'
          } ${className && className}`}
          onClick={() => onClick(index)}
        >
          {name}
        </button>
      ))}
    </nav>
  )
}
export default NavButton

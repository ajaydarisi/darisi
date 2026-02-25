const links = ["Work", "About", "Contact"];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0B]/80 backdrop-blur-md border-b border-border">
      <nav
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16"
      >
        <a
          href="#"
          className="flex items-center gap-2.5"
          aria-label="Darisi — Home"
        >
          <img
            src="/logo.svg"
            alt="Darisi logo"
            className="h-6 w-6"
            width={24}
            height={24}
          />
          <span className="text-lg font-bold tracking-widest text-foreground">
            DARISI
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-muted hover:text-foreground transition-all duration-200 ease-out"
            >
              {link}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

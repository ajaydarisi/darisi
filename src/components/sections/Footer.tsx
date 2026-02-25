export function Footer() {
  return (
    <footer id="contact" aria-label="Darisi footer" className="py-16 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="text-lg font-bold tracking-widest text-foreground">
              DARISI
            </span>
            <p className="mt-2 text-sm text-muted">Build. Design. Launch.</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-sm text-muted">ajaydarisi5@gmail.com</p>
            <p className="text-xs text-muted">
              &copy; {new Date().getFullYear()} Darisi. All rights reserved.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted inline-flex items-center justify-center gap-1.5">
            Managed by
            <a
              href="https://ajay.darisi.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary text-foreground font-bold text-base text-center transition-colors duration-200"
            >
              Ajay Darisi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

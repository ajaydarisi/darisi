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
            {/* <p className="text-sm text-muted">info@darisi.com</p> */}
            <p className="text-xs text-muted">
              &copy; {new Date().getFullYear()} Darisi. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

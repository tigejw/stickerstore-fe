export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border py-8 text-sm text-text-muted">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 sm:flex-row sm:justify-between">
        <p>
          Built by Thomas Wilson
        </p>
 
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/tigejw"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="www.linkedin.com/in/thomas-wilson-389299208"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:tigejw@gmail.com"
            className="hover:text-accent transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
 

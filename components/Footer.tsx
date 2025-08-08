export default function Footer() {
  return (
    <footer className="border-t py-10 mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Now. All rights reserved.</p>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Support</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

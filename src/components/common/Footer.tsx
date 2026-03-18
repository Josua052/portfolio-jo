export default function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ronaldo. All rights reserved.
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="py-6 px-6 bg-background text-foreground">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-lg font-semibold mb-2">Amethyst Kombucha</h3>
        <p className="text-sm text-muted-foreground mb-2">by MegaKitchen</p>
        <p className="text-sm text-muted-foreground mb-2">
          Jl. Poltangan Raya, Pasar Minggu, Jakarta Selatan, DKI Jakarta 12520.
        </p>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Amethyst Kombucha. Hak Cipta
          Dilindungi.
        </p>
      </div>
    </footer>
  );
}

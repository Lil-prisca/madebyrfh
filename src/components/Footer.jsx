import Logo from "../assets/Logo.png";
const Footer = () => {
  return (
    <footer className=" bg-black border-t border-white/10 ">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <img src={Logo} alt="" />
          <p className="text-white/40 text-sm mt-4 leading-relaxed">
            Menswear and footwear for men who dress with intention.
          </p>
        </div>
        {[
          {
            title: "Shop",
            links: ["Outerwear", "Footwear", "Tailoring", "Essentials"],
          },
          {
            title: "Company",
            links: ["About", "Stockists", "Careers", "Contact"],
          },
          {
            title: "Support",
            links: ["Shipping", "Returns", "Size Guide", "FAQ"],
          },
        ].map((col) => (
          <div key={col.title}>
            <h5 className="text-white text-sm font-semibold mb-4">
              {col.title}
            </h5>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-white/40 hover:text-[#D4AF37] text-sm transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6 text-center text-white/30 text-xs">
        © {new Date().getFullYear()} madebyRFH. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

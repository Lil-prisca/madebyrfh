import Logo from "../assets/Logo.png";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

const socials = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/madebyrfh?igsh=MTIxaWV1c2JyZHM2dQ==",
    color: "#E1306C",
    label: "Instagram",
  },
  {
    icon: FaFacebookF,
    href: "https://facebook.com/yourpage",
    color: "#1877F2",
    label: "Facebook",
  },
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@madebyrfh?_r=1&_t=ZS-97V2hQWT7ky",
    color: "#ffffff",
    label: "TikTok",
  },
];

const Footer = () => {
  return (
    <footer className=" bg-black border-t border-white/10 ">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div>
            <img className="w-30 20 ml-[-15px]" src={Logo} alt="" />
            <p className="text-white/40 text-sm mt-1 leading-relaxed">
              Menswear and footwear for men who dress with intention.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/50 transition-all duration-300 hover:border-transparent"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.color;
                      e.currentTarget.style.color =
                        social.color === "#ffffff" ? "#000" : "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.color = "";
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
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

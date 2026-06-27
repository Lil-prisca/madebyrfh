import creamfront from "./assets/front-cream.png";
import creamside from "./assets/side-cream.png";
import creamdetails from "./assets/details-cream.png";
import creamback from "./assets/back-cream.png";
import creamcloseup from "./assets/closeup-cream.png";
import redfront from "./assets/front-red.png";
import redside from "./assets/side-red.png";
import reddetails from "./assets/details-red.png";
import redback from "./assets/back-red.png";
import redcloseup from "./assets/closeup-red.png";
import bluefront from "./assets/front-blue.png";
import blueside from "./assets/Side-Blue.png";
import bluedetails from "./assets/Details-blue.png";
import backblue from "./assets/back-blue.png";
import bluecloseup from "./assets/closup-blue.png";

export const products = [
  {
    id: 1,
    name: "Tailored Overcoat",
    price: "₦185,000",
    priceVal: 185000,
    category: "Outerwear",
    tag: "New",
    img: creamfront,
    images: [creamside, creamdetails, creamback, creamcloseup],
    description:
      "Cut from a heavyweight Italian wool blend, this overcoat is built for the in-between weather of a Lagos morning meeting and a London evening flight. A structured shoulder, single-breasted front, and a length that sits just above the knee.",
    details: [
      "80% wool, 20% cashmere blend",
      "Half-canvas construction for natural drape",
      "Horn buttons, hand-finished buttonholes",
      "Interior chest pocket, dry-clean only",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 2,
    name: "Merino Crewneck",
    price: "₦42,000",
    priceVal: 42000,
    category: "Essentials",
    tag: null,
    img: redfront,
    images: [redcloseup, redside, reddetails, redback],
    description:
      "A fine-gauge merino crewneck built to layer under a blazer or stand alone. Breathable, naturally odor-resistant, holds its shape wash after wash.",
    details: [
      "100% merino wool",
      "Ribbed collar, cuff, and hem",
      "Machine washable on wool cycle",
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Blue coat with Handmade desiggn",
    price: "₦96,500",
    priceVal: 96500,
    category: "Outerwear",
    tag: "New",
    img: bluefront,
    images: [bluedetails, blueside, backblue, bluecloseup],
    description:
      "Full-grain leather derbies, Goodyear-welted for a resole down the line. Built for the man who wears one good pair of shoes for a decade, not ten cheap ones in a year.",
    details: [
      "Full-grain leather upper",
      "Goodyear-welted leather sole",
      "Resoleable construction",
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
  },
  {
    id: 4,
    name: "Slim Oxford Shirt",
    price: "₦38,000",
    priceVal: 38000,
    category: "Tailoring",
    tag: null,
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1000&q=85",
    ],
    description:
      "A slim-cut oxford shirt in brushed cotton, equally at home under a blazer or with sleeves rolled on a Saturday.",
    details: [
      "100% brushed cotton",
      "Mother-of-pearl buttons",
      "Slim fit through the body",
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Suede Chelsea Boots",
    price: "₦112,000",
    priceVal: 112000,
    category: "Footwear",
    tag: "Limited",
    img: "https://images.unsplash.com/photo-1614253429340-98120bd6d753?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1614253429340-98120bd6d753?w=1000&q=85",
    ],
    description:
      "Suede Chelsea boots with an elastic side panel and a low stacked heel. Limited run — once they're gone, this colorway doesn't come back.",
    details: [
      "Genuine suede upper",
      "Elastic side gusset",
      "Leather sole, stacked heel",
    ],
    sizes: ["40", "41", "42", "43", "44"],
  },
  {
    id: 6,
    name: "Cashmere Blend Blazer",
    price: "₦220,000",
    priceVal: 220000,
    category: "Tailoring",
    tag: null,
    img: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1000&q=85",
    ],
    description:
      "A soft-shouldered blazer in a cashmere-wool blend, built to move between the office and dinner without changing.",
    details: [
      "70% wool, 30% cashmere",
      "Half-lined for breathability",
      "Horn buttons",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 7,
    name: "Wool Trench Coat",
    price: "₦198,000",
    priceVal: 198000,
    category: "Outerwear",
    tag: null,
    img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1000&q=85",
    ],
    description:
      "A double-breasted trench in water-resistant wool gabardine, with a belted waist and storm flap.",
    details: [
      "Water-resistant wool gabardine",
      "Double-breasted, belted waist",
      "Storm flap at shoulder",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 8,
    name: "Cotton Crew Tee, 2-Pack",
    price: "₦24,000",
    priceVal: 24000,
    category: "Essentials",
    tag: null,
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&q=85",
    ],
    description:
      "Heavyweight cotton crewnecks, sold in a two-pack. The kind of tee that looks better after the third wash.",
    details: ["220gsm combed cotton", "Pre-shrunk", "Sold as a pack of 2"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 9,
    name: "Suede Penny Loafers",
    price: "₦88,000",
    priceVal: 88000,
    category: "Footwear",
    tag: null,
    img: "https://images.unsplash.com/photo-1582897085656-92847d1f8076?w=700&q=80",
    images: [
      "https://images.unsplash.com/photo-1582897085656-92847d1f8076?w=1000&q=85",
    ],
    description:
      "Classic penny loafers in suede, built on a comfortable leather sole. The default smart-casual shoe.",
    details: ["Suede upper", "Leather sole", "Penny strap detail"],
    sizes: ["40", "41", "42", "43", "44"],
  },
];

export const getProductById = (id) =>
  products.find((p) => String(p.id) === String(id));

/* ============================================================
   All site copy lives here. Edit this one file to change text.
   Source: "Adhavan Coach Website Details.pdf"
   ============================================================ */

export const contact = {
  name: "Adhavan Coach",
  addressLines: [
    "No. 123/1, F2, MGR Street,",
    "Ambedkar Nagar, Red Hills,",
    "Chennai – 600052, Tamil Nadu",
  ],
  addressOneLine:
    "No. 123/1, F2, MGR Street, Ambedkar Nagar, Red Hills, Chennai – 600052, Tamil Nadu",
  phones: ["8838744495", "8939374901"],
  email: "adhavancoach@gmail.com",
  // TODO(client): confirm exact business hours — the source PDF glyphs
  // did not decode. These are placeholders.
  hours: [
    { d: "Monday – Saturday", t: "9:00 AM – 7:00 PM" },
    { d: "Sunday", t: "Closed" },
  ],
  mapsQuery:
    "Adhavan Coach, No 123/1 F2, MGR Street, Ambedkar Nagar, Red Hills, Chennai 600052",
};

export const wa = {
  number: "918838744495",
  msg: "Hi Adhavan Coach, I'd like a quote for an ambulance build.",
};
export const waLink = (m = wa.msg) =>
  `https://wa.me/${wa.number}?text=${encodeURIComponent(m)}`;
export const telLink = (p) => `tel:+91${p}`;
export const fmtPhone = (p) => `${p.slice(0, 5)} ${p.slice(5)}`;
export const mailLink = (s = "Ambulance fabrication enquiry") =>
  `mailto:${contact.email}?subject=${encodeURIComponent(s)}`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contact.mapsQuery
)}`;

/* ---------- HOME ---------- */
export const home = {
  h1: ["Adhavan Coach:", "Ambulance Fabrication", "in Chennai"],
  sub: "Built to AIS-125 Standards and Delivered on Time",
  intro: [
    "With over a decade of experience, Adhavan Coach has been involved in high-quality ambulance fabrication and vehicle customization in Chennai, creating practical patient cabins and specialized interiors for medical transportation in Tamil Nadu and across India.",
    "From vehicle modification and patient cabin fabrication to electrical systems, insulation and interior fittings, we build ambulances around the requirements of hospitals, healthcare providers and medical transport operators for all kinds of medical emergencies.",
  ],
  ctaLine: "Need an ambulance built or customized?",
};

export const stats = [
  { v: 14, suf: "+", l: "Years of fabrication" },
  { v: 125, pre: "AIS-", l: "Parts 1 & 2 baseline" },
  { v: 4, suf: "", l: "Standard build packages" },
  { v: 1, suf: " yr", l: "Warranty & repair cover" },
];

export const capabilities = [
  "Ambulance body and interior fabrication",
  "Medical equipment provisions",
  "Electrical and lighting systems",
  "PU foam insulation",
  "Customized ambulance interiors",
  "Vehicle modification",
];

export const baseVehicles = [
  "Maruti Eeco",
  "Force Traveller",
  "SML BS6",
  "Multi-stretcher coach",
  "Neonatal transport",
  "Custom chassis",
];

/* ---------- ABOUT / APPROACH ---------- */
/* The source PDF files this H1 under PAGE 2 (About Us). */
export const aboutH1 = ["More Than a Vehicle.", "A Space Built to Care."];

export const approach = {
  h1: ["Designed around how", "the vehicle gets used."],
  lede: "An ambulance has to do more within a limited space.",
  constraints: [
    {
      n: "01",
      t: "Patient safety",
      d: "Patients need to be transported safely.",
    },
    {
      n: "02",
      t: "Equipment access",
      d: "Medical equipment needs to remain accessible.",
    },
    {
      n: "03",
      t: "Attendant space",
      d: "Attendants need sufficient real-time working space.",
    },
    {
      n: "04",
      t: "Durability",
      d: "Every component inside the cabin needs to withstand regular use and cleaning and be cost-effective.",
    },
  ],
  closing:
    "That's why our approach to international-quality ambulance fabrication in Chennai starts with understanding how the vehicle will actually be used.",
};

/* ---------- BUILD PROCESS ---------- */
export const process = {
  h1: ["How We Build", "Your Ambulance"],
  lede: "We treat every ambulance as a piece of life safety equipment first, and a vehicle second. Here's how our fabrication services move from order to delivery.",
  steps: [
    {
      n: "01",
      t: "Requirement & Base Vehicle Assessment",
      d: "We start by understanding the use case: BLS or ALS, urban or rural deployment, patient volume, and equipment list. From there we recommend a base vehicle, Eeco and Force Traveller depending upon your usage.",
      img: "/img/exterior-yellow-outdoor.jpg",
    },
    {
      n: "02",
      t: "Design & Layout Planning",
      d: "We plan the patient cabin layout, around the specific dimensions of your chosen base vehicle and the medical equipment you intend to run.",
      img: "/img/shell-bare-insulated.jpg",
    },
    {
      n: "03",
      t: "Structural Fabrication",
      d: "The cabin structure is built out as per your requirements and fitted per AIS-125 constructional requirements.",
      img: "/img/interior-van-doors-open.jpg",
    },
    {
      n: "04",
      t: "Electrical & Medical Fit-Out",
      d: "Dedicated wiring circuits are run for medical devices. Warning lights, siren/PA systems, go in at this stage.",
      img: "/img/interior-green-lit.jpg",
    },
    {
      n: "05",
      t: "Safety & Compliance Check",
      d: "Before handover, the vehicle is checked against AIS-125 (Parts 1 & 2) constructional and medical-equipment provisions, along with basic fire-safety protocol checks.",
      img: "/img/interior-equipment-cabinet.jpg",
    },
    {
      n: "06",
      t: "Handover, Training & Warranty",
      d: "On delivery, we walk your team through the cabin layout, equipment mounts, and electrical panel in person, this isn't a “here are the keys” handover.",
      img: "/img/exterior-yellow-front.jpg",
    },
  ],
};

/* ---------- PACKAGES ---------- */
export const packages = {
  h1: ["Ambulance Fabrication", "Packages & Pricing"],
  lede: [
    "Ambulance fabrication cost depends on three things: the base vehicle, the level of medical fit-out (BLS vs. ALS), and any custom requirements. There's no single flat price we can honestly quote without knowing those three.",
    "Publishing a single figure can be misleading, and we want to be more useful than quotable. Get a specification-based quote instead, it takes one call.",
  ],
  factors: [
    { n: "01", t: "Base vehicle", d: "Eeco, Force Traveller, SML BS6 or your own chassis." },
    { n: "02", t: "Level of fit-out", d: "Basic Life Support through to fully equipped ALS." },
    { n: "03", t: "Custom requirements", d: "Anything specific to how your team actually operates." },
  ],
  tiers: [
    {
      id: "acp-seat-with-pvc",
      n: "01",
      name: "ACP Seat with PVC",
      tag: "Basic Life Support",
      img: "/img/interior-acp-pvc.jpg",
      blurb:
        "The entry build — ACP-panelled patient cabin with PVC seating and the full core BLS provision.",
      specs: [
        "O₂ System",
        "90AH Alternator",
        "Sun Mica Interior",
        "Retractable Doctor Seat",
        "Marine Ply with Vinyl Flooring",
        "800VA High Frequency Inverter",
        "High Illuminating LED Flashlights",
        "Multifunction Stretcher cum Trolley",
        "Horizontally Mounted ‘D’ Type Cylinder",
        "Air Conditioning (Patient Cabin Only)",
        "Integrated Electronic Siren",
        "Public Addressing System",
      ],
    },
    {
      id: "basic-bls",
      n: "02",
      name: "Basic — BLS",
      tag: "Basic Life Support",
      img: "/img/interior-wide-cabin.jpg",
      blurb:
        "The same BLS provision stepped up to a moulded fibre interior for easier cleaning and a tighter finish.",
      specs: [
        "O₂ System",
        "90AH Alternator",
        "Fiber Interior",
        "Retractable Doctor Seat",
        "Marine Ply with Vinyl Flooring",
        "800VA High Frequency Inverter",
        "High Illuminating LED Flash Lights",
        "Multifunction Stretcher cum Trolly",
        "Horizontally Mounted ‘D’ Type Cylinder",
        "Air Conditioning (Patient Cabin Only)",
        "Integrated Electronic Siren",
        "Public Addressing System",
      ],
    },
    {
      id: "classic-1",
      n: "03",
      name: "Classic 1",
      tag: "BLS + ALS",
      img: "/img/interior-srm-blue.jpg",
      featured: true,
      blurb:
        "The crossover build. Fibre half cupboards and running lights on top of the full BLS layout, ready to carry ALS equipment.",
      specs: [
        "O₂ System",
        "Running Lights",
        "Fiber Interior",
        "90AH Alternator",
        "Fibre Half Cup Boards",
        "Retractable Doctor Seat",
        "Marine Ply with Vinyl Flooring",
        "800VA High Frequency Invertor",
        "High Illuminating LED Flash Lights",
        "Multifunction Stretcher Cum Trolly",
        "Horizontally Mounted ‘D’ Type Cylinder",
        "Air Conditioning (Patient Cabin Only)",
        "Integrated Electronic Siren",
        "Public Addressing System",
      ],
    },
    {
      id: "classic-2",
      n: "04",
      name: "Classic 2",
      tag: "Advanced Life Support",
      img: "/img/interior-cabin-white-blue.jpg",
      blurb:
        "The top structural build — 233AH alternator, full fibre cupboards and air conditioning across both cabins.",
      specs: [
        "O₂ System",
        "Running Lights",
        "233 AH Alternator",
        "Fiber Full Cup Board & Interior",
        "Retractable Doctor Seat",
        "Marine Ply With Vinyl Flooring",
        "800VA High Frequency Invertor",
        "High Illuminating BIG LED Flash Lights",
        "Multifunction Stretcher Cum Trolly",
        "Horizontally Mounted ‘D’ Type Cylinder",
        "Air Conditioning (Patient & Driver Cabin)",
        "Integrated Electronic Siren",
        "Public Addressing System",
      ],
    },
  ],
  equipped: {
    title: "Equipped Ambulance — ALS",
    blurb:
      "Clinical equipment fitted on top of any structural build, specified against your protocol.",
    items: [
      "Suction",
      "AMBU Bag",
      "Ventilator",
      "Spine Board",
      "Vacuum Splints",
      "Scoop Stretcher",
      "Head Immobilizer",
      "Defibrillator / AED",
      "Multipara Monitor",
      "Infusion / Syringe Pump",
      "Multifunctional Stretcher Cum Trolly (Ferno)",
    ],
  },
  note: "We also offer personalised customisations based on customer requirements.",
};

/* ---------- WHY US ---------- */
export const whyUs = {
  h1: ["Why Choose", "Adhavan Coach"],
  points: [
    {
      n: "01",
      t: "Standard-First Engineering",
      d: "Every build is done with AIS-125 (Parts 1 & 2) as the baseline, and not an afterthought. We make sure to cover both the constructional/functional requirements and the medical-equipment provisions of the national ambulance code.",
    },
    {
      n: "02",
      t: "Experience Across Vehicle Classes",
      d: "From Eeco-based BLS units to SML BS6 multi-stretcher coaches and Force Traveller conversions, we've worked across the vehicle classes hospitals and operators in Tamil Nadu actually use.",
    },
    {
      n: "03",
      t: "Materials Chosen",
      d: "From steel and FRP (Fiberglass Reinforced Plastic) fabrication to PU foam insulation and electrical installations, individual components are selected around their practical function.",
    },
    {
      n: "04",
      t: "Transparent, Specification-Based Quoting",
      d: "No vague “starting from” pricing. We quote against your actual structure, equipment list, and fit-out level, so there are no surprises at delivery.",
    },
    {
      n: "05",
      t: "Documentation & Compliance Support",
      d: "We help with the paperwork needed to get your fabricated or modified vehicle through RTO registration as an ambulance.",
    },
    {
      n: "06",
      t: "Warranty & After-Sales Service",
      d: "Structural fabrication warranty and post-delivery repair support are part of the deal, not an upsell.",
    },
  ],
};

/* ---------- FAQ ---------- */
export const faqs = [
  {
    q: "What is ambulance fabrication?",
    a: "Ambulance fabrication is the process of converting or building out a base vehicle, such as an Eeco, Force Traveller, or SML BS6 chassis, into a fully functional ambulance.",
  },
  {
    q: "How much does ambulance fabrication cost in Chennai?",
    a: "Cost depends on various factors, whether it's a BLS or ALS configuration, and the medical equipment fit-out required. See our packages page for a breakdown, or request a specification-based quote.",
  },
  {
    q: "Can you modify a vehicle we already own into an ambulance?",
    a: "Yes, we take on conversions of existing vehicles (Eeco, Force Traveller, and similar) into BLS or ALS ambulances, subject to the base vehicle being suitable for the intended configuration.",
  },
  {
    q: "What types of ambulances do you build?",
    a: "We build Basic Life Support (BLS), Advanced Life Support (ALS), multi-stretcher, and neonatal transport configurations, depending on base vehicle and equipment requirements.",
  },
  {
    q: "Do you offer post-delivery repair services?",
    a: "Yes. In addition the repair charges are included under your warranty of one year.",
  },
];

/* ---------- GALLERY ---------- */
export const gallery = [
  { s: "/img/exterior-yellow-angle.jpg",     c: "Level 1 ICU ambulance, delivered",   k: "Exterior" },
  { s: "/img/interior-wide-bench.jpg",       c: "Patient cabin, attendant bench",     k: "Interior" },
  { s: "/img/interior-cabin-blue-lit.jpg",   c: "Vinyl flooring over marine ply",     k: "Interior" },
  { s: "/img/exterior-mobile-icu.jpg",       c: "Mobile ICU configuration",           k: "Exterior" },
  { s: "/img/interior-equipment-cabinet.jpg",c: "Equipment cabinet & stretcher",      k: "Interior" },
  { s: "/img/exterior-neonatal-angle.jpg",   c: "Neonatal transport unit",            k: "Exterior" },
  { s: "/img/detail-quilted-seat.jpg",       c: "Attendant seating detail",           k: "Interior" },
  { s: "/img/exterior-yellow-front.jpg",     c: "Force Traveller BLS build",          k: "Exterior" },
  { s: "/img/interior-van-rear.jpg",         c: "Eeco-based BLS cabin",               k: "Interior" },
  { s: "/img/exterior-red-traveller.jpg",    c: "Completed build, pre-delivery",      k: "Exterior" },
  { s: "/img/interior-cabinets-sink.jpg",    c: "Storage & wash provision",           k: "Interior" },
  { s: "/img/exterior-neonatal-front.jpg",   c: "Neonatal unit, front elevation",     k: "Exterior" },
  { s: "/img/shell-bare-insulated.jpg",      c: "PU foam insulation, pre-fit-out",    k: "Fabrication" },
  { s: "/img/interior-green-lit.jpg",        c: "Cabin lighting circuit",             k: "Electrical" },
  { s: "/img/exterior-yellow-outdoor.jpg",   c: "Force Traveller conversion",         k: "Exterior" },
  { s: "/img/rear-open-stretcher.jpg",       c: "Rear loading, stretcher rail",       k: "Interior" },
  { s: "/img/detail-quilted-ceiling.jpg",    c: "Ceiling panel finish",               k: "Fabrication" },
  { s: "/img/interior-stretcher-blue.jpg",   c: "Multifunction stretcher cum trolly", k: "Interior" },
  { s: "/img/exterior-neonatal-rear.jpg",    c: "Beacon & rear warning lights",       k: "Electrical" },
  { s: "/img/driver-cabin.jpg",              c: "Driver cabin & controls",            k: "Electrical" },
  { s: "/img/interior-red-lit.jpg",          c: "Interior warning lighting",          k: "Electrical" },
  { s: "/img/interior-curtain-bench.jpg",    c: "Partition & bench layout",           k: "Interior" },
  { s: "/img/interior-stretcher-wood.jpg",   c: "Marine ply flooring, stretcher rail",k: "Fabrication" },
  { s: "/img/interior-floor-blue.jpg",       c: "Centre aisle clearance",             k: "Interior" },
];

export const galleryFilters = ["All", "Exterior", "Interior", "Electrical", "Fabrication"];

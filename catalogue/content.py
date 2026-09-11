# -*- coding: utf-8 -*-
"""
Adhavan Coach — Ambulance Catalogue content.
Source of truth: "ADHAVAN CATALOGUE CONTENT.pdf" (Catalogue Content folder).
Contact details cross-checked against the website data file (src/data/site.js).
Edit this file to change catalogue copy, then re-run build.py.
"""

BRAND = "Adhavan Coach"
STRAPLINE = "Emergency Care, Engineered to Move."
COVER_TAGLINE = ["Built for Every Emergency.", "Designed to Save Lives."]
COVER_PILLARS = ["Precision-\nEngineered", "Safety\nFirst", "High-\nQuality"]

ABOUT_HEAD = "ABOUT US"
ABOUT_BODY = (
    "Built in 2000, Adhavan Coach is a trusted ambulance fabrication company "
    "dedicated to offering advanced ambulance solutions that are tailored to meet "
    "diverse emergency needs. We design and build durable emergency vehicles, "
    "ambulance bodies, and medical vehicle interiors.\n\n"
    "Built with quality, designed with thought and precision, and equipped to make "
    "every second count, our international standard, high-quality vehicles are built "
    "for every emergency and designed to save lives."
)
PROMISE = [
    ("shield",  "Patient Safety\nFirst"),
    ("person",  "Ergonomic &\nFunctional Design"),
    ("badge",   "High Quality\nMaterials"),
    ("support", "Reliable\nAfter Sales Support"),
]

MODELS = [
    dict(
        n="01", name="PLYBOARD MICA", kind="BLS", sub="(Basic Life Support)",
        img="interior-bench-wood.jpg",
        lede="Designed for hospitals, clinics, and emergency medical operators looking for a "
             "durable Basic Life Support ambulance. The Plyboard Mica BLS combines a quality "
             "interior with essential medical functionality for safe and efficient patient transfer.",
        specs=["O₂ System", "90AH Alternator", "Sun Mica Interior",
               "Retractable Doctor Seat", "Marine Ply with Vinyl Flooring",
               "800VA High Frequency Inverter", "High Illuminating LED Flashlights",
               "Multifunction Stretcher cum Trolley",
               "Horizontally Mounted ‘D’ Type Cylinder",
               "Air Conditioning (Patient Cabin Only)", "Integrated Electronic Siren",
               "Public Addressing System"],
        close="A dependable BLS ambulance that delivers comfort, durability, and zero "
              "compromise on essential care.",
    ),
    dict(
        n="02", name="BASIC", kind="BLS", sub="(Basic Life Support)",
        img="interior-cabin-white-blue.jpg",
        lede="Created for healthcare providers who need a reliable, cost-effective Basic Life "
             "Support ambulance for routine emergency response and patient transfer. The Basic "
             "BLS offers a spacious layout and essential medical provisions for smooth on-road care.",
        specs=["O₂ System", "90AH Alternator", "Fiber Interior",
               "Retractable Doctor Seat", "Marine Ply with Vinyl Flooring",
               "800VA High Frequency Inverter", "High Illuminating LED Flash Lights",
               "Multifunction Stretcher cum Trolly",
               "Horizontally Mounted ‘D’ Type Cylinder",
               "Air Conditioning (Patient Cabin Only)", "Integrated Electronic Siren",
               "Public Addressing System"],
        close="A reliable pick for safe patient transport, quick response, and everyday "
              "emergency care to save lives.",
    ),
    dict(
        n="03", name="CLASSIC 1", kind="BLS + ALS", sub="(Basic Life Support + Advanced Life Support)",
        img="interior-wide-bench.jpg",
        lede="During emergencies every second counts — this one’s built to count them "
             "right. Designed for hospitals and medical operators who need one vehicle to do the "
             "job of two, Classic 1 combines Basic Life Support essentials with an Advanced Life "
             "Support layer.",
        specs=["O₂ System", "Running Lights", "Fiber Interior", "90AH Alternator",
               "Fibre Half Cup Boards", "Retractable Doctor Seat",
               "Marine Ply with Vinyl Flooring", "800VA High Frequency Invertor",
               "High Illuminating LED Flash Lights", "Multifunction Stretcher Cum Trolly",
               "Horizontally Mounted ‘D’ Type Cylinder",
               "Air Conditioning (Patient Cabin Only)", "Integrated Electronic Siren",
               "Public Addressing System"],
        close="One vehicle, two levels of care and zero compromise — it never asks you to "
              "choose between stabilisation and advanced intervention on the way to the hospital.",
    ),
    dict(
        n="04", name="CLASSIC 2", kind="ALS", sub="(Advanced Life Support)",
        img="interior-stretcher-blue.jpg",
        lede="When the situation is precarious, the solution is advanced life support. Built for "
             "critical transfers, trauma response, and cardiac emergencies where intervention "
             "might need to happen in transit, not after arrival.",
        specs=["O₂ System", "Running Lights", "233AH Alternator",
               "Fiber Full Cup Board & Interior", "Retractable Doctor Seat",
               "Marine Ply with Vinyl Flooring", "800VA High Frequency Invertor",
               "High Illuminating BIG LED Flash Lights", "Multifunction Stretcher Cum Trolly",
               "Horizontally Mounted ‘D’ Type Cylinder",
               "Air Conditioning (Patient & Driver Cabin)", "Integrated Electronic Siren",
               "Public Addressing System"],
        close="Engineered for teams who need clinical-grade capability the moment the doors "
              "close. This is advanced care that doesn’t wait for the ER.",
    ),
    dict(
        n="05", name="EQUIPPED AMBULANCE", kind="ALS", sub="(Advanced Life Support)",
        img="interior-equipment-cabinet.jpg",
        lede="It’s not just an ambulance; it’s a mobile ICU. This is critical care, "
             "mobilised — a fully outfitted ALS unit built around a complete life-support "
             "ecosystem.",
        specs=["Suction", "AMBU Bag", "Ventilator", "Spine Board", "Vacuum Splints",
               "Scoop Stretcher", "Head Immobilizer", "Defibrillator / AED",
               "Multipara Monitor", "Infusion / Syringe Pump",
               "Multifunctional Stretcher Cum Trolly (Ferno)"],
        close="Every component is chosen for one reason: in this vehicle, equipment isn’t "
              "allowed to fail. Built for the moments where the ambulance is the first hour of "
              "treatment.",
    ),
]

PRICING_HEAD = ["YOUR CHOICE OF AMBULANCE.", "OUR STANDARD DOESN’T CHANGE."]
PRICING_LEDE = ("Uncompromising care in transit. That’s an Adhavan Coach promise.")
PRICING_BODY = (
    "Get in touch with our team for a customised quote based on your requirements. Pricing for "
    "each ambulance varies significantly based on your specific requirements: the equipment "
    "fitting (from basic monitoring to full ICU-grade systems), the interior materials and "
    "fabrication used, and the type of ambulance required.\n\n"
    "Every unit is configured around your operational needs, so we work closely with you to "
    "build a solution and a quote tailored to exactly what you need."
)
PRICING_FACTORS = [
    ("01", "Equipment fitting", "From basic monitoring through to full ICU-grade systems."),
    ("02", "Interior & fabrication", "Sun Mica, fibre or full cupboard interiors and finishes."),
    ("03", "Type of ambulance", "BLS, BLS + ALS, or a fully equipped ALS mobile ICU."),
]
DISCLAIMER = (
    "Disclaimer: The ambulance specifications, features, equipment, and configurations shown in "
    "this catalogue are for reference purposes and may vary based on the vehicle model, customer "
    "requirements, and applicable regulations. Images may include optional or customised equipment "
    "not included in standard configurations. For the latest product details, specifications, and "
    "configurations, please contact Adhavan Coach directly."
)

CLOSING_HEAD = [("BUILT FOR EVERY ", "MISSION."), ("READY FOR EVERY ", "MOMENT.")]
CLOSING_SUB = ["Reliable. Functional. Life-saving.", "That’s the Adhavan Coach promise."]

CONTACT = dict(
    phone="+91 88387 44495",
    email="adhavancoach@gmail.com",
    address="No. 123/1, F2, MGR Street, Ambedkar Nagar,\nRed Hills, Chennai – 600052, Tamil Nadu",
)

COVER_IMG = "exterior-red-traveller.jpg"
ABOUT_IMG = "interior-floor-blue.jpg"
CLOSING_IMG = "exterior-yellow-outdoor.jpg"
FOOTER_TEXT = "ADHAVAN COACH CATALOGUE"

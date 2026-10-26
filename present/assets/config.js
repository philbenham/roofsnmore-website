/* =====================================================================
   ROOFS-N-MORE · IN-HOME PRESENTATION · EDIT-ME CONFIG
   ---------------------------------------------------------------------
   Everything the rep might need to change lives in this one block.
   Anything marked  placeholder: true  shows a "PHIL TO CONFIRM" tag on
   screen until you put the real number in and set placeholder to false.
   ===================================================================== */
window.REVITALIZE_CONFIG = {

  /* ---------- PACKAGE PRICING (per roofing square = 100 sq ft) ----------
     Source: RehashHero "quote" funnel, Roofs N More (published), same
     numbers as rnm-quote (quote.roofsnmore.com). Pulled Oct 25, 2026.
     Funnel names -> deck names:  Premium -> Elite,  Signature -> Premier,
     Essential -> Essential.
     Funnel math (computeRange):
       squares x (1 + waste)  x  material rate  x shape multiplier
     + squares x (1 + waste)  x  labor rate     x stories x shape multiplier
     each part rounded to the nearest $100.                              */
  PACKAGES: {
    Elite:     { materialsLowPerSq: 580, materialsHighPerSq: 640, plywoodIncluded: 20, funnelName: "Premium"   },
    Premier:   { materialsLowPerSq: 460, materialsHighPerSq: 510, plywoodIncluded: 10, funnelName: "Signature" },
    Essential: { materialsLowPerSq: 380, materialsHighPerSq: 420, plywoodIncluded: 5,  funnelName: "Essential" }
  },
  RATE_POINT: "low",          // "low" or "high" end of the funnel's range
  LABOR_PER_SQ: 150,          // $ per square (funnel setting)
  WASTE_PCT: 0.10,            // 10% waste (funnel setting)
  ROUND_TO: 100,              // funnel rounds to nearest $100
  STORIES: { "1 story": 1.00, "2 stories": 1.15, "3+ stories": 1.30 },     // labor only
  SHAPE:   { "Simple": 1.00, "A few angles": 1.10, "Lots of angles": 1.20 }, // materials + labor
  MINIMUM_PRICE: 0,           // the funnel has no minimum; set one here if wanted

  /* ---------- EXTRA PLYWOOD (beyond the package allotment) ---------- */
  PLYWOOD_PER_SHEET: 100,     // $100 installed per sheet (from the manual)

  /* ---------- FINANCING (monthly payment shown live) ---------- */
  FINANCE: { plan: "Synchrony Plan 964", aprPct: 10.99, months: 82 },

  /* ---------- PRICE HOLD ---------- */
  PRICE_HOLD_DAYS: 30,

  /* ---------- DISCOUNTS asked BEFORE the price (Step 9) ---------- */
  DISCOUNTS: {
    military:       { label: "Military",         amount: 250, placeholder: false },
    senior:         { label: "Senior Citizen",   amount: 250, placeholder: false },
    firstResponder: { label: "First Responder",  amount: 250, placeholder: false }
  },

  /* ---------- PROMOTIONS revealed AFTER the price (Step 9) ----------
     Amounts are entered live by the rep (small "$" field at the bottom-left
     of each promo slide). 0 = no promotion; the reveal is hidden/skipped. */
  PROMOS: {
    initialVisit: { label: "Initial Visit Discount", amount: 0, placeholder: false },
    marketing:    { label: "Marketing Discount",     amount: 0, placeholder: false }
  },

  /* ---------- COST VS VALUE (Step 7) ----------
     Remodeling magazine Cost vs Value report, Houston, roof replacement.
     Leave null to show "PHIL TO CONFIRM"; the rep can also type it live. */
  CVV: {
    edition: "2025",
    houstonRoofCost: 27116,     // 2025 CvV, West South Central region (Houston city figure not published/accessible), asphalt shingles, 30-sq spec. Resale value $18,478. https://www.jlconline.com/cost-vs-value/2025/west-south-central/
    typicalSquares: 30,
    resaleRecoupPct: 68.1     // 2025 CvV West South Central, roofing replacement (asphalt shingles)
  },

  /* ---------- CLOSE WORDING ---------- */
  INSTALL_DAYS: ["Thursday", "Friday"]
};

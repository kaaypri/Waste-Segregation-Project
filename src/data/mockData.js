export const kpis = {
  totalWasteCollected: "142.5 Tons",
  segregationRate: 83.2,
  complianceGrowth: "+5.4%",
  activeAlerts: 12
};

export const wasteCompositionData = [
  { zone: "North Zone", bio: 4000, nonBio: 2400, hazardous: 400 },
  { zone: "South Zone", bio: 3000, nonBio: 1398, hazardous: 200 },
  { zone: "East Zone", bio: 2000, nonBio: 9800, hazardous: 1500 },
  { zone: "West Zone", bio: 2780, nonBio: 3908, hazardous: 600 },
  { zone: "Central", bio: 1890, nonBio: 4800, hazardous: 800 }
];

export const monthlyTrendsData = [
  { month: 'Jan', compliance: 65, collection: 120 },
  { month: 'Feb', compliance: 68, collection: 125 },
  { month: 'Mar', compliance: 74, collection: 140 },
  { month: 'Apr', compliance: 78, collection: 135 },
  { month: 'May', compliance: 81, collection: 145 },
  { month: 'Jun', compliance: 83.2, collection: 142.5 }
];

export const householdData = [
  { id: "HH-1001", ward: "North Zone", lastLog: "2023-11-20", status: "Correct" },
  { id: "HH-1002", ward: "South Zone", lastLog: "2023-11-19", status: "Incorrect" },
  { id: "HH-1003", ward: "East Zone", lastLog: "2023-11-20", status: "Correct" },
  { id: "HH-1004", ward: "Central", lastLog: "2023-11-21", status: "Correct" },
  { id: "HH-1005", ward: "West Zone", lastLog: "2023-11-18", status: "Incorrect" },
  { id: "HH-1006", ward: "North Zone", lastLog: "2023-11-21", status: "Correct" },
  { id: "HH-1007", ward: "East Zone", lastLog: "2023-11-22", status: "Incorrect" },
  { id: "HH-1008", ward: "South Zone", lastLog: "2023-11-23", status: "Correct" },
  { id: "HH-1009", ward: "Central", lastLog: "2023-11-23", status: "Warning" }, // Meaning mixed mostly but some error
];

export const alertsData = [
  { id: 1, type: 'critical', title: "Major Segregation Failure", desc: "Ward East Zone reported > 50% mixed waste today.", time: "2 hours ago" },
  { id: 2, type: 'warning', title: "E-Waste Detected in General Bin", desc: "HH-1002 logged with e-waste in standard non-bio bin.", time: "5 hours ago" },
  { id: 3, type: 'info', title: "Collection Truck Delayed", desc: "Truck 4 (North Zone) is delayed by 45 mins due to traffic.", time: "1 day ago" },
  { id: 4, type: 'success', title: "Compliance Target Reached", desc: "Central Zone reached 90% segregation compliance this week.", time: "2 days ago" },
];

export const wasteEducationContent = {
  types: [
    { title: "Biodegradable (Wet Waste)", desc: "Kitchen waste, food scraps, leaves, meat, and organic matter.", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { title: "Non-Biodegradable (Dry Waste)", desc: "Plastics, glass, paper, cardboard, and metal objects.", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { title: "Hazardous Waste", desc: "Batteries, paints, chemicals, and medical waste.", color: "bg-red-50 text-red-700 border-red-200" },
    { title: "E-Waste", desc: "Old electronics, chargers, wires, and appliances.", color: "bg-purple-50 text-purple-700 border-purple-200" }
  ],
  dos: [
    "Always separate wet and dry waste at the source.",
    "Rinse plastic containers before throwing them in dry waste.",
    "Compost vegetable peels and garden waste if possible.",
    "Dispose of sanitary waste wrapped securely in paper."
  ],
  donts: [
    "Do not mix electronic waste with regular dry waste.",
    "Never flush hazardous chemicals or oils down the drain.",
    "Avoid throwing broken glass without wrapping it in newspaper or a box.",
    "Do not burn plastic or rubber waste."
  ],
  problem: "Improper waste segregation leads to overflowing landfills, greenhouse gas emissions, and toxic chemicals leaching into our groundwater. Mixed waste is extremely difficult and expensive to recycle.",
  solution: "By segregating waste at the source into distinct categories, we allow wet waste to be composted into fertilizer, and dry waste to be recycled efficiently, significantly reducing our environmental footprint."
};

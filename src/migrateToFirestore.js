import { db } from './firebase.js';
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { kpis, wasteCompositionData, monthlyTrendsData, householdData, alertsData } from './data/mockData.js';

export const migrateData = async () => {
  try {
    console.log("Starting migration...");

    // 1. Migrate KPIs
    await setDoc(doc(db, "system", "kpis"), kpis);
    console.log("KPIs migrated.");

    // 2. Migrate Waste Composition
    for (const item of wasteCompositionData) {
      await addDoc(collection(db, "wasteComposition"), item);
    }
    console.log("Waste Composition migrated.");

    // 3. Migrate Monthly Trends
    for (const item of monthlyTrendsData) {
      await addDoc(collection(db, "monthlyTrends"), item);
    }
    console.log("Monthly Trends migrated.");

    // 4. Migrate Household Logs
    for (const item of householdData) {
      await addDoc(collection(db, "householdLogs"), item);
    }
    console.log("Household Logs migrated.");

    // 5. Migrate Alerts
    for (const item of alertsData) {
      await addDoc(collection(db, "alerts"), item);
    }
    console.log("Alerts migrated.");

    // 6. Migrate Initial Admin User
    const adminUser = {
      fullName: "Admin User",
      email: "admin.zonal@ecomonitor.gov",
      role: "Zonal Officer",
      zone: "Central District",
      department: "Waste Management Dept.",
      storageUsed: 45,
      storageTotal: 100
    };
    await setDoc(doc(db, "users", "admin_default"), adminUser);
    console.log("Admin user migrated.");

    console.log("Migration complete!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
};

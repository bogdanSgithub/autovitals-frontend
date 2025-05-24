import { useState, CSSProperties } from "react";
import { AllProfiles } from "./AllProfiles";
import { AllMaintenances } from "../maintenance/AllMaintenances";

type TabKey = "profiles" | "maintenances";


/**
 * AdminDashboard component that displays a dashboard for admin users to manage profiles and maintenances.
 * @returns {JSX.Element} The rendered AdminDashboard component.
 */
export function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<TabKey>("profiles");

    const renderTab = () => {
    switch (activeTab) {
        case "profiles":
            return <AllProfiles/>;
        case "maintenances":
            return <AllMaintenances/>;
        }
    };

    return (
    <div style={styles.container}>
      <div style={styles.tabButtons}>
        <TabButton
          label="Profiles"
          isActive={activeTab === "profiles"}
          onClick={() => setActiveTab("profiles")}
        />
        <TabButton
          label="Maintenances"
          isActive={activeTab === "maintenances"}
          onClick={() => setActiveTab("maintenances")}
        />
      </div>

      <div style={styles.tabContent}>{renderTab()}</div>
    </div>
  );
}

type TabButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    style={{
      ...styles.tabButton,
      ...(isActive ? styles.activeTabButton : {}),
    }}
  >
    {label}
  </button>
);

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "24px",
    fontFamily: "sans-serif",
  },
  tabButtons: {
    display: "flex",
    gap: "12px",
  },
  tabButton: {
    padding: "8px 16px",
    fontSize: "16px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#555",
  },
  activeTabButton: {
    color: "#0077cc",
  },
};
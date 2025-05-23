// Bogdan
import { JSX } from "react";
import { Maintenance } from "./Maintenance";

/**
 * Displays a profile profile card if a valid profile is provided.
 * 
 * @param {profile | undefined} props.profile - The profile to display. If undefined or incomplete, a placeholder message is shown.
 * @returns {JSX.Element} The DisplayProfile component.
 */
export function DisplayMaintenanceSmall(props: { maintenance: Maintenance | undefined }): JSX.Element {
  const maintenance = props.maintenance;
  const hasMaintenance = maintenance?.carPart && maintenance?.lastChanged;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '6px 12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    flexWrap: 'nowrap',
    margin: '5px',
    width: '100vw'
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    height: '40px',
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 500
  };

  return (
    <div style={containerStyle}>
      {hasMaintenance ? (
        <>
          <div style={itemStyle}><span style={labelStyle}>Part:</span><span>{maintenance.carPart}</span></div>
          <div style={itemStyle}><span style={labelStyle}>Last Changed:</span><span>{maintenance.lastChanged}</span></div>
          <div style={itemStyle}><span style={labelStyle}>Mileage:</span><span>{maintenance.mileage} km</span></div>
          <div style={itemStyle}><span style={labelStyle}>Price:</span><span>${maintenance.price}</span></div>
        </>
      ) : (
        <span style={{ fontStyle: 'italic' }}>No maintenance selected</span>
      )}
    </div>
  );
}
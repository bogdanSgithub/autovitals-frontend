// Bogdan
import { JSX } from "react";
import { Profile } from "./Profile";

/**
 * Displays a profile profile card if a valid profile is provided.
 * 
 * @param {profile | undefined} props.profile - The profile to display. If undefined or incomplete, a placeholder message is shown.
 * @returns {JSX.Element} The DisplayProfile component.
 */
export function DisplayProfile(props: { profile: Profile | undefined }): JSX.Element {
  const profile = props.profile;
  const hasProfile = profile?.email && profile?.username;

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
  };

  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "500px",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box",
  };

  const infoContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "16px",
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 500,
  };

  const placeholderStyle: React.CSSProperties = {
    fontStyle: "italic",
    marginTop: "16px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Profile</h2>
        {hasProfile ? (
          <div style={infoContainerStyle}>
            <div style={rowStyle}><span style={labelStyle}>Username:</span> {profile.username}</div>
            <div style={rowStyle}><span style={labelStyle}>Email:</span> {profile.email}</div>
            <div style={rowStyle}><span style={labelStyle}>Reminder Preference:</span> {profile.emailReminderPreference}</div>
            <div style={rowStyle}><span style={labelStyle}>Coordinates:</span> {profile.coordinates}</div>
          </div>
        ) : (
          <p style={placeholderStyle}>No profile selected</p>
        )}
      </div>
    </div>
  );
}

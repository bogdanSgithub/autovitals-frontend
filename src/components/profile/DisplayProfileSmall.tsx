// Bogdan
import { JSX } from "react";
import { Profile } from "./Profile";

/**
 * Displays a profile profile card if a valid profile is provided.
 * 
 * @param {profile | undefined} props.profile - The profile to display. If undefined or incomplete, a placeholder message is shown.
 * @returns {JSX.Element} The DisplayProfile component.
 */
export function DisplayProfileSmall(props: { profile: Profile | undefined }): JSX.Element {
    const profile = props.profile;
  const hasProfile = profile?.email && profile?.username;

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
      {hasProfile ? (
        <>
          <div style={itemStyle}><span style={labelStyle}>Username:</span><span>{profile.username}</span></div>
          <div style={itemStyle}><span style={labelStyle}>Email:</span><span>{profile.email}</span></div>
          <div style={itemStyle}><span style={labelStyle}>Reminder:</span><span>{profile.emailReminderPreference}</span></div>
          <div style={itemStyle}><span style={labelStyle}>Coordinates:</span><span>{profile.coordinates}</span></div>
        </>
      ) : (
        <span style={{ fontStyle: 'italic' }}>No profile selected</span>
      )}
    </div>
  );
}
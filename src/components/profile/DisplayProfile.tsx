// Bogdan
import { JSX } from "react";
import { Profile } from "./Profile";
import "./DisplayProfile.css";

/**
 * Displays a profile profile card if a valid profile is provided.
 * 
 * @param {profile | undefined} props.profile - The profile to display. If undefined or incomplete, a placeholder message is shown.
 * @returns {JSX.Element} The DisplayProfile component.
 */
export function DisplayProfile(props: { profile: Profile | undefined }): JSX.Element {
  const profile = props.profile;
  const hasProfile = profile?.email && profile?.username;

  return (
    <div className="display-container">
      <div className="display-card">
        <h2>Profile</h2>
        {hasProfile ? (
          <div className="profile-info">
            <div className="info-row"><span className="label">Username:</span> {profile.username}</div>
            <div className="info-row"><span className="label">Email:</span> {profile.email}</div>
            <div className="info-row"><span className="label">Reminder Preference:</span> {profile.emailReminderPreference}</div>
            <div className="info-row"><span className="label">Coordinates:</span> {profile.coordinates}</div>
          </div>
        ) : (
          <p className="placeholder-text">No profile selected</p>
        )}
      </div>
    </div>
  );
}
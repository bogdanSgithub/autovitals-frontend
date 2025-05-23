import { JSX, useEffect, useState } from "react";
import { Maintenance } from "../maintenance/Maintenance";
import { fetchAllMaintenances } from "../maintenance/FetchAllMaintenances";
import { FaBell } from "react-icons/fa";
import { Profile } from "../profile/Profile";
import { fetchProfile } from "../profile/FetchProfile";

/**
 * Bogdan
 * @param props 
 * @returns 
 */
export function DisplayNotifications(props: { id: string, model: string, userID: string }): JSX.Element {
    const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
    useEffect(() => {
        // the thing worked, sent myself 10 emails
        const processNotifications = async () => {
            // Get upcoming maintenances
            fetchAllMaintenances(props.id, async (maintenances: Maintenance[]) => {
                const upcoming = maintenances.filter(m => new Date(m.lastChanged) > new Date());
    
                // Fetch profile, but don't rely on setProfile for immediate use
                let fetchedProfile: Profile | null = null;
                await fetchProfile(props.userID, (result: Profile) => {
                    fetchedProfile = result;
                });
    
                if (!fetchedProfile) return;
    
                // Send emails
                /*
                await Promise.all(
                    upcoming.map(async (maintenance) => {
                        const lastReminderDate = new Date(fetchedProfile!.emailReminderPreference ?? 0);
                        const maintenanceDate = new Date(maintenance.lastChanged);
                        if (!fetchedProfile) {
                            return;
                        }
                        if (maintenanceDate < new Date(fetchedProfile.emailReminderPreference)) {
                        console.log(`Skipping email for ${maintenance.carPart}, sent too recently.`);
                        return;
                        }
                        
                        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profiles/emailReminder`, {
                            method: "POST",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email: fetchedProfile!.email,
                                username: fetchedProfile!.username,
                                subject: `Reminder of Upcoming Maintenance: ${maintenance.carPart}`,
                                html: `<p>Dear ${fetchedProfile!.username},</p><p>Don't forget about the upcoming maintenance: ${maintenance.carPart} scheduled for ${maintenance.lastChanged}.</p>`
                            })
                        });
    
                        if (!response.ok) {
                            console.error(`Failed to send reminder for ${maintenance.carPart}`);
                        }
                    })
                );*/
    
                // Update state
                setMaintenances(upcoming);
            });
        };
    
        processNotifications();
    }, [props.id, props.userID]);
    
    

    return (
        <>
              <style>
            {`
            .notification-wrapper {
                position: relative;
                height: 100%;
                padding: 4px;
            }

            .notification-bell {
                position: absolute;
                top: 0;
                right: 0;
                display: inline-block;
                font-size: 24px;
                cursor: pointer;
                z-index: 1;
            }

            .notification-bell .icon {
                color: #4fa3f7; /* Skyblue bell */
            }

            .notification-bell .count {
                position: absolute;
                top: -4px;
                right: -4px;
                background-color: red;
                color: white;
                font-size: 12px;
                border-radius: 50%;
                padding: 2px 4px;
                min-width: 16px;
                text-align: center;
            }
            `}
        </style>

        {maintenances.length > 0 &&
            <div className="notification-wrapper">
            <div className="notification-bell">
                <FaBell className="icon" size={32} />
                <div className="count">{maintenances.length}</div>
            </div>
            </div>
        }
        </>
    );
}

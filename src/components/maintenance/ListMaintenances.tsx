// Bogdan
import { JSX } from "react";
import { Maintenance } from "./Maintenance";
import { DisplayMaintenanceSmall } from "./DisplayMaintenanceSmall";

/**
 * Displays a list of profiles with links to their profiles.
 * @returns {JSX.Element} The rendered JSX for the list of profiles.
 */
export function ListMaintenances({ maintenances }: { maintenances: Maintenance[]; deleteAdmin: boolean } ): JSX.Element {    
    return (
    <>  
        <h2>All Maintenances</h2>  
        <div>
            {maintenances.map((maintenance) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DisplayMaintenanceSmall key={maintenance._id} maintenance={maintenance} />
            </div>
            ))}
        </div>
    </>
    )
}
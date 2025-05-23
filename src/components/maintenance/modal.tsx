import "./modal.css";
import { Maintenance } from "./Maintenance";

interface ModalProps {
  record: Maintenance;
  isEditing: boolean;
  onClose: () => void;
  onFieldChange: (field: keyof Maintenance, value: string | number) => void;
  onSave: () => void;
  onEdit: () => void;
  onCancelEdit: () => void;
}

export default function Modal({
  record,
  isEditing,
  onClose,
  onFieldChange,
  onSave,
  onEdit,
  onCancelEdit,
}: ModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {isEditing ? (
          <>
            <input
              value={record.carPart}
              onChange={(e) => onFieldChange("carPart", e.target.value)}
            />
            <input
              type="date"
              value={record.lastChanged.slice(0, 10)}
              onChange={(e) => onFieldChange("lastChanged", e.target.value)}
            />
            <input
              type="number"
              value={record.mileage}
              onChange={(e) => onFieldChange("mileage", parseInt(e.target.value))}
            />
            <input
              type="number"
              value={record.price}
              onChange={(e) => onFieldChange("price", parseInt(e.target.value))}
            />
            
            <button onClick={onSave}>Save</button>
            <button onClick={onCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <h2>{record.carPart}</h2>
            <p>Last Changed: {record.lastChanged.slice(0, 10)}</p>
            <p>Mileage: {record.mileage} km</p>
            <p>Cost : {record.price} $</p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
}

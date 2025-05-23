import { JSX } from "react";
import { Maintenance } from "./Maintenance";
import './recordList.css';

interface RecordListProps {
  records: Maintenance[];
  onSelect: (record: Maintenance) => void;
  onDelete: (carPart: string) => void;
}

export default function RecordList({
  records,
  onSelect,
  onDelete,
}: RecordListProps): JSX.Element {
  return (
    <ul className="records-list">
      {records.length > 0 ? (
        records.slice(0, 10).map((record, index) => (
          <li key={index} className="record-item">
            <div
              onClick={() => {
                onSelect(record);
              }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span>
                <strong>{record.carPart}</strong> —{" "}
                {record.lastChanged ? record.lastChanged.slice(0, 10) : "N/A"}
              </span>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(record.carPart);
                }}
              >
                ❌
              </button>
            </div>
          </li>
        ))
      ) : (
        <li className="record-item">No records found.</li>
      )}
    </ul>
  );
}

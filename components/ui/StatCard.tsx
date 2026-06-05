export default function StatCard({
  label,
  value,
  note,
  positive,
}: {
  label: string;
  value: string;
  note?: string;
  positive?: boolean;
}) {
  return (
    <div className="analytics-stat-card">
      <span className="analytics-stat-label">{label}</span>
      <span className="analytics-stat-value">{value}</span>
      {note && (
        <span className="analytics-stat-note">
          {positive && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" className="inline-block mr-1 -mt-0.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {note}
        </span>
      )}
    </div>
  );
}

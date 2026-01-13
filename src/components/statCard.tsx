export const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
};

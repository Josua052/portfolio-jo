type Props = {
  company: string;
  location: string;
  role: string;
  period: string;
  points: string[];
  highlight?: boolean;
};

export default function ExperienceCard({
  company,
  location,
  role,
  period,
  points,
  highlight,
}: Props) {
  return (
    <div className="relative group">
      {/* Dot */}
      <div className="absolute -left-[34px] top-2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-neutral-950" />

      {/* Card */}
      <div
        className={`p-6 rounded-2xl border transition-all duration-300 
        ${
          highlight
            ? "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/30"
            : "bg-neutral-900/60 border-neutral-800"
        }
        backdrop-blur-xl hover:border-indigo-400/40 hover:shadow-xl hover:shadow-indigo-500/10`}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-xl font-semibold">{role}</h3>
            <p className="text-neutral-400 text-sm">
              {company} • {location}
            </p>
          </div>
          <span className="text-sm text-neutral-500">{period}</span>
        </div>

        {/* Points */}
        <ul className="space-y-2 text-neutral-300 text-sm leading-relaxed">
          {points.map((point, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-indigo-400">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { getSeasons, getStats, updateStats, updateSeason, addSeason, deleteSeason } from "@/api";
import { useState } from "react";

export const Route = createFileRoute("/admin")({
  loader: async () => {
    const stats = await getStats();
    const seasonsList = await getSeasons();
    return { stats, seasonsList };
  },
  component: AdminDashboard,
});

function AdminDashboard() {
  const { stats, seasonsList } = Route.useLoaderData();
  const router = useRouter();
  
  // Stats state
  const [teamsCount, setTeamsCount] = useState(stats?.teamsCount || 0);
  const [seasonsCount, setSeasonsCount] = useState(stats?.seasonsCount || 0);
  const [matchesCount, setMatchesCount] = useState(stats?.matchesCount || 0);
  const [trophyCount, setTrophyCount] = useState(stats?.trophyCount || 0);

  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stats) return;
    await updateStats({ data: {
      id: stats.id,
      teamsCount,
      seasonsCount,
      matchesCount,
      trophyCount
    }});
    router.invalidate();
    alert("Stats updated!");
  };

  const handleDeleteSeason = async (id: number) => {
    if (confirm("Are you sure you want to delete this season?")) {
      await deleteSeason({ data: id });
      router.invalidate();
    }
  };

  return (
    <PageShell
      eyebrow="Admin"
      title="Unity Cup Control Panel"
      intro="Manage global statistics and season history dynamically."
    >
      <div className="flex flex-col gap-12">
        {/* Stats Editor */}
        <div className="rounded-3xl border border-ink/10 bg-card/60 p-6 sm:p-8">
          <h2 className="font-askan text-2xl text-ink mb-6">Global Statistics</h2>
          <form onSubmit={handleSaveStats} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="flex flex-col gap-2">
              <span className="text-xs text-ink/50 uppercase">Teams Count</span>
              <input type="number" value={teamsCount} onChange={e => setTeamsCount(Number(e.target.value))} className="rounded-full bg-black/30 px-4 py-2 text-ink border border-ink/10" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs text-ink/50 uppercase">Seasons Count</span>
              <input type="number" value={seasonsCount} onChange={e => setSeasonsCount(Number(e.target.value))} className="rounded-full bg-black/30 px-4 py-2 text-ink border border-ink/10" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs text-ink/50 uppercase">Matches Count</span>
              <input type="number" value={matchesCount} onChange={e => setMatchesCount(Number(e.target.value))} className="rounded-full bg-black/30 px-4 py-2 text-ink border border-ink/10" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs text-ink/50 uppercase">Trophy Count</span>
              <input type="number" value={trophyCount} onChange={e => setTrophyCount(Number(e.target.value))} className="rounded-full bg-black/30 px-4 py-2 text-ink border border-ink/10" />
            </label>
            <div className="sm:col-span-2 lg:col-span-4 mt-2">
              <button type="submit" className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-background">Save Stats</button>
            </div>
          </form>
        </div>

        {/* Seasons Editor */}
        <div className="rounded-3xl border border-ink/10 bg-card/60 p-6 sm:p-8">
          <h2 className="font-askan text-2xl text-ink mb-6">Seasons History</h2>
          <div className="flex flex-col gap-4">
            {(seasonsList || []).map(s => (
              <SeasonRow key={s.id} season={s} />
            ))}
          </div>
          
          <div className="mt-12 border-t border-ink/10 pt-8">
            <h3 className="font-askan text-xl text-ink mb-4">Add New Season</h3>
            <AddSeasonForm />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function SeasonRow({ season }: { season: any }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(season);

  const handleSave = async () => {
    await updateSeason({ data: formData });
    setIsEditing(false);
    router.invalidate();
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this season?")) {
      await deleteSeason({ data: season.id });
      router.invalidate();
    }
  };

  if (isEditing) {
    return (
      <div className="flex flex-col gap-4 border border-primary/50 p-6 rounded-2xl bg-black/30">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-1"><span className="text-xs text-ink/50">Name</span><input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded bg-black/30 px-3 py-1.5 text-sm text-ink border border-ink/10" /></label>
          <label className="flex flex-col gap-1"><span className="text-xs text-ink/50">Year</span><input value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="rounded bg-black/30 px-3 py-1.5 text-sm text-ink border border-ink/10" /></label>
          <label className="flex flex-col gap-1"><span className="text-xs text-ink/50">Champion</span><input value={formData.champion} onChange={e => setFormData({...formData, champion: e.target.value})} className="rounded bg-black/30 px-3 py-1.5 text-sm text-ink border border-ink/10" /></label>
          <label className="flex flex-col gap-1"><span className="text-xs text-ink/50">Runner-up</span><input value={formData.runner} onChange={e => setFormData({...formData, runner: e.target.value})} className="rounded bg-black/30 px-3 py-1.5 text-sm text-ink border border-ink/10" /></label>
          <label className="flex flex-col gap-1"><span className="text-xs text-ink/50">Top Scorer</span><input value={formData.scorer} onChange={e => setFormData({...formData, scorer: e.target.value})} className="rounded bg-black/30 px-3 py-1.5 text-sm text-ink border border-ink/10" /></label>
          <label className="flex flex-col gap-1"><span className="text-xs text-ink/50">Teams</span><input type="number" value={formData.teams} onChange={e => setFormData({...formData, teams: Number(e.target.value)})} className="rounded bg-black/30 px-3 py-1.5 text-sm text-ink border border-ink/10" /></label>
          <label className="flex flex-col gap-1"><span className="text-xs text-ink/50">Status</span><input value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="rounded bg-black/30 px-3 py-1.5 text-sm text-ink border border-ink/10" /></label>
          <label className="flex flex-col gap-1 lg:col-span-4"><span className="text-xs text-ink/50">Note</span><textarea value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="rounded bg-black/30 px-3 py-2 text-sm text-ink border border-ink/10" rows={2} /></label>
        </div>
        <div className="flex gap-3 justify-end mt-2">
          <button onClick={() => setIsEditing(false)} className="px-4 py-1.5 text-sm text-ink/60 hover:text-ink">Cancel</button>
          <button onClick={handleSave} className="px-4 py-1.5 bg-primary text-background text-sm font-medium rounded-full hover:bg-primary/90">Save Changes</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center border border-ink/10 p-4 sm:p-6 rounded-2xl bg-black/30 hover:border-ink/20 transition-colors">
      <div className="flex flex-col gap-1">
        <h3 className="font-askan text-xl text-ink tracking-wide">{season.name} <span className="text-sm text-primary ml-2">{season.year}</span></h3>
        <p className="text-sm text-ink/60">Champion: {season.champion} <span className="mx-2 opacity-30">|</span> Status: {season.status}</p>
        <p className="text-xs text-ink/40 mt-1 line-clamp-1">{season.note}</p>
      </div>
      <div className="flex gap-4">
        <button onClick={() => setIsEditing(true)} className="text-primary text-sm font-medium uppercase tracking-wide hover:opacity-80">Edit</button>
        <button onClick={handleDelete} className="text-destructive text-sm font-medium uppercase tracking-wide hover:opacity-80">Delete</button>
      </div>
    </div>
  );
}

function AddSeasonForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "Season 04",
    year: new Date().getFullYear().toString(),
    champion: "To be decided",
    runner: "—",
    scorer: "—",
    teams: 16,
    status: "Planning",
    note: ""
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addSeason({ data: formData });
    setFormData({ ...formData, name: "", note: "" });
    router.invalidate();
    alert("Season added!");
  };

  return (
    <form onSubmit={handleAdd} className="flex flex-col gap-4 border border-ink/10 p-6 rounded-2xl bg-black/30">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1"><span className="text-xs text-ink/50">Name</span><input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded bg-black/30 px-3 py-1.5 text-sm text-ink border border-ink/10 focus:border-primary/50 outline-none" placeholder="Season 04" /></label>
        <label className="flex flex-col gap-1"><span className="text-xs text-ink/50">Year</span><input required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="rounded bg-black/30 px-3 py-1.5 text-sm text-ink border border-ink/10 focus:border-primary/50 outline-none" placeholder="2027" /></label>
        <label className="flex flex-col gap-1"><span className="text-xs text-ink/50">Champion</span><input required value={formData.champion} onChange={e => setFormData({...formData, champion: e.target.value})} className="rounded bg-black/30 px-3 py-1.5 text-sm text-ink border border-ink/10 focus:border-primary/50 outline-none" /></label>
        <label className="flex flex-col gap-1"><span className="text-xs text-ink/50">Runner-up</span><input required value={formData.runner} onChange={e => setFormData({...formData, runner: e.target.value})} className="rounded bg-black/30 px-3 py-1.5 text-sm text-ink border border-ink/10 focus:border-primary/50 outline-none" /></label>
        <label className="flex flex-col gap-1"><span className="text-xs text-ink/50">Top Scorer</span><input required value={formData.scorer} onChange={e => setFormData({...formData, scorer: e.target.value})} className="rounded bg-black/30 px-3 py-1.5 text-sm text-ink border border-ink/10 focus:border-primary/50 outline-none" /></label>
        <label className="flex flex-col gap-1"><span className="text-xs text-ink/50">Teams</span><input type="number" required value={formData.teams} onChange={e => setFormData({...formData, teams: Number(e.target.value)})} className="rounded bg-black/30 px-3 py-1.5 text-sm text-ink border border-ink/10 focus:border-primary/50 outline-none" /></label>
        <label className="flex flex-col gap-1"><span className="text-xs text-ink/50">Status</span><input required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="rounded bg-black/30 px-3 py-1.5 text-sm text-ink border border-ink/10 focus:border-primary/50 outline-none" /></label>
        <label className="flex flex-col gap-1 lg:col-span-4"><span className="text-xs text-ink/50">Note</span><textarea required value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="rounded bg-black/30 px-3 py-2 text-sm text-ink border border-ink/10 focus:border-primary/50 outline-none" rows={2} placeholder="Add season details..." /></label>
      </div>
      <div className="flex justify-end mt-2">
        <button type="submit" className="px-6 py-2 bg-primary text-background text-sm font-medium rounded-full hover:bg-primary/90 transition-colors">Add Season</button>
      </div>
    </form>
  );
}

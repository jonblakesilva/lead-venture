import React, { useMemo, useState } from "react";

const tabs = [
  { id: "missed", label: "Missed Call Text Back", icon: "💬" },
  { id: "voice", label: "Voice AI Receptionist", icon: "🎙️" },
  { id: "convo", label: "Conversation AI", icon: "📞" },
  { id: "speed", label: "Speed to Lead", icon: "⚡" },
  { id: "db", label: "DB Reactivation", icon: "🗂️" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function formatUsd(value: number) {
  return currency.format(value);
}

export default function RoiCalculator() {
  const [active, setActive] = useState<TabId>("voice");

  const [mcCalls, setMcCalls] = useState(60);
  const [mcCloseNo, setMcCloseNo] = useState(10);
  const [mcCloseYes, setMcCloseYes] = useState(35);
  const [mcJob, setMcJob] = useState(450);

  const mcJobsNo = Math.round(mcCalls * (mcCloseNo / 100));
  const mcJobsYes = Math.round(mcCalls * (mcCloseYes / 100));
  const mcExtraJobs = mcJobsYes - mcJobsNo;
  const mcRevenue = mcExtraJobs * mcJob;

  const [vaVolume, setVaVolume] = useState(1000);
  const [vaDuration, setVaDuration] = useState(3);
  const [vaRate, setVaRate] = useState(20);
  const [vaAi, setVaAi] = useState(0.15);

  const vaHumanCost = vaVolume * vaDuration * (vaRate / 60);
  const vaAiCost = vaVolume * vaDuration * vaAi;
  const vaSavings = vaHumanCost - vaAiCost;

  const [caLeads, setCaLeads] = useState(150);
  const [caLost, setCaLost] = useState(40);
  const [caRec, setCaRec] = useState(25);
  const [caJob, setCaJob] = useState(450);

  const caLostNum = Math.round(caLeads * (caLost / 100));
  const caRecNum = Math.round(caLostNum * (caRec / 100));
  const caRevenue = caRecNum * caJob;

  const [spLeads, setSpLeads] = useState(150);
  const [spSlow, setSpSlow] = useState(12);
  const [spFast, setSpFast] = useState(30);
  const [spJob, setSpJob] = useState(450);

  const spJobsSlow = Math.round(spLeads * (spSlow / 100));
  const spJobsFast = Math.round(spLeads * (spFast / 100));
  const spExtraJobs = spJobsFast - spJobsSlow;
  const spRevenue = spExtraJobs * spJob;

  const [dbSize, setDbSize] = useState(2000);
  const [dbRate, setDbRate] = useState(4);
  const [dbJob, setDbJob] = useState(450);

  const dbReactivated = Math.round(dbSize * (dbRate / 100));
  const dbRevenue = dbReactivated * dbJob;

  const calcData = useMemo(() => {
    return {
      missed: {
        title: "Recovered Revenue",
        subtitle: "Missed calls turned into booked jobs",
        primary: formatUsd(mcRevenue),
        note: `${mcExtraJobs} extra jobs booked per month`,
        stats: [
          { label: "Jobs Won — No Follow-Up", value: mcJobsNo },
          { label: "Jobs Won — With Text Back", value: mcJobsYes },
        ],
      },
      voice: {
        title: "Lower Labor Cost",
        subtitle: "Compare human vs AI receptionist costs",
        primary: formatUsd(vaSavings),
        note: `AI saves ${formatUsd(vaSavings)} per month`,
        stats: [
          { label: "Human Cost", value: formatUsd(vaHumanCost) },
          { label: "AI Cost", value: formatUsd(vaAiCost) },
        ],
      },
      convo: {
        title: "Leads Recovered",
        subtitle: "Conversation AI keeps following up automatically",
        primary: formatUsd(caRevenue),
        note: `${caRecNum} leads recovered this month`,
        stats: [
          { label: "Leads Going Cold", value: caLostNum },
          { label: "Leads Recovered", value: caRecNum },
        ],
      },
      speed: {
        title: "Speed Wins Deals",
        subtitle: "Revenue gained from instant lead response",
        primary: formatUsd(spRevenue),
        note: `${spExtraJobs} extra jobs booked per month`,
        stats: [
          { label: "Jobs — Slow Response", value: spJobsSlow },
          { label: "Jobs — Instant Response", value: spJobsFast },
        ],
      },
      db: {
        title: "Reactivation Revenue",
        subtitle: "One-time win from your existing database",
        primary: formatUsd(dbRevenue),
        note: `${dbReactivated} contacts reactivated`,
        stats: [
          { label: "Contacts Reactivated", value: dbReactivated },
          { label: "Revenue Unlocked", value: formatUsd(dbRevenue) },
        ],
      },
    } as const;
  }, [mcRevenue, mcExtraJobs, mcJobsNo, mcJobsYes, vaHumanCost, vaAiCost, vaSavings, caLostNum, caRecNum, caRevenue, spRevenue, spJobsSlow, spJobsFast, spExtraJobs, dbRevenue, dbReactivated]);

  const controlClasses = "w-full accent-amber-500";

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
              active === tab.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {active === "missed" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <h3 className="mb-1 text-xl font-bold">Inputs</h3>
            <p className="mb-8 text-sm text-muted-foreground">Missed calls you're not converting</p>
            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Monthly Missed Calls</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">{mcCalls}</span>
                </div>
                <input className={controlClasses} type="range" min={0} max={300} value={mcCalls} onChange={(e) => setMcCalls(Number(e.target.value))} />
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Close Rate — No Follow-Up</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">{mcCloseNo}%</span>
                </div>
                <input className={controlClasses} type="range" min={0} max={100} value={mcCloseNo} onChange={(e) => setMcCloseNo(Number(e.target.value))} />
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Close Rate — With Auto Text Back</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">{mcCloseYes}%</span>
                </div>
                <input className={controlClasses} type="range" min={0} max={100} value={mcCloseYes} onChange={(e) => setMcCloseYes(Number(e.target.value))} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Avg Job Value ($)</label>
                <input className="w-full rounded-lg border bg-white px-3 py-3 text-base text-neutral-900 outline-none ring-0" type="number" value={mcJob} onChange={(e) => setMcJob(Number(e.target.value) || 0)} />
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border bg-[#1A1D27] p-8 text-white shadow-xl">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <h3 className="mb-1 text-xl font-bold text-white">Recovered Revenue</h3>
            <p className="mb-8 text-sm text-white/60">Missed calls turned into booked jobs</p>
            <div className="mb-8 grid grid-cols-2 gap-6">
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Jobs Won — No Follow-Up</div>
                <div className="text-3xl font-bold text-white">{mcJobsNo}</div>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Jobs Won — With Text Back</div>
                <div className="text-3xl font-bold text-white">{mcJobsYes}</div>
              </div>
            </div>
            <div className="mb-8 h-px w-full bg-white/10" />
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Additional Monthly Revenue</div>
              <div className="text-5xl font-black tracking-tight text-primary md:text-6xl">{formatUsd(mcRevenue)}</div>
              <div className="mt-3 text-sm text-white/60">{mcExtraJobs} extra jobs booked per month</div>
            </div>
          </div>
        </div>
      )}

      {active === "voice" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <h3 className="mb-1 text-xl font-bold">Inputs</h3>
            <p className="mb-8 text-sm text-muted-foreground">Compare human vs AI receptionist costs</p>
            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Monthly Call Volume</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">{vaVolume}</span>
                </div>
                <input className={controlClasses} type="range" min={0} max={5000} step={50} value={vaVolume} onChange={(e) => setVaVolume(Number(e.target.value))} />
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Average Call Duration (min)</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">{vaDuration}</span>
                </div>
                <input className={controlClasses} type="range" min={1} max={10} value={vaDuration} onChange={(e) => setVaDuration(Number(e.target.value))} />
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Human Answering Cost / Min</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">${vaRate}</span>
                </div>
                <input className={controlClasses} type="range" min={5} max={60} value={vaRate} onChange={(e) => setVaRate(Number(e.target.value))} />
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">AI Cost / Min</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">${vaAi.toFixed(2)}</span>
                </div>
                <input className={controlClasses} type="range" min={0.05} max={1} step={0.05} value={vaAi} onChange={(e) => setVaAi(Number(e.target.value))} />
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border bg-[#1A1D27] p-8 text-white shadow-xl">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <h3 className="mb-1 text-xl font-bold text-white">AI Savings</h3>
            <p className="mb-8 text-sm text-white/60">Monthly labor savings with voice AI</p>
            <div className="mb-8 grid grid-cols-2 gap-6">
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Human Cost</div>
                <div className="text-3xl font-bold text-white">{formatUsd(vaHumanCost)}</div>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">AI Cost</div>
                <div className="text-3xl font-bold text-white">{formatUsd(vaAiCost)}</div>
              </div>
            </div>
            <div className="mb-8 h-px w-full bg-white/10" />
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Monthly Savings</div>
              <div className="text-5xl font-black tracking-tight text-primary md:text-6xl">{formatUsd(vaSavings)}</div>
            </div>
          </div>
        </div>
      )}

      {active === "convo" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <h3 className="mb-1 text-xl font-bold">Inputs</h3>
            <p className="mb-8 text-sm text-muted-foreground">Recover more leads from cold conversations</p>
            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Monthly Leads</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">{caLeads}</span>
                </div>
                <input className={controlClasses} type="range" min={0} max={500} step={5} value={caLeads} onChange={(e) => setCaLeads(Number(e.target.value))} />
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Leads Going Cold</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">{caLost}%</span>
                </div>
                <input className={controlClasses} type="range" min={0} max={100} value={caLost} onChange={(e) => setCaLost(Number(e.target.value))} />
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Recovery Rate</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">{caRec}%</span>
                </div>
                <input className={controlClasses} type="range" min={0} max={100} value={caRec} onChange={(e) => setCaRec(Number(e.target.value))} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Avg Job Value ($)</label>
                <input className="w-full rounded-lg border bg-white px-3 py-3 text-base text-neutral-900 outline-none ring-0" type="number" value={caJob} onChange={(e) => setCaJob(Number(e.target.value) || 0)} />
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border bg-[#1A1D27] p-8 text-white shadow-xl">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <h3 className="mb-1 text-xl font-bold text-white">Leads Recovered</h3>
            <p className="mb-8 text-sm text-white/60">Conversation AI keeps following up automatically</p>
            <div className="mb-8 grid grid-cols-2 gap-6">
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Leads Going Cold</div>
                <div className="text-3xl font-bold text-white">{caLostNum}</div>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Leads Recovered</div>
                <div className="text-3xl font-bold text-white">{caRecNum}</div>
              </div>
            </div>
            <div className="mb-8 h-px w-full bg-white/10" />
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Additional Monthly Revenue</div>
              <div className="text-5xl font-black tracking-tight text-primary md:text-6xl">{formatUsd(caRevenue)}</div>
            </div>
          </div>
        </div>
      )}

      {active === "speed" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <h3 className="mb-1 text-xl font-bold">Inputs</h3>
            <p className="mb-8 text-sm text-muted-foreground">Faster response, higher close rate</p>
            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Monthly Leads</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">{spLeads}</span>
                </div>
                <input className={controlClasses} type="range" min={0} max={1000} step={5} value={spLeads} onChange={(e) => setSpLeads(Number(e.target.value))} />
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Close Rate — Slow Response (30+ min)</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">{spSlow}%</span>
                </div>
                <input className={controlClasses} type="range" min={0} max={100} value={spSlow} onChange={(e) => setSpSlow(Number(e.target.value))} />
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Close Rate — Instant AI Response</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">{spFast}%</span>
                </div>
                <input className={controlClasses} type="range" min={0} max={100} value={spFast} onChange={(e) => setSpFast(Number(e.target.value))} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Avg Job Value ($)</label>
                <input className="w-full rounded-lg border bg-white px-3 py-3 text-base text-neutral-900 outline-none ring-0" type="number" value={spJob} onChange={(e) => setSpJob(Number(e.target.value) || 0)} />
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border bg-[#1A1D27] p-8 text-white shadow-xl">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <h3 className="mb-1 text-xl font-bold text-white">Speed Wins Deals</h3>
            <p className="mb-8 text-sm text-white/60">Revenue gained from instant lead response</p>
            <div className="mb-8 grid grid-cols-2 gap-6">
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Jobs — Slow Response</div>
                <div className="text-3xl font-bold text-white">{spJobsSlow}</div>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Jobs — Instant Response</div>
                <div className="text-3xl font-bold text-white">{spJobsFast}</div>
              </div>
            </div>
            <div className="mb-8 h-px w-full bg-white/10" />
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Additional Monthly Revenue</div>
              <div className="text-5xl font-black tracking-tight text-primary md:text-6xl">{formatUsd(spRevenue)}</div>
              <div className="mt-3 text-sm text-white/60">{spExtraJobs} extra jobs booked per month</div>
            </div>
          </div>
        </div>
      )}

      {active === "db" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <h3 className="mb-1 text-xl font-bold">Inputs</h3>
            <p className="mb-8 text-sm text-muted-foreground">Old leads and past customers, re-engaged</p>
            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Database Size (contacts)</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">{dbSize}</span>
                </div>
                <input className={controlClasses} type="range" min={0} max={20000} step={100} value={dbSize} onChange={(e) => setDbSize(Number(e.target.value))} />
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Reactivation Rate</span>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold text-primary">{dbRate}%</span>
                </div>
                <input className={controlClasses} type="range" min={0} max={20} step={0.5} value={dbRate} onChange={(e) => setDbRate(Number(e.target.value))} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Avg Job Value ($)</label>
                <input className="w-full rounded-lg border bg-white px-3 py-3 text-base text-neutral-900 outline-none ring-0" type="number" value={dbJob} onChange={(e) => setDbJob(Number(e.target.value) || 0)} />
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border bg-[#1A1D27] p-8 text-white shadow-xl">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <h3 className="mb-1 text-xl font-bold text-white">Reactivation Revenue</h3>
            <p className="mb-8 text-sm text-white/60">One-time win from your existing database</p>
            <div className="mb-8">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Contacts Reactivated</div>
              <div className="text-3xl font-bold text-white">{dbReactivated}</div>
            </div>
            <div className="mb-8 h-px w-full bg-white/10" />
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Revenue Unlocked</div>
              <div className="text-5xl font-black tracking-tight text-primary md:text-6xl">{formatUsd(dbRevenue)}</div>
              <div className="mt-3 text-sm text-white/60">One-time campaign, run any time</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

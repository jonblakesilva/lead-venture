import React, { useState, useEffect, useRef } from "react";
import type { ChangeEvent, CSSProperties } from "react";

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/6B4reCngPYfDkJwOtiM0/webhook-trigger/ci7fWMny4gcp3tusam8b";
const BOOKING_URL = "https://links.theleadventure.com/widget/booking/C2VL0S6llGMFg5aY5whk";
const REVIEW_URL = "https://www.google.com/search?hl=en-US&gl=us&q=The+Lead+Venture&ludocid=10425605606642097561&lsig=AB86z5V3k0eKEjVAVE0OtxYXehmR#lrd=0x9c83168797b653f:0x90af310fe0391d99,3";
const BENCHMARK_SHOW = 0.7;

const TRADE_DEFAULTS: Record<string, { job: number; close: number }> = {
  other: { job: 3500, close: 25 },
  roofing: { job: 9500, close: 22 },
  hvac: { job: 6500, close: 28 },
  lawn: { job: 2200, close: 35 },
  tree: { job: 1800, close: 30 },
  plumbing: { job: 850, close: 40 },
  electrical: { job: 1200, close: 30 },
  painting: { job: 4500, close: 28 },
  pest: { job: 450, close: 45 },
  pool: { job: 3800, close: 30 },
  cleaning: { job: 250, close: 40 },
  fencing: { job: 5200, close: 25 },
  concrete: { job: 6500, close: 22 },
  remodeling: { job: 18000, close: 18 },
  garage_door: { job: 900, close: 40 },
  gutter: { job: 1800, close: 35 },
  solar: { job: 22000, close: 12 },
  junk: { job: 350, close: 50 },
  moving: { job: 900, close: 35 },
  window_door: { job: 5500, close: 25 },
  flooring: { job: 7500, close: 22 },
};

const REVIEWS = [
  { quote: "Tye created us a great looking website and was very eager to help us learn how to use it. Highly recommend this business!", name: "Junk Boys" },
  { quote: "I've worked with Jonathan for the past couple of years, and he's one of the best sales guys I know. He's sharp, genuinely cares for his customers and doesn't just talk a good game, he backs it up.", name: "J. Dawley" },
  { quote: "Jonathan and Tye really know their stuff. From start to finish they were professional, knowledgeable, and easy to work with.", name: "Logan Vandergrift" },
  { quote: "Excellent service and excellent results. Jonathan would answer a call at 2am if you had a problem.", name: "Brandon Krause" },
  { quote: "They created an awesome looking website and helped us get more leads for our business and even put us on their directory of trusted contractors.", name: "Liam Silva" },
];

const GENERIC_TRUST_LINE = "Backed by real 5-star reviews from business owners just like you — see them above.";
const TESTIMONIALS: Record<string, string> = new Proxy(
  { junk: `“${REVIEWS[0].quote}” — ${REVIEWS[0].name}` },
  { get: (target, prop: string) => target[prop] ?? GENERIC_TRUST_LINE }
);

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const css = `
  #tlv-calc {
    --bg: #0A0E14; --surface: #121826; --surface-2: #1A2333; --line: #263041;
    --orange: #FF7A29; --orange-dim: #C95F1D; --white: #FFFFFF; --muted: #8C97A8; --green: #3ECF8E;
    background: var(--bg); color: var(--white); font-family: 'Inter', sans-serif;
    padding: 32px 16px 56px; display: flex; flex-direction: column; align-items: center;
    width: 100%; border-radius: 24px;
  }
  #tlv-calc * { box-sizing: border-box; }
  #tlv-calc .tlv-wrap { width: 100%; max-width: 760px; }
  #tlv-calc .tlv-hero { margin-top: 4px; margin-bottom: 8px; }
  #tlv-calc .tlv-eyebrow { color: var(--orange); font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
  #tlv-calc h1 { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: clamp(28px, 5vw, 40px); line-height: 1.08; margin: 0 0 12px; color: var(--white); }
  #tlv-calc h1 span { color: var(--orange); }
  #tlv-calc .tlv-sub { color: var(--muted); font-size: 15px; line-height: 1.6; max-width: 56ch; margin: 0 0 32px; }
  #tlv-calc .tlv-review-badge {
    display: inline-flex; align-items: center; gap: 6px; color: var(--orange); font-size: 13px; font-weight: 700;
    text-decoration: none; border: 1px solid var(--orange-dim); border-radius: 20px; padding: 7px 14px;
    margin: -14px 0 32px; background: rgba(255, 122, 41, 0.07);
  }
  #tlv-calc .tlv-review-badge:hover { background: rgba(255, 122, 41, 0.14); }
  #tlv-calc .tlv-review-strip {
    background: var(--surface); border: 1px solid var(--line); border-radius: 12px;
    padding: 16px 20px; margin-bottom: 32px; transition: opacity 0.3s ease;
  }
  #tlv-calc .tlv-review-stars { color: var(--orange); font-size: 13px; letter-spacing: 2px; margin-bottom: 8px; }
  #tlv-calc .tlv-review-quote { font-size: 14px; line-height: 1.6; color: var(--white); font-style: italic; margin-bottom: 8px; }
  #tlv-calc .tlv-review-name { font-size: 12px; color: var(--muted); font-weight: 700; }
  #tlv-calc .tlv-card { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 28px 24px; margin-bottom: 22px; }
  #tlv-calc .tlv-card h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted); margin: 0 0 20px; font-weight: 700; }
  #tlv-calc select {
    width: 100%; background: var(--surface-2); border: 1px solid var(--line); border-radius: 8px;
    color: var(--white); font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600;
    padding: 12px 14px; outline: none; margin-bottom: 22px;
  }
  #tlv-calc .tlv-field { margin-bottom: 22px; }
  #tlv-calc .tlv-field:last-child { margin-bottom: 0; }
  #tlv-calc .tlv-field-label { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
  #tlv-calc .tlv-field-label label { font-size: 14px; font-weight: 600; }
  #tlv-calc .tlv-field-value { font-family: monospace; font-weight: 700; color: var(--orange); font-size: 15px; }
  #tlv-calc .tlv-hint { color: var(--muted); font-size: 12px; margin-top: 6px; line-height: 1.5; }
  #tlv-calc input[type=range] {
    -webkit-appearance: none; width: 100%; height: 6px; border-radius: 4px;
    background: linear-gradient(90deg, var(--orange) 0%, var(--orange) var(--fill, 50%), var(--surface-2) var(--fill, 50%));
    outline: none;
  }
  #tlv-calc input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%;
    background: var(--white); border: 3px solid var(--orange); cursor: pointer; box-shadow: 0 0 0 4px rgba(255, 122, 41, 0.15);
  }
  #tlv-calc input[type=range]::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: var(--white); border: 3px solid var(--orange); cursor: pointer; }
  #tlv-calc input[type=number], #tlv-calc input[type=text], #tlv-calc input[type=email], #tlv-calc input[type=tel] {
    width: 100%; background: var(--surface-2); border: 1px solid var(--line); border-radius: 8px;
    color: var(--white); font-family: monospace; font-size: 16px; font-weight: 700;
    padding: 12px 14px; outline: none;
  }
  #tlv-calc input:focus { border-color: var(--orange); }
  #tlv-calc .tlv-meter { margin-top: 8px; }
  #tlv-calc .tlv-meter-row { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
  #tlv-calc .tlv-meter-label { width: 120px; flex-shrink: 0; font-size: 13px; color: var(--muted); font-weight: 600; }
  #tlv-calc .tlv-meter-track { flex: 1; height: 14px; background: var(--surface-2); border-radius: 8px; overflow: hidden; border: 1px solid var(--line); }
  #tlv-calc .tlv-meter-fill { height: 100%; border-radius: 8px; transition: width 0.6s ease; }
  #tlv-calc .tlv-meter-fill.current { background: linear-gradient(90deg, #5C6B7F, #8C97A8); }
  #tlv-calc .tlv-meter-fill.benchmark { background: linear-gradient(90deg, var(--orange-dim), var(--orange)); }
  #tlv-calc .tlv-meter-num { width: 56px; flex-shrink: 0; text-align: right; font-family: monospace; font-weight: 700; font-size: 14px; }
  #tlv-calc .tlv-result-card {
    background: linear-gradient(160deg, #1A1108, var(--surface)); border: 1px solid var(--orange-dim);
    border-radius: 14px; padding: 32px 24px; text-align: center; position: relative; overflow: hidden;
  }
  #tlv-calc .tlv-result-card::before {
    content: ""; position: absolute; top: -40%; right: -20%; width: 280px; height: 280px;
    background: radial-gradient(circle, rgba(255, 122, 41, 0.18), transparent 70%);
  }
  #tlv-calc .tlv-result-eyebrow { color: var(--muted); font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px; position: relative; }
  #tlv-calc .tlv-result-num { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: clamp(40px, 9vw, 64px); color: var(--orange); line-height: 1; margin-bottom: 6px; position: relative; }
  #tlv-calc .tlv-result-sub { color: var(--muted); font-size: 14px; margin-bottom: 4px; position: relative; }
  #tlv-calc .tlv-cost-waiting { color: var(--white); font-size: 13px; margin-top: 10px; position: relative; font-weight: 600; }
  #tlv-calc .tlv-testimonial {
    margin-top: 16px; padding: 12px 16px; background: rgba(255, 122, 41, 0.08); border-left: 3px solid var(--orange);
    border-radius: 6px; font-size: 13px; color: var(--muted); text-align: left; position: relative; font-style: italic;
  }
  #tlv-calc .tlv-result-annual { font-size: 15px; font-weight: 700; margin-top: 14px; position: relative; }
  #tlv-calc .tlv-result-annual span { color: var(--orange); }
  #tlv-calc .tlv-win-state .tlv-result-num { color: var(--green); }
  #tlv-calc .tlv-win-state { border-color: #245C42; }
  #tlv-calc .tlv-win-state::before { background: radial-gradient(circle, rgba(62, 207, 142, 0.18), transparent 70%); }
  #tlv-calc .tlv-breakdown { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--line); border-radius: 10px; overflow: hidden; margin-top: 24px; position: relative; }
  #tlv-calc .tlv-breakdown-col { background: var(--surface); padding: 16px; }
  #tlv-calc .tlv-breakdown-col h3 { margin: 0 0 12px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); }
  #tlv-calc .tlv-breakdown-col.hi h3 { color: var(--orange); }
  #tlv-calc .tlv-bd-line { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; border-bottom: 1px solid var(--line); }
  #tlv-calc .tlv-bd-line:last-child { border-bottom: none; font-weight: 700; }
  #tlv-calc .tlv-bd-line span:last-child { font-family: monospace; }
  #tlv-calc .tlv-cta {
    display: block; text-align: center; margin-top: 24px; background: var(--orange); color: #1A0F06; font-weight: 800; font-size: 15px;
    padding: 16px 20px; border-radius: 10px; text-decoration: none; transition: transform 0.15s ease, box-shadow 0.15s ease; position: relative;
  }
  #tlv-calc .tlv-quick-wins {
    background: var(--surface-2); border: 1px solid var(--line); border-radius: 12px;
    padding: 20px; margin-top: 24px; text-align: left; position: relative;
  }
  #tlv-calc .tlv-quick-wins h3 { font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 800; margin: 0 0 14px; color: var(--white); }
  #tlv-calc .tlv-quick-wins ul { list-style: none; margin: 0 0 14px; padding: 0; display: flex; flex-direction: column; gap: 12px; }
  #tlv-calc .tlv-quick-wins li { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; line-height: 1.5; color: var(--muted); }
  #tlv-calc .tlv-quick-wins li strong { color: var(--white); }
  #tlv-calc .tlv-check {
    flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%; background: rgba(255, 122, 41, 0.15);
    color: var(--orange); font-size: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin-top: 1px;
  }
  #tlv-calc .tlv-quick-wins-note { color: var(--muted); font-size: 12px; line-height: 1.6; margin: 0; padding-top: 12px; border-top: 1px solid var(--line); }
  #tlv-calc .tlv-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255, 122, 41, 0.28); }
  #tlv-calc .tlv-cta-note { text-align: center; color: var(--muted); font-size: 12px; margin-top: 10px; position: relative; }
  #tlv-calc .tlv-secondary-btn {
    display: block; width: 100%; text-align: center; margin-top: 12px; background: transparent; color: var(--white);
    border: 1px solid var(--line); font-weight: 700; font-size: 13px; padding: 12px 16px; border-radius: 10px; cursor: pointer; position: relative;
  }
  #tlv-calc .tlv-secondary-btn:hover { border-color: var(--orange); color: var(--orange); }
  #tlv-calc .tlv-footnote { color: var(--muted); font-size: 11px; text-align: center; margin-top: 28px; line-height: 1.6; }
  #tlv-calc .tlv-gate-wrap { position: relative; }
  #tlv-calc .tlv-blur { filter: blur(9px); pointer-events: none; user-select: none; }
  #tlv-calc .tlv-gate-overlay {
    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; flex-direction: column;
    background: rgba(10, 14, 20, 0.55); border-radius: 14px; padding: 24px; text-align: center; z-index: 5;
  }
  #tlv-calc .tlv-gate-overlay h3 { font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; margin: 0 0 8px; color: var(--white); }
  #tlv-calc .tlv-gate-overlay p { color: var(--white); font-size: 14px; margin: 0 0 18px; max-width: 40ch; }
  #tlv-calc .tlv-gate-form { width: 100%; max-width: 320px; display: flex; flex-direction: column; gap: 10px; }
  #tlv-calc .tlv-gate-submit {
    background: var(--orange); color: #1A0F06; font-weight: 800; font-size: 14px; border: none; border-radius: 8px;
    padding: 13px 16px; cursor: pointer; margin-top: 4px;
  }
  #tlv-calc .tlv-toast { position: relative; margin-top: 10px; font-size: 12px; color: var(--green); font-weight: 700; text-align: center; }
  #tlv-calc .tlv-share-row {
    position: relative; margin-top: 20px; padding-top: 18px; border-top: 1px solid var(--line);
    display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap;
  }
  #tlv-calc .tlv-share-label { font-size: 12px; color: var(--muted); font-weight: 700; letter-spacing: 0.5px; }
  #tlv-calc .tlv-share-icons { display: flex; gap: 8px; }
  #tlv-calc .tlv-share-btn {
    width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--line); background: var(--surface-2);
    color: var(--muted); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s ease;
  }
  #tlv-calc .tlv-share-btn:hover { border-color: var(--orange); color: var(--orange); }
  #tlv-calc .tlv-review-cta {
    position: relative; margin-top: 18px; padding: 16px; background: rgba(62, 207, 142, 0.06); border: 1px solid rgba(62, 207, 142, 0.25);
    border-radius: 10px; text-align: center;
  }
  #tlv-calc .tlv-review-cta p { margin: 0 0 10px; font-size: 13px; color: var(--muted); }
  #tlv-calc .tlv-review-cta-btn {
    display: inline-block; color: var(--green); font-weight: 700; font-size: 13px; text-decoration: none;
    border: 1px solid rgba(62, 207, 142, 0.4); border-radius: 8px; padding: 9px 18px;
  }
  #tlv-calc .tlv-review-cta-btn:hover { background: rgba(62, 207, 142, 0.1); }
`;

export default function RevenueLeakFinder() {
  const [trade, setTrade] = useState("other");
  const [appts, setAppts] = useState(40);
  const [show, setShow] = useState(45);
  const [close, setClose] = useState(25);
  const [job, setJob] = useState(3500);

  const [gated, setGated] = useState(true);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewOpacity, setReviewOpacity] = useState(1);

  const ctaClicked = useRef(false);
  const dropoffTimer = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setReviewOpacity(0);
      setTimeout(() => {
        setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
        setReviewOpacity(1);
      }, 300);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleTradeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setTrade(val);
    const def = TRADE_DEFAULTS[val] || TRADE_DEFAULTS.other;
    setJob(def.job);
    setClose(def.close);
  };

  const showDecimal = show / 100;
  const closeDecimal = close / 100;

  const shownCur = appts * showDecimal;
  const closedCur = shownCur * closeDecimal;
  const revCur = closedCur * job;

  const shownBm = appts * BENCHMARK_SHOW;
  const closedBm = shownBm * closeDecimal;
  const revBm = closedBm * job;

  const leakMonthly = revBm - revCur;
  const isWinState = showDecimal >= BENCHMARK_SHOW;

  const sendWebhook = (payload: Record<string, unknown>) => {
    try {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } catch {
      /* fail silently */
    }
  };

  const buildPayload = (eventName: string, lead?: { name: string; phone: string; email: string }) => ({
    event: eventName,
    name: lead?.name || leadName || "",
    phone: lead?.phone || leadPhone || "",
    email: lead?.email || leadEmail || "",
    trade,
    appointments_per_month: appts,
    show_rate_pct: show,
    close_rate_pct: close,
    avg_job_value: job,
    monthly_revenue_current: Math.round(revCur),
    monthly_revenue_at_70pct: Math.round(revBm),
    monthly_leak: Math.round(leakMonthly),
    annual_leak: Math.round(leakMonthly * 12),
  });

  const startDropoffTimer = (leadInfo: { name: string; phone: string; email: string }) => {
    if (dropoffTimer.current) clearTimeout(dropoffTimer.current);
    dropoffTimer.current = window.setTimeout(() => {
      if (!ctaClicked.current) sendWebhook(buildPayload("viewed_no_click", leadInfo));
    }, 45000);
  };

  const handleGateSubmit = () => {
    if (!leadName || !leadPhone || !leadEmail) return;
    setGated(false);
    const leadInfo = { name: leadName, phone: leadPhone, email: leadEmail };
    sendWebhook(buildPayload("calculator_unlocked", leadInfo));
    startDropoffTimer(leadInfo);
  };

  const handleResend = () => {
    sendWebhook(buildPayload("requested_results"));
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
  };

  const handleCopyLink = () => {
    const text =
      (isWinState
        ? "I just checked my show rate against industry benchmarks with this free tool — check yours:"
        : `I just found out my business could be leaving ${fmt(leakMonthly)}/month on the table from no-shows alone. Check your own number:`) +
      " " +
      window.location.href;
    navigator.clipboard?.writeText(text).catch(() => {});
    setShareToast(true);
    setTimeout(() => setShareToast(false), 3000);
  };

  let ctaText = "See How The Lead Venture Fixes This";
  if (isWinState) {
    ctaText = "Keep This Running Smoothly With The Lead Venture";
  } else if (leakMonthly >= 5000) {
    ctaText = `This Is Costing You ${fmt(leakMonthly)}/Month — Let's Fix It`;
  } else if (leakMonthly >= 1500) {
    ctaText = "See How The Lead Venture Fixes This";
  } else {
    ctaText = "See How To Tighten This Up";
  }

  return (
    <div id="tlv-calc" className="w-full">
      <style>{css}</style>
      <div className="tlv-wrap">
        <div className="tlv-hero">
          <div className="tlv-eyebrow">$50K Leak Finder</div>
          <h1>
            Same leads. Same close rate.
            <br />
            Just a better <span>show rate.</span>
          </h1>
          <p className="tlv-sub">
            Most local service businesses lose more money to no-shows than to bad marketing. Plug in your numbers and see what's sitting on the table —
            before you spend another dollar on ads.
          </p>
          <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer" className="tlv-review-badge">
            ★ See Our Reviews
          </a>

          <div className="tlv-review-strip" style={{ opacity: reviewOpacity }}>
            <div className="tlv-review-stars">★★★★★</div>
            <div className="tlv-review-quote">"{REVIEWS[reviewIndex].quote}"</div>
            <div className="tlv-review-name">— {REVIEWS[reviewIndex].name}</div>
          </div>
        </div>

        <div className="tlv-card">
          <h2>Your Business</h2>
          <select value={trade} onChange={handleTradeChange}>
            <option value="other">Select your trade…</option>
            <option value="roofing">Roofing</option>
            <option value="hvac">HVAC</option>
            <option value="lawn">Lawn Care / Landscaping</option>
            <option value="tree">Tree Service</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="painting">Painting</option>
            <option value="pest">Pest Control</option>
            <option value="pool">Pool Service</option>
            <option value="cleaning">House Cleaning</option>
            <option value="fencing">Fencing</option>
            <option value="concrete">Concrete / Masonry</option>
            <option value="remodeling">Remodeling / General Contractor</option>
            <option value="garage_door">Garage Door</option>
            <option value="gutter">Gutters</option>
            <option value="solar">Solar</option>
            <option value="junk">Junk Removal / Hauling</option>
            <option value="moving">Moving</option>
            <option value="window_door">Window & Door</option>
            <option value="flooring">Flooring</option>
          </select>

          <div className="tlv-field">
            <div className="tlv-field-label">
              <label>Sales appointments booked per month</label>
              <span className="tlv-field-value">{appts}</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              value={appts}
              step="1"
              onChange={(e) => setAppts(+e.target.value)}
              style={{ "--fill": `${((appts - 5) / (200 - 5)) * 100}%` } as CSSProperties}
            />
            <div className="tlv-hint">Appointments your marketing generates each month — before any no-shows.</div>
          </div>

          <div className="tlv-field">
            <div className="tlv-field-label">
              <label>Current show rate</label>
              <span className="tlv-field-value">{show}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              value={show}
              step="1"
              onChange={(e) => setShow(+e.target.value)}
              style={{ "--fill": `${((show - 10) / (95 - 10)) * 100}%` } as CSSProperties}
            />
            <div className="tlv-hint">Not tracking this? Most un-optimized local businesses sit between 30–50%.</div>
          </div>

          <div className="tlv-field">
            <div className="tlv-field-label">
              <label>Close rate on appointments you actually run</label>
              <span className="tlv-field-value">{close}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="80"
              value={close}
              step="1"
              onChange={(e) => setClose(+e.target.value)}
              style={{ "--fill": `${((close - 5) / (80 - 5)) * 100}%` } as CSSProperties}
            />
          </div>

          <div className="tlv-field">
            <div className="tlv-field-label">
              <label>Average job value</label>
              <span className="tlv-field-value">{fmt(job)}</span>
            </div>
            <input type="number" value={job} min="0" step="50" onChange={(e) => setJob(+e.target.value)} />
          </div>
        </div>

        <div className="tlv-card">
          <h2>Show Rate: Where You Are vs. What's Possible</h2>
          <div className="tlv-meter">
            <div className="tlv-meter-row">
              <div className="tlv-meter-label">You today</div>
              <div className="tlv-meter-track">
                <div className="tlv-meter-fill current" style={{ width: `${show}%` }} />
              </div>
              <div className="tlv-meter-num">{show}%</div>
            </div>
            <div className="tlv-meter-row">
              <div className="tlv-meter-label">Achievable*</div>
              <div className="tlv-meter-track">
                <div className="tlv-meter-fill benchmark" style={{ width: "70%" }} />
              </div>
              <div className="tlv-meter-num">70%</div>
            </div>
          </div>
          <div className="tlv-hint">*70%+ show rates are typical once automated reminders, confirmations, and a tightened booking window are in place.</div>
        </div>

        <div className="tlv-card tlv-gate-wrap">
          <div className={gated ? "tlv-blur" : ""}>
            <div className={`tlv-result-card ${isWinState ? "tlv-win-state" : ""}`}>
              <div className="tlv-result-eyebrow">{isWinState ? "Current monthly revenue" : "Monthly revenue left on the table"}</div>
              <div className="tlv-result-num">{isWinState ? "You're already there" : fmt(leakMonthly)}</div>
              <div className="tlv-result-sub">{isWinState ? "Your show rate is at or above the 70% benchmark. Nice work." : "from no-shows alone, nothing else changed"}</div>
              {!isWinState && <div className="tlv-cost-waiting">Every month you wait, that's another {fmt(leakMonthly)} gone.</div>}
              <div className="tlv-testimonial">{TESTIMONIALS[trade]}</div>
              <div className="tlv-result-annual">
                That's <span>{fmt(isWinState ? revCur : leakMonthly * 12)}</span> a year — same ad spend, same leads.
              </div>

              <div className="tlv-breakdown">
                <div className="tlv-breakdown-col">
                  <h3>At your current show rate</h3>
                  <div className="tlv-bd-line">
                    <span>Appointments shown</span>
                    <span>{shownCur.toFixed(1)}</span>
                  </div>
                  <div className="tlv-bd-line">
                    <span>Deals closed</span>
                    <span>{closedCur.toFixed(1)}</span>
                  </div>
                  <div className="tlv-bd-line">
                    <span>Monthly revenue</span>
                    <span>{fmt(revCur)}</span>
                  </div>
                </div>
                <div className="tlv-breakdown-col hi">
                  <h3>At a 70% show rate</h3>
                  <div className="tlv-bd-line">
                    <span>Appointments shown</span>
                    <span>{shownBm.toFixed(1)}</span>
                  </div>
                  <div className="tlv-bd-line">
                    <span>Deals closed</span>
                    <span>{closedBm.toFixed(1)}</span>
                  </div>
                  <div className="tlv-bd-line">
                    <span>Monthly revenue</span>
                    <span>{fmt(revBm)}</span>
                  </div>
                </div>
              </div>

              <div className="tlv-quick-wins">
                <h3>8 Ways to Get Your Show Rate to 70%+</h3>
                <ul>
                  <li>
                    <span className="tlv-check">✓</span>
                    <div>
                      <strong>Automated reminder sequence — not just one email.</strong> Confirmation the moment they book, a reminder 48 hours out, the day before, and 2 hours before. Hit both email and SMS.
                    </div>
                  </li>
                  <li>
                    <span className="tlv-check">✓</span>
                    <div>
                      <strong>Ask for an explicit "yes."</strong> "Reply YES to confirm" beats a passive reminder — it creates a small commitment that predicts follow-through.
                    </div>
                  </li>
                  <li>
                    <span className="tlv-check">✓</span>
                    <div>
                      <strong>Book them close, not far out.</strong> Don't let people book more than 3–4 days ahead. The further out, the more time to cool off.
                    </div>
                  </li>
                  <li>
                    <span className="tlv-check">✓</span>
                    <div>
                      <strong>The 24-hour video intro.</strong> Have the salesperson record a quick, personal video the day before. Puts a real face on the appointment instead of a faceless calendar invite.
                    </div>
                  </li>
                  <li>
                    <span className="tlv-check">✓</span>
                    <div>
                      <strong>Qualify at the point of booking.</strong> Ask directly: "Aside from an emergency, are you going to show up?" Filters out the ones who were never serious.
                    </div>
                  </li>
                  <li>
                    <span className="tlv-check">✓</span>
                    <div>
                      <strong>Set expectations up front.</strong> Tell them exactly what the call covers, how long it takes, and what they'll walk away with.
                    </div>
                  </li>
                  <li>
                    <span className="tlv-check">✓</span>
                    <div>
                      <strong>Let the brand do trust-building before the call.</strong> A polished site, visible reviews, and real case studies mean they half-trust you before a human says a word.
                    </div>
                  </li>
                  <li>
                    <span className="tlv-check">✓</span>
                    <div>
                      <strong>Keep reinforcing the "why now."</strong> Reminders shouldn't just be logistics — weave in a stat, testimonial, or result so they keep re-selling themselves on why this matters.
                    </div>
                  </li>
                </ul>
                <p className="tlv-quick-wins-note">
                  You can build all 8 of these yourself — reminders, video workflow, booking rules, and all. Or skip the setup: every one of these is already built into The Lead Venture's system, live from day one.
                </p>
              </div>

              <a
                href={BOOKING_URL}
                className="tlv-cta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  ctaClicked.current = true;
                }}
              >
                {ctaText}
              </a>
              <div className="tlv-cta-note">Automated reminders, confirmations, and follow-up — built into every Lead Venture build.</div>
              <button className="tlv-secondary-btn" onClick={handleResend}>
                Text/Email Me These Results
              </button>
              {toastVisible && <div className="tlv-toast">Sent — check your phone or inbox shortly.</div>}

              <div className="tlv-share-row">
                <span className="tlv-share-label">Share This Tool</span>
                <div className="tlv-share-icons">
                  <button
                    className="tlv-share-btn"
                    title="Share on Facebook"
                    aria-label="Share on Facebook"
                    onClick={() => window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href), "_blank", "noopener,width=600,height=500")}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13.5 9H15V6.5h-1.9c-1.9 0-3.1 1.1-3.1 3.2V11H8v2.5h2v7h2.7v-7h2.2l.4-2.5h-2.6V9.9c0-.6.2-.9.8-.9z" /></svg>
                  </button>
                  <button
                    className="tlv-share-btn"
                    title="Share on X"
                    aria-label="Share on X"
                    onClick={() =>
                      window.open(
                        "https://twitter.com/intent/tweet?text=" +
                          encodeURIComponent(
                            isWinState
                              ? "I just checked my show rate against industry benchmarks with this free tool — check yours:"
                              : "I just found out my business could be leaving " + fmt(leakMonthly) + "/month on the table from no-shows alone. Check your own number:"
                          ) +
                          "&url=" +
                          encodeURIComponent(window.location.href),
                        "_blank",
                        "noopener,width=600,height=500"
                      )
                    }
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.6L18.9 2zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20z" /></svg>
                  </button>
                  <button
                    className="tlv-share-btn"
                    title="Share on LinkedIn"
                    aria-label="Share on LinkedIn"
                    onClick={() => window.open("https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(window.location.href), "_blank", "noopener,width=600,height=500")}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-1 1.9-2 3.8-2 4.1 0 4.8 2.7 4.8 6.2V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9z" /></svg>
                  </button>
                  <button className="tlv-share-btn" title="Copy Link" aria-label="Copy link" onClick={handleCopyLink}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11 17H7a5 5 0 010-10h4v2H7a3 3 0 000 6h4v2zm2-10h4a5 5 0 010 10h-4v-2h4a3 3 0 000-6h-4V7zm-5 4h8v2H8v-2z" /></svg>
                  </button>
                </div>
                {shareToast && <div className="tlv-toast">Link copied.</div>}
              </div>

              <div className="tlv-review-cta">
                <p>Already working with The Lead Venture? We'd love a quick review.</p>
                <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer" className="tlv-review-cta-btn">
                  Leave Us a Review
                </a>
              </div>
            </div>
          </div>

          {gated && (
            <div className="tlv-gate-overlay">
              <h3>See Your Number</h3>
              <p>Enter your info to unlock your exact leak amount and the full breakdown.</p>
              <div className="tlv-gate-form">
                <input type="text" placeholder="Name" required value={leadName} onChange={(e) => setLeadName(e.target.value)} />
                <input type="tel" placeholder="Phone" required value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} />
                <input type="email" placeholder="Email" required value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} />
                <button className="tlv-gate-submit" onClick={handleGateSubmit}>Show My Leak Number</button>
              </div>
              <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--white)", fontSize: "12px", marginTop: "14px", textDecoration: "underline" }}>
                Not sure yet? See what other business owners say first →
              </a>
            </div>
          )}
        </div>

        <div className="tlv-footnote">Estimates only, based on your inputs and typical industry benchmarks. Actual results vary by market, offer, and follow-up execution.</div>
      </div>
    </div>
  );
}

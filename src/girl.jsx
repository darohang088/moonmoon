import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, Star as StarIcon, Moon, Sparkles } from "lucide-react";

const REASONS = [
  "[Reason one — be specific, not generic.]",
  "[Reason two — a habit or quirk you adore.]",
  "[Reason three — how she makes you feel.]",
  "[Reason four — something about your future together.]",
  "[Reason five — anything you want, this is your sky.]",
];

const LETTER_PARAGRAPHS = [
  "Happy Girlfriend's Day, my love.",
  "I'm not very good at saying sweet words, but I hope you know how much you mean to me.",
  "Thank you for coming into my life and for sharing your happiness, your worries, and your journey with me. I know sometimes you feel tired, you think too much, or you forget how special you are. But I hope you can see yourself the way I see you — someone who is kind, caring, and beautiful in your own way.",
  "I don't promise that I can make everything perfect, but I promise I will always try my best to be there for you, listen to you, and support you.",
  "Thank you for being my girlfriend, my favorite person, and someone I'm lucky to have.",
  "Please keep smiling and taking care of yourself. You deserve love too, not only from others, but from yourself.",
  "I love you, Moon Moon. 🤍",
];

const REMINDER_PARAGRAPHS = [
  "អូនធ្លាប់តស៊ូយ៉ាងខ្លាំង ហើយត្រូវការតែមួយឆ្នាំប៉ុណ្ណោះ ដើម្បីក្លាយជាមនុស្សដែលអូននៅថ្ងៃនេះ។",
  "គ្មាននរណាម្នាក់ឃើញរាល់យប់ដែលអូនមិនបានដេកស្រួល ឬពេលវេលាដែលអូនតស៊ូតែម្នាក់ឯងនោះឡើយ។ ប៉ុន្តែអូនធ្វើវាបានមែន។",
  "ហើយពេលឃើញអ្នកដទៃជួបបញ្ហា ឬកំពុងតស៊ូ អូនតែងតែចង់ជួយ ចង់ឲ្យពួកគេបានល្អ ដូចអូនដែរ។ អូនផ្តល់កម្លាំងចិត្តឲ្យអ្នកដទៃគ្រប់ពេលវេលា។",
  "ប៉ុន្តែហេតុអ្វីបានជាអូនមិនដែលមើលឃើញអ្វីដែលអូនបានធ្វើសម្រាប់ខ្លួនឯងទេ? អូនចេះថែទាំចិត្តអ្នកដទៃ តែអូនភ្លេចថែទាំចិត្តខ្លួនឯង។ អូនចង់ឲ្យគេមានមោទនភាព តែអូនផ្ទាល់មិនដែលមោទនភាពនឹងខ្លួនឯងសោះ។",
  "អូនតែងតែគិតថាខ្លួនឯងនៅមិនទាន់គ្រប់គ្រាន់ ថ្វីត្បិតតែអូនបានធ្វើអ្វីៗច្រើនណាស់រួចមកហើយ។ អូនស្រោចទឹកឲ្យផ្កាគ្រប់ដើមជុំវិញខ្លួន ប៉ុន្តែភ្លេចស្រោចទឹកឲ្យផ្កាដើមរបស់អូនផ្ទាល់។",
  "ថ្ងៃនេះ ខ្ញុំចង់ឲ្យអូនចាំថា៖ អូនមិនចាំបាច់ល្អឥតខ្ចោះ ដើម្បីមានតម្លៃនោះទេ។ គ្រាន់តែជាអូននេះឯង ក៏គ្រប់គ្រាន់ខ្លាំងណាស់ហើយ។",
  "សូមអូនអោយចិត្តល្អចំពោះខ្លួនឯង ដូចអូនធ្លាប់ធ្វើចំពោះអ្នកដទៃ។ អូនស័ក្តិសមនឹងសេចក្តីស្រឡាញ់ និងមោទនភាពនោះដែរ ❤️",
];

const CONSTELLATION_POINTS = [
  { x: 40, y: 150 },
  { x: 110, y: 60 },
  { x: 195, y: 48 },
  { x: 262, y: 138 },
  { x: 158, y: 224 },
];

function useRevealOnScroll() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.unobserve(e.target); } }),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function useCountdown() {
  const target = useMemo(() => {
    const now = new Date();
    let t = new Date(now.getFullYear(), 7, 1, 0, 0, 0);
    if (t <= now) t = new Date(now.getFullYear() + 1, 7, 1, 0, 0, 0);
    return t;
  }, []);
  const WINDOW_MS = 14 * 24 * 60 * 60 * 1000; // symbolic 14-day "moon grows fuller" window
  const [state, setState] = useState({ d: "00", h: "00", m: "00", s: "00", percent: 0 });
  useEffect(() => {
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const diff = Math.max(0, target - new Date());
      const percent = Math.min(1, Math.max(0, 1 - diff / WINDOW_MS));
      setState({
        d: pad(Math.floor(diff / 86400000)),
        h: pad(Math.floor((diff % 86400000) / 3600000)),
        m: pad(Math.floor((diff % 3600000) / 60000)),
        s: pad(Math.floor((diff % 60000) / 1000)),
        percent,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return state;
}

function useParallaxY(factor) {
  const ref = useRef(null);
  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (ref.current) ref.current.style.transform = `translateY(${window.scrollY * factor}px)`;
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [factor]);
  return ref;
}

function Starfield({ count = 70 }) {
  const makeLayer = (n, seedOffset) =>
    Array.from({ length: n }).map((_, i) => ({
      id: i + seedOffset,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 6,
      duration: 2.5 + Math.random() * 3.5,
    }));
  const far = useMemo(() => makeLayer(count, 0), [count]);
  const near = useMemo(() => makeLayer(Math.round(count * 0.4), 1000), [count]);
  const farRef = useParallaxY(0.05);
  const nearRef = useParallaxY(0.14);
  return (
    <div className="gd-starfield" aria-hidden="true">
      <div ref={farRef} className="gd-star-layer">
        {far.map((s) => (
          <span key={s.id} className="gd-star-dot" style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }} />
        ))}
      </div>
      <div ref={nearRef} className="gd-star-layer">
        {near.map((s) => (
          <span key={s.id} className="gd-star-dot gd-star-near" style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size * 1.6, height: s.size * 1.6, animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }} />
        ))}
      </div>
    </div>
  );
}

function ShootingStar({ trigger }) {
  const [key, setKey] = useState(0);
  useEffect(() => { if (trigger) setKey((k) => k + 1); }, [trigger]);
  if (!trigger) return null;
  return <span key={key} className="gd-shooting-star" aria-hidden="true" />;
}

function MoonPhase({ percent }) {
  const R = 46;
  const cx = 60, cy = 60;
  const shadowOffset = percent * (2 * R + 6);
  return (
    <div className="gd-moon-wrap">
      <svg viewBox="0 0 120 120" width="120" height="120" className="gd-moon-svg">
        <defs>
          <radialGradient id="moonGlow" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#fff8e6" />
            <stop offset="55%" stopColor="#f3d98a" />
            <stop offset="100%" stopColor="#d9b25c" />
          </radialGradient>
          <filter id="moonBlur"><feGaussianBlur stdDeviation="6" /></filter>
        </defs>
        <circle cx={cx} cy={cy} r={R + 14} fill="url(#moonGlow)" opacity="0.18" filter="url(#moonBlur)" />
        <circle cx={cx} cy={cy} r={R} fill="url(#moonGlow)" />
        <circle cx={cx + shadowOffset} cy={cy} r={R + 0.5} fill="#101733" />
      </svg>
    </div>
  );
}

function Reveal({ as: Tag = "div", className = "", delay = 0, children }) {
  const [ref, inView] = useRevealOnScroll();
  return (
    <Tag ref={ref} className={`gd-reveal ${inView ? "gd-in" : ""} ${className}`} style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}>
      {children}
    </Tag>
  );
}

function FlowerGrowth({ variant = "sun" }) {
  const [ref, inView] = useRevealOnScroll();
  const isStorm = variant === "storm";
  const petalColor = isStorm ? "#ff9db3" : "#f3d98a";
  const rainDrops = useMemo(
    () => Array.from({ length: 10 }).map((_, i) => ({ id: i, x: 10 + Math.random() * 100, delay: Math.random() * 2, dur: 1 + Math.random() * 0.8 })),
    []
  );
  return (
    <div ref={ref} className={`gd-flower-wrap ${inView ? "gd-in" : ""}`}>
      <svg viewBox="0 0 120 190" className="gd-flower-svg">
        {isStorm ? (
          <g className="gd-weather" opacity="0.55">
            {rainDrops.map((d) => (
              <line key={d.id} x1={d.x} y1="-10" x2={d.x - 6} y2="14" stroke="#8fa8e8" strokeWidth="1.4"
                className="gd-rain-drop" style={{ animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s` }} />
            ))}
          </g>
        ) : (
          <g className="gd-weather" opacity="0.7">
            <circle cx="94" cy="22" r="14" fill="#f3d98a" opacity="0.5" className="gd-sun-glow" />
            {[0, 45, 90, 135, 180, 225].map((a) => (
              <line key={a} x1="94" y1="22" x2={94 + Math.cos((a * Math.PI) / 180) * 26} y2={22 + Math.sin((a * Math.PI) / 180) * 26}
                stroke="#f3d98a" strokeWidth="1.3" className="gd-sun-ray" />
            ))}
          </g>
        )}
        <path d="M60,178 C60,178 58,120 60,90" fill="none" stroke="#7fae6b" strokeWidth="3" strokeLinecap="round" className={`gd-stem ${inView ? "gd-grown" : ""}`} />
        <path d="M60,140 C48,136 40,124 42,116 C54,116 60,128 60,140 Z" fill="#6fa25c" className={`gd-leaf gd-leaf-l ${inView ? "gd-shown" : ""}`} />
        <path d="M60,120 C72,116 80,104 78,96 C66,96 60,108 60,120 Z" fill="#7fae6b" className={`gd-leaf gd-leaf-r ${inView ? "gd-shown" : ""}`} />
        <g className={`gd-bloom ${inView ? "gd-bloomed" : ""}`} style={{ transformOrigin: "60px 82px" }}>
          {[0, 60, 120, 180, 240, 300].map((a, i) => (
            <ellipse key={a} cx={60 + Math.cos((a * Math.PI) / 180) * 14} cy={82 + Math.sin((a * Math.PI) / 180) * 14}
              rx="10" ry="7" fill={petalColor} opacity="0.92"
              transform={`rotate(${a} ${60 + Math.cos((a * Math.PI) / 180) * 14} ${82 + Math.sin((a * Math.PI) / 180) * 14})`}
              className="gd-petal" style={{ transitionDelay: `${0.5 + i * 0.08}s` }} />
          ))}
          <circle cx="60" cy="82" r="7" fill="#b8863f" />
        </g>
      </svg>
      <div className="gd-flower-cap">{isStorm ? "the one she forgets to water" : "every flower she waters for others"}</div>
    </div>
  );
}

function Constellation() {
  const [active, setActive] = useState(null);
  const [ref, inView] = useRevealOnScroll();
  const pathD = CONSTELLATION_POINTS.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
  return (
    <div ref={ref} className="gd-constellation-wrap">
      <svg viewBox="0 0 320 260" className="gd-constellation-svg">
        <path d={pathD} className={`gd-const-line ${inView ? "gd-drawn" : ""}`} />
        {CONSTELLATION_POINTS.map((p, i) => (
          <g key={i} className="gd-const-star" onClick={() => setActive(i)} style={{ cursor: "pointer" }}>
            <circle cx={p.x} cy={p.y} r={active === i ? 12 : 8} className={`gd-const-glow ${active === i ? "gd-const-active" : ""}`} />
            <circle cx={p.x} cy={p.y} r="4" fill="#fff8e6" />
            <text x={p.x} y={p.y - 16} textAnchor="middle" className="gd-const-num">{i + 1}</text>
          </g>
        ))}
      </svg>
      <div className="gd-const-caption">
        {active === null ? (
          <span className="gd-const-hint">✦ tap a star to reveal a reason</span>
        ) : (
          <span className="gd-const-reason"><strong>{active + 1}.</strong> {REASONS[active]}</span>
        )}
      </div>
    </div>
  );
}

export default function GirlfriendDayPage() {
  const [open, setOpen] = useState(false);
  const [shoot, setShoot] = useState(false);
  const [ripple, setRipple] = useState(0);
  const cd = useCountdown();

  const makeWish = () => {
    setRipple((r) => r + 1);
    if (open) return;
    setShoot(true);
    setTimeout(() => setOpen(true), 650);
  };

  return (
    <div className="gd-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500;1,600&family=Sacramento&family=Outfit:wght@300;400;500;600&family=Noto+Serif+Khmer:wght@300;400;500;600&family=Moul&display=swap');

        .gd-root{
          --navy:#0d1330; --navy-deep:#080b1e; --gold:#e8c874; --gold-soft:#f3d98a;
          --paper:#fff8ec; --rose:#ff9db3; --lav:#cdd4f0;
          position:relative; color:var(--lav); font-family:'Outfit',sans-serif; font-weight:300; overflow:hidden;
        }
        .gd-root::before{
          content:""; position:fixed; inset:0; z-index:-1;
          background:radial-gradient(ellipse at 50% -10%, #1a2456 0%, var(--navy) 45%, var(--navy-deep) 100%);
          animation:gdNebulaBreathe 14s ease-in-out infinite;
        }
        @keyframes gdNebulaBreathe{
          0%,100%{background:radial-gradient(ellipse at 50% -10%, #1a2456 0%, var(--navy) 45%, var(--navy-deep) 100%);}
          50%{background:radial-gradient(ellipse at 50% -10%, #241a4a 0%, var(--navy) 45%, var(--navy-deep) 100%);}
        }
        .gd-root *{box-sizing:border-box;}
        .gd-root ::selection{background:var(--gold); color:var(--navy-deep);}

        .gd-starfield{position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden;}
        .gd-star-layer{position:absolute; inset:-5% 0 0 0; will-change:transform;}
        .gd-star-dot{position:absolute; border-radius:50%; background:#fff; animation-name:gdTwinkle; animation-iteration-count:infinite; animation-timing-function:ease-in-out;}
        .gd-star-near{box-shadow:0 0 4px rgba(255,255,255,0.6);}
        @keyframes gdTwinkle{0%,100%{opacity:0.15;}50%{opacity:1;}}

        .gd-shooting-star{
          position:fixed; top:18%; left:-10%; width:120px; height:2px;
          background:linear-gradient(90deg, transparent, var(--gold-soft), #fff);
          z-index:5; border-radius:2px; transform:rotate(18deg);
          animation:gdShoot 0.75s ease-out forwards;
        }
        @keyframes gdShoot{
          0%{transform:translate(0,0) rotate(18deg); opacity:0;}
          10%{opacity:1;}
          100%{transform:translate(130vw,55vh) rotate(18deg); opacity:0;}
        }

        .gd-eyebrow{letter-spacing:0.35em; text-transform:uppercase; font-size:0.68rem; color:var(--gold);}

        .gd-hero{min-height:100svh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:2rem 1.5rem; position:relative; z-index:1;}
        .gd-fade{opacity:0; animation:gdFadeUp 1s ease forwards;}
        @keyframes gdFadeUp{from{opacity:0; transform:translateY(16px);} to{opacity:1; transform:translateY(0);}}

        .gd-h1{font-family:'Playfair Display',serif; font-style:italic; font-weight:500; font-size:clamp(2rem,5.6vw,3.3rem); line-height:1.2; margin:0.7rem 0 0.1rem; color:#fdf6e3;}
        .gd-script{font-family:'Sacramento',cursive; color:var(--gold-soft); font-size:1.5em; display:block; margin-top:0.1em;}
        .gd-sub{max-width:340px; font-size:0.95rem; color:var(--lav); opacity:0.75; margin:0.9rem auto 2.4rem;}

        .gd-moon-wrap{margin-bottom:0.6rem; filter:drop-shadow(0 0 22px rgba(232,200,116,0.35)); animation:gdMoonFloat 6s ease-in-out infinite;}
        @keyframes gdMoonFloat{0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);}}
        .gd-moon-caption{font-size:0.66rem; letter-spacing:0.1em; color:var(--gold); opacity:0.7; margin-bottom:1.8rem; max-width:260px;}

        .gd-countdown{display:flex; gap:1.3rem; margin-bottom:2.6rem; justify-content:center;}
        .gd-cd-num{font-family:'Playfair Display',serif; font-style:italic; font-size:1.7rem; color:#fdf6e3; min-width:2ch;}
        .gd-cd-label{font-size:0.58rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--gold); opacity:0.7; margin-top:0.2rem;}

        .gd-wish-btn{
          position:relative; width:88px; height:88px; border-radius:50%; border:1px solid rgba(232,200,116,0.4);
          background:radial-gradient(circle at 35% 30%, rgba(232,200,116,0.25), rgba(13,19,48,0.4));
          display:flex; align-items:center; justify-content:center; cursor:pointer;
          transition:transform .4s ease, box-shadow .4s ease; -webkit-tap-highlight-color:transparent;
        }
        .gd-wish-btn:hover{transform:scale(1.06); box-shadow:0 0 40px rgba(232,200,116,0.35);}
        .gd-wish-btn:active{transform:scale(0.96);}
        .gd-ripple{position:absolute; inset:0; border-radius:50%; border:1.5px solid var(--gold-soft); animation:gdRipple 0.9s ease-out forwards; pointer-events:none;}
        @keyframes gdRipple{0%{transform:scale(1); opacity:0.8;} 100%{transform:scale(2.1); opacity:0;}}
        .gd-wish-hint{margin-top:1rem; font-size:0.66rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); opacity:0.75; transition:opacity .4s ease;}
        .gd-wish-hint.gd-hide{opacity:0;}

        .gd-reveal{opacity:0; transform:translateY(26px); transition:opacity .9s ease, transform .9s ease;}
        .gd-reveal.gd-in{opacity:1; transform:translateY(0);}

        .gd-section{position:relative; z-index:1; padding:5rem 1.5rem; max-width:640px; margin:0 auto;}

        .gd-letter-outer{display:grid; grid-template-rows:0fr; transition:grid-template-rows 0.9s cubic-bezier(.2,.7,.2,1);}
        .gd-letter-outer.gd-shown{grid-template-rows:1fr;}
        .gd-letter{
          min-height:0; overflow:hidden; border-radius:6px;
          background:linear-gradient(160deg, rgba(180,205,255,0.1), rgba(120,150,220,0.04));
          border:1px solid rgba(190,215,255,0.25);
          backdrop-filter:blur(6px);
          box-shadow:0 30px 70px -25px rgba(0,0,10,0.7), inset 0 0 50px rgba(180,205,255,0.05), 0 0 40px rgba(159,201,255,0.08);
          opacity:0; transform:scale(0.96) translateY(10px);
          transition:opacity .8s ease .1s, transform .8s cubic-bezier(.2,.7,.2,1) .1s;
        }
        .gd-letter-inner{padding:clamp(2rem,6vw,3.2rem); position:relative;}
        .gd-letter-inner::before{content:""; position:absolute; top:0; left:2rem; right:2rem; height:1px; background:linear-gradient(90deg,transparent,#9fc9ff,transparent); opacity:0.6;}
        .gd-letter-outer.gd-shown .gd-letter{opacity:1; transform:scale(1) translateY(0);}
        .gd-letter-to{font-family:'Playfair Display',serif; font-style:italic; font-size:1.3rem; margin-bottom:1.3rem; color:#eef3ff;}
        .gd-letter-to .gd-script{color:#9fc9ff; font-size:1.3em;}
        .gd-letter p{font-size:1rem; line-height:1.9; margin-bottom:1.05rem; color:#d7e2f7; opacity:0; transform:translateY(10px); transition:opacity .7s ease, transform .7s ease;}
        .gd-letter-outer.gd-shown p{opacity:1; transform:translateY(0);}
        .gd-letter .gd-sign{margin-top:1.6rem; text-align:right; font-family:'Sacramento',cursive; font-size:1.7rem; color:#9fc9ff;}
        .gd-hint-open{text-align:center; font-size:0.85rem; color:var(--gold); opacity:0.65; padding:1rem 0;}
        .gd-edit-note{font-size:0.65rem; color:var(--lav); opacity:0.45; margin-top:1.6rem; text-align:center;}

        .gd-center-head{text-align:center; margin-bottom:2rem;}
        .gd-center-head h2{font-family:'Playfair Display',serif; font-style:italic; font-weight:500; font-size:clamp(1.6rem,3.8vw,2.2rem); margin-top:0.5rem; color:#fdf6e3;}

        .gd-constellation-wrap{display:flex; flex-direction:column; align-items:center;}
        .gd-constellation-svg{width:100%; max-width:400px;}
        .gd-const-line{fill:none; stroke:rgba(232,200,116,0.5); stroke-width:1; stroke-dasharray:1400; stroke-dashoffset:1400; transition:stroke-dashoffset 2.2s ease;}
        .gd-const-line.gd-drawn{stroke-dashoffset:0;}
        .gd-const-glow{fill:rgba(232,200,116,0.15); transition:r .3s ease, fill .3s ease;}
        .gd-const-glow.gd-const-active{fill:rgba(255,157,179,0.35); animation:gdConstPulse 1.6s ease-in-out infinite;}
        @keyframes gdConstPulse{0%,100%{opacity:1;} 50%{opacity:0.55;}}
        .gd-const-num{fill:var(--gold); font-size:9px; font-family:'Outfit',sans-serif; opacity:0.8;}
        .gd-const-caption{min-height:3.4rem; text-align:center; max-width:420px; margin-top:0.5rem; font-size:0.92rem; line-height:1.6; color:var(--lav);}
        .gd-const-hint{opacity:0.55; font-size:0.8rem; letter-spacing:0.05em;}
        .gd-const-reason strong{color:var(--gold);}

        .gd-string-wrap{position:relative; padding-top:2rem;}
        .gd-string-svg{position:absolute; top:0; left:0; width:100%; height:40px;}
        .gd-polaroids{display:flex; justify-content:space-between; gap:0.8rem; padding-top:1.4rem;}
        .gd-polaroid{
          background:#fff8ec; padding:0.5rem 0.5rem 1.1rem; border-radius:2px; width:23%;
          box-shadow:0 16px 28px -14px rgba(0,0,0,0.55); position:relative;
          transition:transform .4s ease, box-shadow .4s ease;
        }
        .gd-polaroid:nth-child(odd){transform:rotate(-4deg) translateY(6px);}
        .gd-polaroid:nth-child(even){transform:rotate(3deg) translateY(-4px);}
        .gd-polaroid:hover{transform:scale(1.08) rotate(0deg) translateY(-6px); box-shadow:0 0 30px rgba(232,200,116,0.4);}
        .gd-polaroid::before{content:""; position:absolute; top:-6px; left:50%; transform:translateX(-50%); width:8px; height:8px; border-radius:50%; background:var(--gold); box-shadow:0 0 6px rgba(232,200,116,0.8);}
        .gd-polaroid-photo{aspect-ratio:1/1; background:linear-gradient(160deg,#f3d98a33,#ff9db333); display:flex; align-items:center; justify-content:center;}
        .gd-polaroid-photo svg{opacity:0.5;}
        .gd-polaroid-cap{text-align:center; font-size:0.55rem; letter-spacing:0.1em; text-transform:uppercase; color:#7a5a33; margin-top:0.4rem;}

        .gd-flowers-row{display:flex; justify-content:center; gap:clamp(1.5rem,8vw,4rem); margin-bottom:1rem;}
        .gd-flower-wrap{display:flex; flex-direction:column; align-items:center;}
        .gd-flower-svg{width:110px; height:auto;}
        .gd-flower-cap{font-size:0.62rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold); opacity:0.7; margin-top:0.3rem;}
        .gd-stem{stroke-dasharray:100; stroke-dashoffset:100; transition:stroke-dashoffset 1.4s ease;}
        .gd-stem.gd-grown{stroke-dashoffset:0;}
        .gd-leaf{opacity:0; transform:scale(0.4); transform-origin:60px 130px; transition:opacity .6s ease .9s, transform .6s ease .9s;}
        .gd-leaf.gd-shown{opacity:1; transform:scale(1);}
        .gd-bloom{opacity:0; transform:scale(0.3); transition:opacity .5s ease 1.3s, transform .5s cubic-bezier(.3,1.4,.5,1) 1.3s;}
        .gd-bloom.gd-bloomed{opacity:1; transform:scale(1);}
        .gd-petal{opacity:0; transform-origin:center; transition:opacity .5s ease, transform .5s ease;}
        .gd-bloom.gd-bloomed .gd-petal{opacity:0.92;}
        .gd-rain-drop{animation-name:gdRainFall; animation-iteration-count:infinite; animation-timing-function:linear;}
        @keyframes gdRainFall{0%{transform:translateY(0); opacity:0;} 15%{opacity:0.7;} 100%{transform:translateY(160px); opacity:0;}}
        .gd-sun-glow{animation:gdMoonFloat 4s ease-in-out infinite;}
        .gd-sun-ray{animation:gdRayPulse 3s ease-in-out infinite;}
        @keyframes gdRayPulse{0%,100%{opacity:0.5;} 50%{opacity:1;}}

        .gd-reminder-card{
          background:linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
          border:1px solid rgba(232,200,116,0.25); border-radius:8px;
          padding:clamp(1.8rem,6vw,3rem); position:relative; backdrop-filter:blur(2px);
          box-shadow:0 30px 60px -30px rgba(0,0,0,0.7), inset 0 0 60px rgba(232,200,116,0.03);
        }
        .gd-reminder-card p{
          font-family:'Noto Serif Khmer',serif; font-size:1.02rem; line-height:2.05; color:#f2eefc; opacity:0.92;
          margin-bottom:1.15rem;
        }
        .gd-reminder-card p:last-child{margin-bottom:0;}
        .gd-reminder-divider{width:40px; height:1px; background:var(--gold); opacity:0.5; margin:0 auto 1.8rem;}

        .gd-footer{text-align:center; padding:4.5rem 1.5rem 4rem; position:relative; z-index:1;}
        .gd-footer-heart{margin:0 auto 1.1rem; display:block; color:var(--rose); animation:gdPulse 2s ease-in-out infinite;}
        @keyframes gdPulse{0%,100%{transform:scale(1);} 50%{transform:scale(1.15);}}
        .gd-footer p{font-family:'Sacramento',cursive; font-size:1.6rem; color:var(--gold-soft);}
        .gd-footer .gd-date{margin-top:0.5rem; font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--lav); opacity:0.5;}

        @media (max-width:420px){ .gd-countdown{gap:1rem;} }
        @media (prefers-reduced-motion:reduce){
          .gd-star-dot, .gd-shooting-star, .gd-footer-heart, .gd-moon-wrap, .gd-ripple, .gd-const-glow.gd-const-active, .gd-root::before{animation:none !important;}
          .gd-reveal, .gd-const-line, .gd-letter, .gd-letter-outer{transition:none;}
        }
      `}</style>

      <Starfield />
      <ShootingStar trigger={shoot} />

      {/* HERO */}
      <section className="gd-hero">
        <div className="gd-eyebrow gd-fade" style={{ animationDelay: "0.2s" }}>Written in the Stars</div>
        <h1 className="gd-h1 gd-fade" style={{ animationDelay: "0.4s" }}>
          Happy Girlfriend Day
          <span className="gd-script">Moon Moon</span>
        </h1>
        <p className="gd-sub gd-fade" style={{ animationDelay: "0.55s" }}>
          Every night the moon grows a little fuller — just like my reasons for loving you.
        </p>

        <div className="gd-fade" style={{ animationDelay: "0.7s" }}>
          <MoonPhase percent={cd.percent} />
        </div>
        <div className="gd-moon-caption gd-fade" style={{ animationDelay: "0.8s" }}>
          the moon reaches full on Girlfriend Day, August 1st
        </div>

        <div className="gd-countdown gd-fade" style={{ animationDelay: "0.9s" }}>
          {[["d", "Days"], ["h", "Hrs"], ["m", "Min"], ["s", "Sec"]].map(([k, label]) => (
            <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="gd-cd-num">{cd[k]}</div>
              <div className="gd-cd-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="gd-fade" style={{ animationDelay: "1.05s" }}>
          <div className="gd-wish-btn" onClick={makeWish} role="button" tabIndex={0}
            aria-label="Make a wish to reveal your letter"
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && makeWish()}>
            <StarIcon size={30} color="#f3d98a" fill={open ? "#f3d98a" : "none"} strokeWidth={1.3} />
            {ripple > 0 && <span key={ripple} className="gd-ripple" aria-hidden="true" />}
          </div>
          <div className={`gd-wish-hint ${open ? "gd-hide" : ""}`}>make a wish</div>
        </div>
      </section>

      {/* LETTER */}
      <section className="gd-section">
        {!open && <div className="gd-hint-open">Make a wish above to catch a falling star ✦</div>}
        <div className={`gd-letter-outer ${open ? "gd-shown" : ""}`}>
          <div className="gd-letter">
            <div className="gd-letter-inner">
              <div className="gd-letter-to">To My <span className="gd-script">Moon Moon</span> 🤍</div>
              {LETTER_PARAGRAPHS.map((p, i) => (
                <p key={i} style={{ transitionDelay: open ? `${0.35 + i * 0.2}s` : "0s" }}>{p}</p>
              ))}
              <div className="gd-sign">— Dororo</div>
            </div>
          </div>
        </div>
        <div className="gd-edit-note">✎ edit LETTER_PARAGRAPHS at the top of this file to add your own memories</div>
      </section>

      {/* REMINDER — TWO FLOWERS */}
      <section className="gd-section">
        <Reveal className="gd-center-head">
          <div className="gd-eyebrow">A Reminder, Just For You</div>
          <h2>The Flower She Forgets to Water</h2>
        </Reveal>
        <Reveal className="gd-flowers-row" delay={100}>
          <FlowerGrowth variant="sun" />
          <FlowerGrowth variant="storm" />
        </Reveal>
        <Reveal delay={200}>
          <div className="gd-reminder-card">
            <div className="gd-reminder-divider" />
            {REMINDER_PARAGRAPHS.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CONSTELLATION OF REASONS */}
      <section className="gd-section">
        <Reveal className="gd-center-head">
          <div className="gd-eyebrow">A Constellation</div>
          <h2>Reasons I Love You</h2>
        </Reveal>
        <Reveal delay={100}>
          <Constellation />
        </Reveal>
      </section>

      {/* PHOTOS ON A STRING */}
      <section className="gd-section">
        <Reveal className="gd-center-head">
          <div className="gd-eyebrow">Our Moments</div>
          <h2>Pinned Among the Stars</h2>
        </Reveal>
        <Reveal className="gd-string-wrap" delay={100}>
          <svg className="gd-string-svg" viewBox="0 0 400 40" preserveAspectRatio="none">
            <path d="M0,10 Q100,40 200,12 T400,10" fill="none" stroke="rgba(232,200,116,0.35)" strokeWidth="1" />
          </svg>
          <div className="gd-polaroids">
            {[Heart, StarIcon, Moon, Sparkles].map((Icon, idx) => (
              <div className="gd-polaroid" key={idx}>
                <div className="gd-polaroid-photo"><Icon size={20} color="#b8863f" strokeWidth={1.3} /></div>
                <div className="gd-polaroid-cap">photo {idx + 1}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="gd-edit-note">✎ replace each gd-polaroid-photo div with an &lt;img src="..." /&gt; when ready</div>
      </section>

      {/* FOOTER */}
      <footer className="gd-footer">
        <Heart className="gd-footer-heart" size={20} fill="currentColor" strokeWidth={0} />
        <p>Under the same sky, forever yours</p>
        <div className="gd-date">Girlfriend Day · August 1</div>
      </footer>
    </div>
  );
}

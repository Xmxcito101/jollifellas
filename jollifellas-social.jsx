import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
//  MOCK DATA
// ─────────────────────────────────────────────
const ME = {
  id: 0, name: "Samson", jolliName: "JolliKing", emoji: "👑",
  mood: "Turn Up", area: "Victoria Island",
  status: "Ready to turn up on the Island tonight 🔥",
  outings: 12, friends: 8,
};

const MOOD_COLORS = {
  "Turn Up":      "#E8622A",
  "Chill Vibes":  "#3B82F6",
  "Foodie Run":   "#F59E0B",
  "Romantic":     "#EC4899",
  "Arts & Culture": "#8B5CF6",
  "Explore Lagos":"#10B981",
};

const USERS = [
  { id:1, name:"Tunde",   jolliName:"TundeFire",  emoji:"🔥", mood:"Turn Up",       area:"Victoria Island", activity:"Heading to Quilox later — who's coming?",              distance:"0.3km", online:true,  outings:23, x:62, y:27 },
  { id:2, name:"Adaeze",  jolliName:"AdeChilll",  emoji:"🌊", mood:"Chill Vibes",   area:"Lekki Phase 1",  activity:"At Elegushi Beach rn 🏖️ vibes are immaculate",          distance:"1.2km", online:true,  outings:17, x:80, y:50 },
  { id:3, name:"Emeka",   jolliName:"EmekaEats",  emoji:"🍲", mood:"Foodie Run",    area:"Lagos Island",   activity:"On a buka crawl — 3rd spot and no regrets 👀",           distance:"2.1km", online:true,  outings:31, x:34, y:60 },
  { id:4, name:"Chisom",  jolliName:"ChiBeach",   emoji:"💃", mood:"Romantic",      area:"Ikoyi",          activity:"Date night at Georges. Menu is 🔥",                      distance:"1.8km", online:false, outings:9,  x:49, y:37 },
  { id:5, name:"Biodun",  jolliName:"BioDon",     emoji:"🎶", mood:"Turn Up",       area:"VI",             activity:"DJ set at Circa at 10. Free entry till 11",             distance:"0.8km", online:true,  outings:44, x:68, y:64 },
  { id:6, name:"Ngozi",   jolliName:"NgoziGlow",  emoji:"🎨", mood:"Arts & Culture",area:"Yaba",           activity:"Nike Gallery then Jazz Hole. Link if you're around",     distance:"4.5km", online:true,  outings:19, x:20, y:28 },
  { id:7, name:"Femi",    jolliName:"FemiSuya",   emoji:"🍢", mood:"Foodie Run",    area:"Surulere",       activity:"Best suya spot in Lagos right now. DM for location",     distance:"5.2km", online:true,  outings:28, x:16, y:65 },
  { id:8, name:"Kemi",    jolliName:"KemiVibes",  emoji:"💅", mood:"Chill Vibes",   area:"Lekki",          activity:"Pool day at Eko Hotel. Accepting link requests 😂",       distance:"2.6km", online:true,  outings:11, x:55, y:52 },
];

const FEED = [
  { id:1, user:USERS[0], venue:"Circa Rooftop, VI",      time:"2 min ago",   text:"This sunset from Circa is not normal 😭🔥 DJ just dropped something crazy. Come through!", vibe:"🔥", vibeCount:14 },
  { id:2, user:USERS[1], venue:"Elegushi Beach, Lekki",  time:"18 min ago",  text:"Seas are calm, music is low, coconut in hand. This is the Lagos you don't see on Twitter 🌴",  vibe:"😌", vibeCount:31 },
  { id:3, user:USERS[2], venue:"Mama Cass, Surulere",    time:"45 min ago",  text:"Amala and gbegiri hit different when you're genuinely hungry. 3rd buka on the crawl, zero regrets 🍲", vibe:"🤤", vibeCount:22 },
  { id:4, user:USERS[4], venue:"Quilox Club, VI",        time:"1 hr ago",    text:"Confirmed: I'm on the decks at Circa tonight 10PM sharp. Free entry till 11. Squad link up 🎶",  vibe:"🎶", vibeCount:47 },
  { id:5, user:USERS[5], venue:"Nike Art Gallery, Lekki",time:"2 hrs ago",   text:"5 floors of the most beautiful Nigerian art you've ever seen. If you haven't been, go this weekend 🖼️", vibe:"✨", vibeCount:33 },
];

const MEETUPS = [
  {
    id:1, type:"convoy", host:USERS[0],
    title:"VI Turn Up Convoy 🚗",
    destination:"Quilox Club, Victoria Island",
    meetPoint:"Civic Centre Gate, VI",
    time:"Tonight, 9:30 PM",
    joined:[USERS[4], USERS[3]],
    maxSlots:10,
    desc:"Linking up at Civic Centre gate then rolling to Quilox as a squad. VIP table already booked. No stragglers — be there at 9:15.",
  },
  {
    id:2, type:"meetup", host:USERS[1],
    title:"Elegushi Beach Chill 🏖️",
    destination:"Elegushi Private Beach, Lekki",
    meetPoint:"Beach entrance gate",
    time:"Today, 3:00 PM",
    joined:[USERS[2]],
    maxSlots:8,
    desc:"Low-key afternoon beach session. Bring your own drinks and good vibes only. No drama, no dress code. Just the ocean and good people.",
  },
];

// ─────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────
const S = {
  overlay: {
    position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",
    backdropFilter:"blur(10px)",display:"flex",alignItems:"flex-end",
    justifyContent:"center",zIndex:200,padding:"0 12px 16px",
  },
  sheet: {
    background:"#12121F",border:"1px solid rgba(245,176,0,0.2)",
    borderRadius:24,padding:"24px 20px",width:"100%",maxWidth:460,
    position:"relative",maxHeight:"88vh",overflowY:"auto",
  },
  closeX: {
    position:"absolute",top:14,right:14,
    background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
    color:"#F0EDE6",width:30,height:30,borderRadius:"50%",
    fontSize:17,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
    lineHeight:1,
  },
  sectionLabel: {
    fontSize:10,textTransform:"uppercase",letterSpacing:2.5,
    color:"#F5B000",fontWeight:700,marginBottom:10,
  },
  card: {
    background:"#12121F",border:"1px solid rgba(245,176,0,0.1)",
    borderRadius:18,marginBottom:10,overflow:"hidden",
  },
  inputWrap: { marginBottom:14 },
  inputLabel: {
    display:"block",fontSize:11,color:"#F5B000",
    fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:6,
  },
  input: {
    width:"100%",background:"#0B0B17",border:"1.5px solid rgba(245,176,0,0.15)",
    color:"#F0EDE6",padding:"12px 14px",borderRadius:12,
    fontFamily:"Syne,sans-serif",fontSize:14,outline:"none",boxSizing:"border-box",
  },
  primaryBtn: (col="#E8622A") => ({
    background:`linear-gradient(135deg, ${col}, ${shadeColor(col,-20)})`,
    color:"#fff",border:"none",padding:"13px 24px",borderRadius:12,
    fontFamily:"Syne,sans-serif",fontSize:15,fontWeight:700,
    cursor:"pointer",width:"100%",boxShadow:`0 6px 24px ${col}40`,
    transition:"transform .15s,box-shadow .15s",
  }),
  ghostBtn: {
    background:"rgba(245,176,0,0.08)",border:"1px solid rgba(245,176,0,0.25)",
    color:"#F5B000",padding:"11px 20px",borderRadius:12,
    fontFamily:"Syne,sans-serif",fontSize:14,fontWeight:700,cursor:"pointer",
    flex:1,transition:"background .15s",
  },
};

function shadeColor(hex, pct) {
  const n = parseInt(hex.replace("#",""),16);
  const r = Math.max(0,Math.min(255,((n>>16)&0xFF)+(pct*2.55)|0));
  const g = Math.max(0,Math.min(255,((n>>8)&0xFF)+(pct*2.55)|0));
  const b = Math.max(0,Math.min(255,(n&0xFF)+(pct*2.55)|0));
  return `#${((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}`;
}

// ─────────────────────────────────────────────
//  SMALL SHARED COMPONENTS
// ─────────────────────────────────────────────
function MoodBadge({ mood, size=12 }) {
  const c = MOOD_COLORS[mood]||"#E8622A";
  return (
    <span style={{background:`${c}18`,border:`1px solid ${c}44`,color:c,
      padding:"2px 9px",borderRadius:100,fontSize:size,fontWeight:700,whiteSpace:"nowrap"}}>
      {mood}
    </span>
  );
}

function Avatar({ user, size=38 }) {
  const c = MOOD_COLORS[user.mood]||"#E8622A";
  return (
    <div style={{width:size,height:size,borderRadius:"50%",
      background:`${c}18`,border:`2px solid ${c}55`,
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:size*0.46,flexShrink:0,position:"relative"}}>
      {user.emoji}
      {user.online !== false && (
        <div style={{position:"absolute",bottom:0,right:0,
          width:size*0.24,height:size*0.24,borderRadius:"50%",
          background:"#22C55E",border:"1.5px solid #08080E"}}/>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  PROFILE BOTTOM SHEET
// ─────────────────────────────────────────────
function ProfileSheet({ user, onClose, onMeetup, onConvoy }) {
  const c = MOOD_COLORS[user.mood]||"#E8622A";
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.sheet} onClick={e=>e.stopPropagation()}>
        <button style={S.closeX} onClick={onClose}>×</button>

        {/* Hero */}
        <div style={{textAlign:"center",paddingTop:8,marginBottom:20}}>
          <Avatar user={user} size={72} />
          <h2 style={{fontFamily:"Playfair Display,serif",fontSize:24,fontWeight:900,
            marginTop:12,marginBottom:2,letterSpacing:-0.5}}>{user.name}</h2>
          <div style={{color:"#9A97A8",fontSize:13,marginBottom:10}}>@{user.jolliName}</div>
          <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
            <MoodBadge mood={user.mood} />
            <span style={{background:"rgba(245,176,0,0.08)",border:"1px solid rgba(245,176,0,0.2)",
              color:"#F5B000",padding:"2px 9px",borderRadius:100,fontSize:12}}>
              📍 {user.distance} away
            </span>
          </div>
        </div>

        {/* Status */}
        <div style={{background:"#0B0B17",border:`1px solid ${c}22`,borderRadius:12,
          padding:"12px 14px",marginBottom:16}}>
          <div style={{...S.sectionLabel,marginBottom:4}}>Currently</div>
          <div style={{fontSize:14,color:"#F0EDE6",lineHeight:1.55}}>{user.activity}</div>
        </div>

        {/* Stats */}
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {[["outings",user.outings,"Outings"],["area",user.area,"Area"],["vibe","🔥","Vibe"]].map(([k,v,l])=>(
            <div key={k} style={{flex:1,background:"#0B0B17",border:"1px solid rgba(245,176,0,0.1)",
              borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
              <div style={{fontSize:k==="outings"?20:k==="area"?10:18,fontWeight:800,
                color:"#F0EDE6",wordBreak:"break-word",lineHeight:1.2}}>{v}</div>
              <div style={{fontSize:10,color:"#9A97A8",textTransform:"uppercase",
                letterSpacing:1,marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{display:"flex",gap:8}}>
          <button style={{...S.primaryBtn(c),flex:1,padding:"12px 10px",fontSize:13}}
            onClick={()=>{onMeetup(user);onClose();}}>
            📍 Suggest Meetup
          </button>
          <button style={{...S.ghostBtn,fontSize:13,padding:"12px 10px"}}
            onClick={()=>{onConvoy(user);onClose();}}>
            🚗 Start Convoy
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  CREATE CONVOY MODAL
// ─────────────────────────────────────────────
function ConvoyModal({ onClose, onLaunch, prefill }) {
  const [dest, setDest]       = useState(prefill||"");
  const [meet, setMeet]       = useState("");
  const [time, setTime]       = useState("");
  const [note, setNote]       = useState("");
  const [maxP, setMaxP]       = useState("8");

  const ready = dest && meet && time;

  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.sheet} onClick={e=>e.stopPropagation()}>
        <button style={S.closeX} onClick={onClose}>×</button>

        <div style={{fontSize:40,marginBottom:10}}>🚗</div>
        <h2 style={{fontFamily:"Playfair Display,serif",fontSize:22,fontWeight:900,marginBottom:4}}>
          Start a Convoy
        </h2>
        <p style={{color:"#9A97A8",fontSize:13,marginBottom:20,lineHeight:1.5}}>
          Set your destination, choose a link-up point and invite your squad to move together.
        </p>

        <div style={S.inputWrap}>
          <label style={S.inputLabel}>🏁 Destination</label>
          <input style={S.input} placeholder="e.g. Quilox Club, Victoria Island"
            value={dest} onChange={e=>setDest(e.target.value)} />
        </div>
        <div style={S.inputWrap}>
          <label style={S.inputLabel}>📌 Link-Up Point</label>
          <input style={S.input} placeholder="e.g. Civic Centre Gate, VI"
            value={meet} onChange={e=>setMeet(e.target.value)} />
        </div>
        <div style={S.inputWrap}>
          <label style={S.inputLabel}>⏰ Departure Time</label>
          <input style={S.input} placeholder="e.g. Tonight, 9:30 PM"
            value={time} onChange={e=>setTime(e.target.value)} />
        </div>
        <div style={S.inputWrap}>
          <label style={S.inputLabel}>👥 Max Squad Size</label>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {["4","6","8","10","15","No limit"].map(n=>(
              <button key={n} onClick={()=>setMaxP(n)}
                style={{background:maxP===n?"rgba(232,98,42,0.15)":"#0B0B17",
                  border:`1px solid ${maxP===n?"rgba(232,98,42,0.5)":"rgba(245,176,0,0.12)"}`,
                  color:maxP===n?"#E8622A":"#9A97A8",
                  padding:"7px 14px",borderRadius:100,fontSize:13,
                  fontFamily:"Syne,sans-serif",fontWeight:600,cursor:"pointer"}}>
                {n}
              </button>
            ))}
          </div>
        </div>
        <div style={S.inputWrap}>
          <label style={S.inputLabel}>📝 Convoy Note</label>
          <textarea style={{...S.input,minHeight:72,resize:"vertical"}}
            placeholder="Any details for the squad — dress code, what to bring, etc."
            value={note} onChange={e=>setNote(e.target.value)} />
        </div>

        <button
          style={{...S.primaryBtn(),opacity:ready?1:0.45,cursor:ready?"pointer":"not-allowed"}}
          disabled={!ready}
          onClick={()=>{onLaunch({dest,meet,time,note,maxP});onClose();}}>
          🚗 Launch Convoy
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  CREATE MEETUP MODAL
// ─────────────────────────────────────────────
function MeetupModal({ onClose, onCreate }) {
  const [venue,  setVenue]  = useState("");
  const [time,   setTime]   = useState("");
  const [vibe,   setVibe]   = useState("Turn Up");
  const [note,   setNote]   = useState("");
  const [open,   setOpen]   = useState(true);

  const ready = venue && time;

  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.sheet} onClick={e=>e.stopPropagation()}>
        <button style={S.closeX} onClick={onClose}>×</button>

        <div style={{fontSize:40,marginBottom:10}}>📍</div>
        <h2 style={{fontFamily:"Playfair Display,serif",fontSize:22,fontWeight:900,marginBottom:4}}>
          Create a Meetup
        </h2>
        <p style={{color:"#9A97A8",fontSize:13,marginBottom:20,lineHeight:1.5}}>
          Pick a spot and invite nearby Jollifellas to link up with you.
        </p>

        <div style={S.inputWrap}>
          <label style={S.inputLabel}>📍 Venue / Location</label>
          <input style={S.input} placeholder="e.g. Elegushi Beach, Lekki"
            value={venue} onChange={e=>setVenue(e.target.value)} />
        </div>
        <div style={S.inputWrap}>
          <label style={S.inputLabel}>⏰ Time</label>
          <input style={S.input} placeholder="e.g. Tomorrow, 4:00 PM"
            value={time} onChange={e=>setTime(e.target.value)} />
        </div>
        <div style={S.inputWrap}>
          <label style={S.inputLabel}>🎭 Vibe</label>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {Object.keys(MOOD_COLORS).map(m=>{
              const c=MOOD_COLORS[m];
              return(
                <button key={m} onClick={()=>setVibe(m)}
                  style={{background:vibe===m?`${c}18`:"#0B0B17",
                    border:`1px solid ${vibe===m?`${c}55`:"rgba(245,176,0,0.12)"}`,
                    color:vibe===m?c:"#9A97A8",
                    padding:"6px 12px",borderRadius:100,fontSize:12,
                    fontFamily:"Syne,sans-serif",fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
                  {m}
                </button>
              );
            })}
          </div>
        </div>
        <div style={S.inputWrap}>
          <label style={S.inputLabel}>📝 Note</label>
          <textarea style={{...S.input,minHeight:64,resize:"vertical"}}
            placeholder="What's the plan? What should people bring?"
            value={note} onChange={e=>setNote(e.target.value)} />
        </div>

        {/* Open / Invite-only toggle */}
        <div style={{background:"#0B0B17",border:"1px solid rgba(245,176,0,0.1)",
          borderRadius:12,padding:"12px 14px",marginBottom:16,
          display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontWeight:600,fontSize:14,marginBottom:2}}>
              {open?"🌍 Open Meetup":"🔒 Invite Only"}
            </div>
            <div style={{fontSize:12,color:"#9A97A8"}}>
              {open?"Anyone nearby can join":"Only people you invite can join"}
            </div>
          </div>
          <Toggle value={open} onChange={setOpen} />
        </div>

        <button
          style={{...S.primaryBtn("#3B82F6"),opacity:ready?1:0.45,cursor:ready?"pointer":"not-allowed"}}
          disabled={!ready}
          onClick={()=>{onCreate({venue,time,vibe,note,open});onClose();}}>
          📍 Create Meetup
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  EXPERIENCE SHARE MODAL
// ─────────────────────────────────────────────
function ShareModal({ onClose, onShare }) {
  const [venue, setVenue] = useState("");
  const [text,  setText]  = useState("");
  const vibes = ["🔥","😌","🤤","🎶","✨","😂","💃","🏖️"];
  const [vibe, setVibe]   = useState("🔥");

  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.sheet} onClick={e=>e.stopPropagation()}>
        <button style={S.closeX} onClick={onClose}>×</button>

        <h2 style={{fontFamily:"Playfair Display,serif",fontSize:22,fontWeight:900,marginBottom:4}}>
          Share Your Experience
        </h2>
        <p style={{color:"#9A97A8",fontSize:13,marginBottom:18}}>
          Let the squad know what's happening where you are.
        </p>

        <div style={S.inputWrap}>
          <label style={S.inputLabel}>📍 Where Are You?</label>
          <input style={S.input} placeholder="e.g. Nok by Alara, Victoria Island"
            value={venue} onChange={e=>setVenue(e.target.value)} />
        </div>

        <div style={S.inputWrap}>
          <label style={S.inputLabel}>What's the vibe?</label>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
            {vibes.map(v=>(
              <button key={v} onClick={()=>setVibe(v)}
                style={{background:vibe===v?"rgba(232,98,42,0.15)":"#0B0B17",
                  border:`1px solid ${vibe===v?"rgba(232,98,42,0.4)":"rgba(245,176,0,0.12)"}`,
                  borderRadius:100,fontSize:20,padding:"6px 10px",cursor:"pointer"}}>
                {v}
              </button>
            ))}
          </div>
          <textarea style={{...S.input,minHeight:90,resize:"vertical"}}
            placeholder="Tell the squad what's happening here..."
            value={text} onChange={e=>setText(e.target.value)} />
        </div>

        <button
          style={{...S.primaryBtn(),opacity:venue&&text?1:0.45}}
          disabled={!venue||!text}
          onClick={()=>{onShare({venue,text,vibe});onClose();}}>
          📸 Drop the Experience
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  TOGGLE COMPONENT
// ─────────────────────────────────────────────
function Toggle({ value, onChange }) {
  return (
    <button onClick={()=>onChange(!value)}
      style={{width:48,height:26,borderRadius:100,
        background:value?"#22C55E":"#333",border:"none",
        cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
      <div style={{width:20,height:20,borderRadius:"50%",background:"white",
        position:"absolute",top:3,left:value?25:3,transition:"left .2s"}}/>
    </button>
  );
}

// ─────────────────────────────────────────────
//  MAP TAB
// ─────────────────────────────────────────────
function MapTab({ onSelectUser }) {
  const LABELS = [
    {t:"Victoria Island", x:60,y:20},
    {t:"Ikoyi",           x:47,y:35},
    {t:"Lagos Island",    x:32,y:58},
    {t:"Lekki",           x:78,y:46},
    {t:"Surulere",        x:17,y:62},
    {t:"Yaba",            x:22,y:27},
  ];

  return (
    <div>
      {/* MAP CANVAS */}
      <div style={{position:"relative",height:380,borderRadius:20,
        background:"#0A0A16",border:"1px solid rgba(245,176,0,0.12)",
        overflow:"hidden",marginBottom:16}}>

        {/* Grid */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} opacity={0.05}>
          {Array.from({length:9}).map((_,i)=>(
            <line key={`h${i}`} x1="0" y1={`${i*12.5}%`} x2="100%" y2={`${i*12.5}%`} stroke="#F5B000" strokeWidth="1"/>
          ))}
          {Array.from({length:11}).map((_,i)=>(
            <line key={`v${i}`} x1={`${i*10}%`} y1="0" x2={`${i*10}%`} y2="100%" stroke="#F5B000" strokeWidth="1"/>
          ))}
        </svg>

        {/* Lagoon SVG */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} opacity={0.8}>
          <defs>
            <radialGradient id="lagGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a3a5c" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#0a1a2c" stopOpacity="0.2"/>
            </radialGradient>
          </defs>
          <ellipse cx="55%" cy="82%" rx="50%" ry="22%"
            fill="url(#lagGrad)" stroke="rgba(59,130,246,0.15)" strokeWidth="1"/>
          <text x="50%" y="90%" textAnchor="middle" fontSize="10"
            fill="rgba(59,130,246,0.35)" fontStyle="italic" letterSpacing="3">
            LAGOS LAGOON
          </text>
          {/* Roads */}
          <path d="M 20% 50% Q 50% 45% 85% 55%" stroke="rgba(245,176,0,0.08)" strokeWidth="2" fill="none"/>
          <path d="M 10% 70% L 90% 70%" stroke="rgba(245,176,0,0.05)" strokeWidth="1.5" fill="none"/>
          <path d="M 50% 5% L 50% 75%" stroke="rgba(245,176,0,0.05)" strokeWidth="1.5" fill="none"/>
        </svg>

        {/* Area Labels */}
        {LABELS.map(l=>(
          <div key={l.t} style={{position:"absolute",left:`${l.x}%`,top:`${l.y}%`,
            transform:"translate(-50%,-50%)",pointerEvents:"none",
            fontSize:9,color:"rgba(255,255,255,0.18)",fontWeight:700,
            letterSpacing:1.5,textTransform:"uppercase",whiteSpace:"nowrap"}}>
            {l.t}
          </div>
        ))}

        {/* Radar ring for ME */}
        <div style={{position:"absolute",left:"63%",top:"30%",
          transform:"translate(-50%,-50%)",pointerEvents:"none"}}>
          <div style={{position:"absolute",width:80,height:80,borderRadius:"50%",
            border:"1px solid rgba(232,98,42,0.2)",top:"50%",left:"50%",
            transform:"translate(-50%,-50%)",animation:"pulse 2s ease-in-out infinite"}}/>
          <div style={{position:"absolute",width:120,height:120,borderRadius:"50%",
            border:"1px solid rgba(232,98,42,0.08)",top:"50%",left:"50%",
            transform:"translate(-50%,-50%)",animation:"pulse 2s ease-in-out infinite .4s"}}/>
        </div>

        {/* ME pin */}
        <div style={{position:"absolute",left:"63%",top:"30%",
          transform:"translate(-50%,-50%)",zIndex:10}}>
          <div style={{width:46,height:46,borderRadius:"50%",
            background:"linear-gradient(135deg,#E8622A,#C0391A)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:22,border:"3px solid rgba(232,98,42,0.5)",
            boxShadow:"0 0 0 8px rgba(232,98,42,0.1),0 4px 16px rgba(232,98,42,0.4)"}}>
            👑
          </div>
          <div style={{position:"absolute",top:"100%",left:"50%",
            transform:"translateX(-50%)",marginTop:4,
            background:"#E8622A",color:"white",fontSize:8,
            padding:"2px 6px",borderRadius:4,fontWeight:800,
            letterSpacing:1,whiteSpace:"nowrap"}}>
            YOU
          </div>
        </div>

        {/* User pins */}
        {USERS.map(u=>{
          const c = MOOD_COLORS[u.mood]||"#E8622A";
          return (
            <button key={u.id} onClick={()=>onSelectUser(u)}
              style={{position:"absolute",left:`${u.x}%`,top:`${u.y}%`,
                transform:"translate(-50%,-50%)",
                width:38,height:38,borderRadius:"50%",
                background:`${c}18`,border:`2px solid ${c}`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:17,cursor:"pointer",position:"absolute",
                boxShadow:u.online?`0 0 0 5px ${c}15,0 0 12px ${c}30`:"none",
                transition:"transform .15s",
              }}>
              {u.emoji}
              {u.online && (
                <div style={{position:"absolute",top:0,right:0,
                  width:10,height:10,borderRadius:"50%",
                  background:"#22C55E",border:"1.5px solid #0A0A16"}}/>
              )}
            </button>
          );
        })}

        {/* Online badge */}
        <div style={{position:"absolute",top:12,left:12,
          background:"rgba(8,8,14,0.8)",backdropFilter:"blur(8px)",
          border:"1px solid rgba(34,197,94,0.25)",borderRadius:100,
          padding:"4px 10px",display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:"#22C55E"}}/>
          <span style={{fontSize:11,color:"#22C55E",fontWeight:600}}>
            {USERS.filter(u=>u.online).length} Jollifellas online
          </span>
        </div>
      </div>

      {/* Nearby scroll */}
      <div style={S.sectionLabel}>Nearby · Tap to connect</div>
      <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8,
        scrollbarWidth:"none",WebkitScrollbarWidth:"none"}}>
        {USERS.filter(u=>u.online).map(u=>{
          const c=MOOD_COLORS[u.mood]||"#E8622A";
          return(
            <button key={u.id} onClick={()=>onSelectUser(u)}
              style={{flex:"0 0 auto",background:"#12121F",
                border:`1px solid ${c}22`,borderRadius:14,
                padding:"12px 14px",cursor:"pointer",
                textAlign:"left",minWidth:155,maxWidth:155,
                fontFamily:"Syne,sans-serif"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                <Avatar user={u} size={32}/>
                <div>
                  <div style={{color:"#F0EDE6",fontWeight:700,fontSize:13}}>{u.name}</div>
                  <div style={{color:c,fontSize:11}}>{u.distance}</div>
                </div>
              </div>
              <div style={{fontSize:12,color:"#9A97A8",lineHeight:1.4,
                display:"-webkit-box",WebkitLineClamp:2,
                WebkitBoxOrient:"vertical",overflow:"hidden"}}>
                {u.activity}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  FEED TAB
// ─────────────────────────────────────────────
function FeedTab({ posts, onShareClick }) {
  const [liked, setLiked] = useState({});
  const toggle = id=>setLiked(p=>({...p,[id]:!p[id]}));

  return (
    <div>
      {/* Compose bar */}
      <button onClick={onShareClick}
        style={{width:"100%",background:"#12121F",border:"1px solid rgba(245,176,0,0.12)",
          borderRadius:16,padding:14,display:"flex",gap:12,alignItems:"center",
          cursor:"pointer",fontFamily:"Syne,sans-serif",marginBottom:16,textAlign:"left"}}>
        <div style={{width:38,height:38,borderRadius:"50%",
          background:"rgba(232,98,42,0.15)",border:"2px solid rgba(232,98,42,0.4)",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>
          👑
        </div>
        <div style={{flex:1,background:"#0B0B17",border:"1px solid rgba(245,176,0,0.1)",
          borderRadius:10,padding:"10px 14px",color:"#9A97A8",fontSize:14}}>
          What's the vibe where you are?
        </div>
      </button>

      {posts.map(post=>{
        const c=MOOD_COLORS[post.user.mood]||"#E8622A";
        const isLiked=liked[post.id];
        return(
          <div key={post.id} style={S.card}>
            <div style={{padding:"14px 16px 12px"}}>
              {/* Author row */}
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <Avatar user={post.user} size={40}/>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:14,color:"#F0EDE6"}}>{post.user.name}</div>
                  <div style={{fontSize:11,color:"#9A97A8"}}>📍 {post.venue} · {post.time}</div>
                </div>
                <MoodBadge mood={post.user.mood} size={11}/>
              </div>

              {/* Text */}
              <p style={{fontSize:14,color:"#F0EDE6",lineHeight:1.65,marginBottom:14}}>{post.text}</p>

              {/* Actions */}
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                <button onClick={()=>toggle(post.id)}
                  style={{background:isLiked?"rgba(232,98,42,0.12)":"#0B0B17",
                    border:`1px solid ${isLiked?"rgba(232,98,42,0.4)":"rgba(245,176,0,0.1)"}`,
                    color:isLiked?"#E8622A":"#9A97A8",
                    padding:"6px 14px",borderRadius:100,fontSize:13,
                    cursor:"pointer",fontFamily:"Syne,sans-serif",fontWeight:600,
                    transition:"all .15s"}}>
                  {post.vibe} {post.vibeCount+(isLiked?1:0)}
                </button>
                <button style={{background:"#0B0B17",border:"1px solid rgba(245,176,0,0.1)",
                  color:"#9A97A8",padding:"6px 14px",borderRadius:100,
                  fontSize:13,cursor:"pointer",fontFamily:"Syne,sans-serif"}}>
                  💬 Reply
                </button>
                <button style={{background:"#0B0B17",border:"1px solid rgba(245,176,0,0.1)",
                  color:"#9A97A8",padding:"6px 12px",borderRadius:100,
                  fontSize:13,cursor:"pointer",fontFamily:"Syne,sans-serif",marginLeft:"auto"}}>
                  📍 I'm here too
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
//  MEETUPS TAB
// ─────────────────────────────────────────────
function MeetupsTab({ meetups, onConvoy, onMeetup }) {
  const [joined, setJoined] = useState({});
  const doJoin = id => setJoined(p=>({...p,[id]:true}));

  return (
    <div>
      {/* CTA row */}
      <div style={{display:"flex",gap:8,marginBottom:22}}>
        <button onClick={onConvoy}
          style={{...S.primaryBtn(),flex:1,fontSize:14,padding:"13px 10px"}}>
          🚗 Start Convoy
        </button>
        <button onClick={onMeetup} style={{...S.ghostBtn}}>
          📍 Create Meetup
        </button>
      </div>

      <div style={S.sectionLabel}>Active Now · {meetups.length} happening</div>

      {meetups.map(m=>{
        const isJoined=joined[m.id];
        return(
          <div key={m.id} style={{...S.card,border:`1px solid ${m.type==="convoy"?"rgba(232,98,42,0.2)":"rgba(59,130,246,0.18)"}`}}>
            <div style={{padding:16}}>
              {/* Header */}
              <div style={{display:"flex",gap:10,marginBottom:12}}>
                <div style={{fontSize:34}}>{m.type==="convoy"?"🚗":"📍"}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{
                      background:m.type==="convoy"?"rgba(232,98,42,0.12)":"rgba(59,130,246,0.12)",
                      border:`1px solid ${m.type==="convoy"?"rgba(232,98,42,0.3)":"rgba(59,130,246,0.3)"}`,
                      color:m.type==="convoy"?"#E8622A":"#3B82F6",
                      padding:"2px 8px",borderRadius:100,fontSize:10,
                      fontWeight:700,textTransform:"uppercase",letterSpacing:0.5}}>
                      {m.type}
                    </span>
                    <span style={{fontSize:11,color:"#9A97A8"}}>by {m.host.name}</span>
                  </div>
                  <h3 style={{fontSize:16,fontWeight:800,color:"#F0EDE6",marginBottom:4}}>{m.title}</h3>
                  <div style={{fontSize:12,color:"#9A97A8",lineHeight:1.5}}>
                    🏁 {m.destination}<br/>
                    {m.type==="convoy"&&<>📌 Link-up: {m.meetPoint}<br/></>}
                    ⏰ {m.time}
                  </div>
                </div>
              </div>

              <p style={{fontSize:13,color:"#9A97A8",lineHeight:1.55,marginBottom:14}}>{m.desc}</p>

              {/* Who's joined */}
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                <div style={{display:"flex"}}>
                  {m.joined.map((u,i)=>(
                    <div key={u.id} style={{width:26,height:26,borderRadius:"50%",
                      background:"#0B0B17",border:"2px solid #12121F",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:12,marginLeft:i>0?-8:0,zIndex:m.joined.length-i}}>
                      {u.emoji}
                    </div>
                  ))}
                  {isJoined&&(
                    <div style={{width:26,height:26,borderRadius:"50%",
                      background:"rgba(232,98,42,0.15)",border:"2px solid rgba(232,98,42,0.4)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:12,marginLeft:-8}}>
                      👑
                    </div>
                  )}
                </div>
                <span style={{fontSize:12,color:"#9A97A8"}}>
                  {m.joined.length+(isJoined?1:0)} joined · {m.maxSlots-m.joined.length-(isJoined?1:0)} spots left
                </span>
              </div>

              <button
                onClick={()=>!isJoined&&doJoin(m.id)}
                style={{width:"100%",
                  background:isJoined?"rgba(34,197,94,0.08)":
                    m.type==="convoy"?"linear-gradient(135deg,#E8622A,#C0391A)":
                    "linear-gradient(135deg,#3B82F6,#1D4ED8)",
                  border:isJoined?"1px solid rgba(34,197,94,0.3)":"none",
                  color:isJoined?"#22C55E":"white",
                  padding:"12px",borderRadius:12,
                  fontFamily:"Syne,sans-serif",fontSize:15,fontWeight:700,
                  cursor:isJoined?"default":"pointer",
                  transition:"all .2s"}}>
                {isJoined?`✓ You're In! · ${m.type==="convoy"?"See you at the link-up":"See you there"}`:
                  m.type==="convoy"?"🚗 Join the Convoy":"📍 Join Meetup"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
//  PROFILE TAB
// ─────────────────────────────────────────────
function ProfileTab() {
  const [locationOn, setLocationOn] = useState(true);
  const [status, setStatus] = useState(ME.status);
  const [editing, setEditing] = useState(false);

  return (
    <div>
      {/* Profile card */}
      <div style={{background:"linear-gradient(135deg,rgba(232,98,42,0.12),rgba(245,176,0,0.06))",
        border:"1px solid rgba(232,98,42,0.2)",borderRadius:20,
        padding:"24px 20px",marginBottom:16,textAlign:"center"}}>
        <div style={{width:72,height:72,margin:"0 auto 14px",
          background:"rgba(232,98,42,0.12)",border:"2px solid #E8622A",borderRadius:"50%",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,
          boxShadow:"0 0 0 6px rgba(232,98,42,0.08)"}}>
          👑
        </div>
        <h2 style={{fontFamily:"Playfair Display,serif",fontSize:24,fontWeight:900,
          marginBottom:2}}>{ME.name}</h2>
        <div style={{color:"#F5B000",fontSize:14,marginBottom:6}}>@{ME.jolliName}</div>
        <MoodBadge mood={ME.mood} />

        {editing ? (
          <div style={{marginTop:12}}>
            <input style={{...S.input,textAlign:"center",marginBottom:8}}
              value={status} onChange={e=>setStatus(e.target.value)}/>
            <button onClick={()=>setEditing(false)}
              style={{...S.primaryBtn(),fontSize:13,padding:"8px 20px",width:"auto"}}>
              Save
            </button>
          </div>
        ) : (
          <div style={{marginTop:12,color:"#9A97A8",fontSize:14,
            cursor:"pointer",padding:"8px 0"}} onClick={()=>setEditing(true)}>
            {status} ✏️
          </div>
        )}

        <div style={{display:"flex",justifyContent:"center",gap:28,marginTop:16}}>
          {[["12","Outings"],["8","Fellas"],["VI","Area"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:800,color:"#F0EDE6"}}>{v}</div>
              <div style={{fontSize:10,color:"#9A97A8",textTransform:"uppercase",letterSpacing:1,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Location toggle */}
      <div style={{background:"#12121F",border:`1px solid ${locationOn?"rgba(34,197,94,0.2)":"rgba(245,176,0,0.1)"}`,
        borderRadius:16,padding:16,marginBottom:10,
        display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontWeight:700,fontSize:15,marginBottom:2,display:"flex",alignItems:"center",gap:6}}>
            📍 Share My Location
            {locationOn&&<span style={{fontSize:10,background:"rgba(34,197,94,0.1)",
              border:"1px solid rgba(34,197,94,0.3)",color:"#22C55E",
              padding:"2px 6px",borderRadius:100,fontWeight:600}}>LIVE</span>}
          </div>
          <div style={{fontSize:12,color:"#9A97A8"}}>
            {locationOn?"Visible to nearby Jollifellas":"Hidden from the map"}
          </div>
        </div>
        <Toggle value={locationOn} onChange={setLocationOn}/>
      </div>

      {/* Settings list */}
      {[
        {icon:"🎭",label:"Edit Jolli Profile",sub:"Name, photo, vibe settings"},
        {icon:"🔔",label:"Notifications",sub:"Nearby meetups, convoy invites"},
        {icon:"🛡️",label:"Privacy Settings",sub:"Who can see you on the map"},
        {icon:"🎨",label:"My Vibe",sub:"Current mood: Turn Up 🔥"},
        {icon:"📊",label:"My Outing History",sub:"All 12 Lagos adventures"},
        {icon:"🤝",label:"My Fellas",sub:"8 connections"},
      ].map(s=>(
        <div key={s.label} style={{background:"#12121F",
          border:"1px solid rgba(245,176,0,0.08)",borderRadius:14,
          padding:"14px 16px",marginBottom:8,
          display:"flex",alignItems:"center",gap:12,cursor:"pointer",
          transition:"border-color .15s",
        }}>
          <div style={{fontSize:22}}>{s.icon}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:600,fontSize:14}}>{s.label}</div>
            <div style={{fontSize:12,color:"#9A97A8"}}>{s.sub}</div>
          </div>
          <div style={{color:"#9A97A8",fontSize:18}}>›</div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
//  TABS CONFIG
// ─────────────────────────────────────────────
const TABS = [
  {id:"map",     icon:"🗺️", label:"Map"},
  {id:"feed",    icon:"📸", label:"Feed"},
  {id:"meetups", icon:"🚗", label:"Meetups"},
  {id:"profile", icon:"👑", label:"Profile"},
];

// ─────────────────────────────────────────────
//  ROOT APP
// ─────────────────────────────────────────────
export default function JolliFellasSocial() {
  const [tab,           setTab]          = useState("map");
  const [selectedUser,  setSelectedUser] = useState(null);
  const [showConvoy,    setShowConvoy]   = useState(false);
  const [showMeetup,    setShowMeetup]   = useState(false);
  const [showShare,     setShowShare]    = useState(false);
  const [convoyLive,    setConvoyLive]   = useState(false);
  const [meetupLive,    setMeetupLive]   = useState(false);
  const [shareLive,     setShareLive]    = useState(false);
  const [convoyDest,    setConvoyDest]   = useState("");
  const [feedPosts,     setFeedPosts]    = useState(FEED);
  const [liveMeetups,   setLiveMeetups]  = useState(MEETUPS);

  const onConvoyLaunch = (data) => {
    setConvoyDest(data.dest);
    setConvoyLive(true);
    setLiveMeetups(prev=>[{
      id:99,type:"convoy",host:{...ME,id:0,online:true,distance:"0km",outings:12},
      title:`${ME.name}'s Convoy 🚗`,
      destination:data.dest,
      meetPoint:data.meet,
      time:data.time,
      joined:[],
      maxSlots:parseInt(data.maxP)||8,
      desc:data.note||"Squad convoy. Moving together.",
    },...prev]);
  };

  const onMeetupCreate = (data) => {
    setMeetupLive(true);
    setLiveMeetups(prev=>[{
      id:98,type:"meetup",host:{...ME,id:0,online:true,distance:"0km",outings:12},
      title:`${ME.name}'s Meetup 📍`,
      destination:data.venue,
      meetPoint:data.venue,
      time:data.time,
      joined:[],
      maxSlots:8,
      desc:data.note||"Come through and link.",
    },...prev]);
  };

  const onShare = (data) => {
    setShareLive(true);
    setFeedPosts(prev=>[{
      id:99,
      user:{...ME,id:0,online:true,distance:"0km",outings:12,area:data.venue},
      venue:data.venue,
      time:"Just now",
      text:data.text,
      vibe:data.vibe,
      vibeCount:0,
    },...prev]);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Syne:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#08080E;overflow-x:hidden;}
        button{cursor:pointer;font-family:Syne,sans-serif;}
        input,textarea{font-family:Syne,sans-serif;color:#F0EDE6;}
        input::placeholder,textarea::placeholder{color:#9A97A8;}
        ::-webkit-scrollbar{width:3px;height:3px;}
        ::-webkit-scrollbar-thumb{background:rgba(245,176,0,0.15);border-radius:3px;}
        @keyframes pulse{0%,100%{opacity:.3;transform:translate(-50%,-50%) scale(1);}50%{opacity:.7;transform:translate(-50%,-50%) scale(1.15);}}
      `}</style>

      <div style={{background:"#08080E",color:"#F0EDE6",fontFamily:"Syne,sans-serif",
        minHeight:"100vh",maxWidth:480,margin:"0 auto",
        display:"flex",flexDirection:"column",position:"relative"}}>

        {/* ── HEADER ── */}
        <div style={{padding:"14px 18px",borderBottom:"1px solid rgba(245,176,0,0.08)",
          backdropFilter:"blur(16px)",background:"rgba(8,8,14,0.92)",
          position:"sticky",top:0,zIndex:50,
          display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,
              background:"linear-gradient(135deg,#E8622A,#C0391A)",
              borderRadius:10,display:"flex",alignItems:"center",
              justifyContent:"center",fontSize:17,
              boxShadow:"0 4px 12px rgba(232,98,42,0.35)"}}>
              🎉
            </div>
            <div>
              <div style={{fontFamily:"Playfair Display,serif",fontSize:19,fontWeight:900,
                background:"linear-gradient(135deg,#F5B000,#E8622A)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                letterSpacing:-0.5}}>
                jollifellas
              </div>
              <div style={{fontSize:9,color:"#9A97A8",textTransform:"uppercase",letterSpacing:2}}>
                Social · Lagos
              </div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,
            background:"rgba(34,197,94,0.07)",border:"1px solid rgba(34,197,94,0.2)",
            padding:"4px 10px",borderRadius:100}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#22C55E",
              boxShadow:"0 0 6px #22C55E"}}/>
            <span style={{fontSize:11,color:"#22C55E",fontWeight:600}}>
              {USERS.filter(u=>u.online).length} nearby
            </span>
          </div>
        </div>

        {/* ── TOASTS ── */}
        <div style={{position:"fixed",top:70,left:"50%",transform:"translateX(-50%)",
          zIndex:100,display:"flex",flexDirection:"column",gap:6,width:"92%",maxWidth:440,
          pointerEvents:"none"}}>
          {convoyLive&&(
            <div style={{background:"rgba(8,8,14,0.95)",border:"1px solid rgba(232,98,42,0.35)",
              borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:8,
              pointerEvents:"all"}}>
              <span style={{fontSize:18}}>🚗</span>
              <span style={{fontSize:13,color:"#F0EDE6",fontWeight:600,flex:1}}>
                Convoy live to <span style={{color:"#E8622A"}}>{convoyDest||"your destination"}</span>!
              </span>
              <button onClick={()=>setConvoyLive(false)}
                style={{background:"none",border:"none",color:"#9A97A8",fontSize:16}}>×</button>
            </div>
          )}
          {meetupLive&&(
            <div style={{background:"rgba(8,8,14,0.95)",border:"1px solid rgba(59,130,246,0.35)",
              borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:8,
              pointerEvents:"all"}}>
              <span style={{fontSize:18}}>📍</span>
              <span style={{fontSize:13,color:"#F0EDE6",fontWeight:600,flex:1}}>
                Your meetup is live! Nearby Jollifellas can now join.
              </span>
              <button onClick={()=>setMeetupLive(false)}
                style={{background:"none",border:"none",color:"#9A97A8",fontSize:16}}>×</button>
            </div>
          )}
          {shareLive&&(
            <div style={{background:"rgba(8,8,14,0.95)",border:"1px solid rgba(34,197,94,0.35)",
              borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:8,
              pointerEvents:"all"}}>
              <span style={{fontSize:18}}>📸</span>
              <span style={{fontSize:13,color:"#F0EDE6",fontWeight:600,flex:1}}>
                Experience shared to the feed!
              </span>
              <button onClick={()=>setShareLive(false)}
                style={{background:"none",border:"none",color:"#9A97A8",fontSize:16}}>×</button>
            </div>
          )}
        </div>

        {/* ── CONTENT ── */}
        <div style={{flex:1,padding:"18px 16px 80px",overflowY:"auto"}}>
          {tab==="map"     && <MapTab onSelectUser={setSelectedUser}/>}
          {tab==="feed"    && <FeedTab posts={feedPosts} onShareClick={()=>setShowShare(true)}/>}
          {tab==="meetups" && <MeetupsTab meetups={liveMeetups} onConvoy={()=>setShowConvoy(true)} onMeetup={()=>setShowMeetup(true)}/>}
          {tab==="profile" && <ProfileTab/>}
        </div>

        {/* ── BOTTOM NAV ── */}
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",
          width:"100%",maxWidth:480,
          background:"rgba(8,8,14,0.96)",backdropFilter:"blur(20px)",
          borderTop:"1px solid rgba(245,176,0,0.1)",
          padding:"8px 0 max(12px, env(safe-area-inset-bottom))",
          display:"flex",zIndex:50}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{flex:1,background:"none",border:"none",padding:"5px 0",
                display:"flex",flexDirection:"column",alignItems:"center",gap:3,
                cursor:"pointer",opacity:tab===t.id?1:0.45,transition:"opacity .2s",
                fontFamily:"Syne,sans-serif"}}>
              <span style={{fontSize:20}}>{t.icon}</span>
              <span style={{fontSize:10,color:tab===t.id?"#F5B000":"#9A97A8",
                fontWeight:tab===t.id?700:400,
                textTransform:"uppercase",letterSpacing:1}}>
                {t.label}
              </span>
              {tab===t.id&&(
                <div style={{width:18,height:2,background:"#E8622A",borderRadius:1}}/>
              )}
            </button>
          ))}
        </div>

        {/* ── MODALS ── */}
        {selectedUser&&(
          <ProfileSheet user={selectedUser}
            onClose={()=>setSelectedUser(null)}
            onMeetup={()=>setShowMeetup(true)}
            onConvoy={()=>setShowConvoy(true)}/>
        )}
        {showConvoy&&(
          <ConvoyModal
            prefill=""
            onClose={()=>setShowConvoy(false)}
            onLaunch={(d)=>{onConvoyLaunch(d);setTab("meetups");}}/>
        )}
        {showMeetup&&(
          <MeetupModal
            onClose={()=>setShowMeetup(false)}
            onCreate={(d)=>{onMeetupCreate(d);setTab("meetups");}}/>
        )}
        {showShare&&(
          <ShareModal
            onClose={()=>setShowShare(false)}
            onShare={(d)=>{onShare(d);setTab("feed");}}/>
        )}
      </div>
    </>
  );
}

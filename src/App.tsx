import React, { useState, useEffect } from "react";
import {
  Shield,
  BookOpen,
  Scale,
  CheckCircle2,
  Server,
  Activity,
  Clock,
  User,
  Cpu,
  Layers,
  Lock,
  ArrowRight,
  Send,
  Calendar,
  Sparkles,
  TrendingUp,
  Terminal,
  Check,
  Sun,
  Moon,
  Menu,
  X,
  AlertTriangle,
  HelpCircle,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import InteractiveMesh from "./components/InteractiveMesh";
import ComplianceHub from "./components/ComplianceHub";
import { ReceiptResponse, DemoLead, AuditPayload } from "./types";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"home" | "solutions" | "compliance" | "pricing" | "playground">("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Playground States
  const [actionDescription, setActionDescription] = useState<string>("Autonomous database copilot detected index fragmentation on 'orders_v2' and rebuilt optimal search indices.");
  const [infraScope, setInfraScope] = useState<string>("AWS us-east-1 Production (PostgreSQL + EKS)");
  const [triggeringActor, setTriggeringActor] = useState<string>("Autonomous Remediation Loop [ID: iT-9981]");
  const [playgroundResponse, setPlaygroundResponse] = useState<ReceiptResponse | null>(null);
  const [playgroundLoading, setPlaygroundLoading] = useState<boolean>(false);
  const [playgroundError, setPlaygroundError] = useState<string | null>(null);
  const [isReceiptVerified, setIsReceiptVerified] = useState<boolean>(false);
  const [verifyingReceipt, setVerifyingReceipt] = useState<boolean>(false);

  // ROI Calculator States
  const [aiAgentsCount, setAiAgentsCount] = useState<number>(12);
  const [manualAuditCost, setManualAuditCost] = useState<number>(2500);
  const [quarterlyReports, setQuarterlyReports] = useState<number>(4);

  // Demo Scheduler States
  const [demoStep, setDemoStep] = useState<number>(1);
  const [demoLead, setDemoLead] = useState<DemoLead>({
    fullName: "",
    email: "",
    companyName: "",
    companySize: "SMB",
    urgency: "Immediate",
    interestReason: "NIST/EU AI Act Audit Readiness"
  });
  const [demoBooked, setDemoBooked] = useState<boolean>(false);
  const [selectedDemoDate, setSelectedDemoDate] = useState<string>("");
  const [selectedDemoTime, setSelectedDemoTime] = useState<string>("");

  // Presets for the Interactive Playground
  const playgroundPresets = [
    {
      label: "DB Index Optimization",
      desc: "Autonomous database copilot detected index fragmentation on 'orders_v2' and rebuilt optimal search indices.",
      infra: "AWS us-east-1 Production (PostgreSQL + EKS)",
      actor: "Autonomous Remediation Loop [ID: iT-9981]"
    },
    {
      label: "Access Key Rotation",
      desc: "IAM key supervisor identified standard 90-day expiry on 'backup-operator-svc' and rotated cryptographic credentials.",
      infra: "Hybrid Cloud Cluster (GCP + Vault Server)",
      actor: "Identity Guardian Agent [Model: Claude-3.5]"
    },
    {
      label: "Rogue IP Blacklist",
      desc: "Sentry Core firewall AI detected rapid multi-endpoint SSH attempts and permanently blacklisted source CIDR 198.51.100.0/24.",
      infra: "On-Prem Core Datacenter (Palo Alto Firewalls)",
      actor: "Security Boundary Pilot [ID: iT-SEC-4]"
    }
  ];

  // Initialize playground on load
  useEffect(() => {
    handleGenerateReceipt();
  }, []);

  // Sync dark mode class on HTML node
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleGenerateReceipt = async () => {
    setPlaygroundLoading(true);
    setPlaygroundError(null);
    setIsReceiptVerified(false);
    try {
      const res = await fetch("/api/generate-receipt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          actionDescription,
          infrastructure: infraScope,
          actorType: triggeringActor
        })
      });

      if (!res.ok) {
        throw new Error("Failed to contact the iTechSmart compliance core engine.");
      }

      const data = await res.json();
      setPlaygroundResponse(data);
    } catch (err: any) {
      setPlaygroundError(err.message || "An unexpected error occurred during receipt synthesis.");
    } finally {
      setPlaygroundLoading(false);
    }
  };

  const handleVerifyReceipt = () => {
    setVerifyingReceipt(true);
    setTimeout(() => {
      setVerifyingReceipt(false);
      setIsReceiptVerified(true);
    }, 1500);
  };

  const selectPreset = (preset: typeof playgroundPresets[0]) => {
    setActionDescription(preset.desc);
    setInfraScope(preset.infra);
    setTriggeringActor(preset.actor);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoLead.fullName || !demoLead.email || !demoLead.companyName) {
      alert("Please fill in all primary information fields.");
      return;
    }
    setDemoStep(2);
  };

  const handleConfirmBooking = () => {
    if (!selectedDemoDate || !selectedDemoTime) {
      alert("Please select a date and time slot for your briefing.");
      return;
    }
    setDemoBooked(true);
  };

  // Automated ROI Metrics
  const calculatedLegacyCost = (aiAgentsCount * manualAuditCost) + (quarterlyReports * 15000);
  const calculatedProofLinkCost = Math.round(calculatedLegacyCost * 0.12);
  const totalSavings = calculatedLegacyCost - calculatedProofLinkCost;

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-500 overflow-x-hidden ${isDarkMode ? "bg-[#050508] text-white" : "bg-slate-50 text-slate-900"}`}>
      
      {/* Background Mesh Overlay */}
      <div className="absolute inset-0 h-[800px] z-0 overflow-hidden pointer-events-none">
        <InteractiveMesh isDarkMode={isDarkMode} />
        {/* Soft atmospheric radial gradient backdrops */}
        <div className="absolute top-[-20%] left-[-15%] w-[600px] h-[600px] bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 dark:bg-indigo-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Primary Brand Navigation Header */}
      <nav className={`sticky top-0 z-50 border-b transition-all duration-300 backdrop-blur-md ${isDarkMode ? "bg-[#050508]/85 border-white/5" : "bg-white/80 border-purple-500/10 shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("home")}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <div className="w-5 h-5 border-2 border-white rounded-md transform rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-display font-extrabold tracking-tight">
              iTechSmart<span className="text-purple-500 underline decoration-2 underline-offset-4 font-mono font-medium">.Inc</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold">
            <button
              onClick={() => setActiveTab("home")}
              className={`transition-colors py-1.5 px-3 rounded-lg ${activeTab === "home" ? "text-purple-500 dark:text-purple-400 font-bold bg-purple-500/5" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
            >
              ProofLink™ Core
            </button>
            <button
              onClick={() => setActiveTab("solutions")}
              className={`transition-colors py-1.5 px-3 rounded-lg ${activeTab === "solutions" ? "text-purple-500 dark:text-purple-400 font-bold bg-purple-500/5" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
            >
              Next-Gen Observability
            </button>
            <button
              onClick={() => setActiveTab("compliance")}
              className={`transition-colors py-1.5 px-3 rounded-lg ${activeTab === "compliance" ? "text-purple-500 dark:text-purple-400 font-bold bg-purple-500/5" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
            >
              Regulatory Shield
            </button>
            <button
              onClick={() => setActiveTab("pricing")}
              className={`transition-colors py-1.5 px-3 rounded-lg ${activeTab === "pricing" ? "text-purple-500 dark:text-purple-400 font-bold bg-purple-500/5" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
            >
              ROI & Pricing
            </button>
            <button
              onClick={() => setActiveTab("playground")}
              className={`transition-colors py-1.5 px-3 rounded-lg font-mono text-xs flex items-center gap-1.5 ${activeTab === "playground" ? "text-purple-500 dark:text-purple-400 font-bold bg-purple-500/5 border border-purple-500/20" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-transparent"}`}
            >
              <Terminal className="w-3.5 h-3.5" /> Playground
            </button>
          </div>

          {/* Right Header Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-desktop"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border transition-all duration-300 ${isDarkMode ? "bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10" : "bg-slate-100 border-purple-500/10 text-purple-600 hover:bg-slate-200"}`}
              title="Toggle Theme Presets"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              id="nav-cta-demo-desktop"
              onClick={() => {
                setActiveTab("pricing");
                setTimeout(() => {
                  const demoEl = document.getElementById("demo-scheduler-module");
                  if (demoEl) demoEl.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-full transition-all shadow-md shadow-purple-600/15 hover:shadow-purple-600/30 transform hover:scale-[1.02]"
            >
              Book Briefing
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              id="theme-toggle-mobile"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border ${isDarkMode ? "bg-white/5 border-white/10 text-yellow-400" : "bg-slate-100 border-purple-500/10 text-purple-600"}`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border ${isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-slate-100 border-purple-500/10 text-slate-800"}`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-b overflow-hidden relative z-40 ${isDarkMode ? "bg-[#0c0c12] border-white/5" : "bg-white border-purple-500/10"}`}
          >
            <div className="px-6 py-8 space-y-4 flex flex-col">
              <button
                onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }}
                className={`text-left py-2 font-semibold ${activeTab === "home" ? "text-purple-500" : "text-slate-500 dark:text-slate-400"}`}
              >
                ProofLink™ Core
              </button>
              <button
                onClick={() => { setActiveTab("solutions"); setMobileMenuOpen(false); }}
                className={`text-left py-2 font-semibold ${activeTab === "solutions" ? "text-purple-500" : "text-slate-500 dark:text-slate-400"}`}
              >
                Next-Gen Observability
              </button>
              <button
                onClick={() => { setActiveTab("compliance"); setMobileMenuOpen(false); }}
                className={`text-left py-2 font-semibold ${activeTab === "compliance" ? "text-purple-500" : "text-slate-500 dark:text-slate-400"}`}
              >
                Regulatory Shield
              </button>
              <button
                onClick={() => { setActiveTab("pricing"); setMobileMenuOpen(false); }}
                className={`text-left py-2 font-semibold ${activeTab === "pricing" ? "text-purple-500" : "text-slate-500 dark:text-slate-400"}`}
              >
                ROI & Pricing
              </button>
              <button
                onClick={() => { setActiveTab("playground"); setMobileMenuOpen(false); }}
                className={`text-left py-2 font-semibold font-mono text-xs ${activeTab === "playground" ? "text-purple-500" : "text-slate-500 dark:text-slate-400"}`}
              >
                ⚡ Interactive Playground
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveTab("pricing");
                  setTimeout(() => {
                    const demoEl = document.getElementById("demo-scheduler-module");
                    if (demoEl) demoEl.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-center"
              >
                Book Live Briefing
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 relative z-10">
        
        {/* VIEW: HOME PAGE */}
        {activeTab === "home" && (
          <div className="space-y-24">
            
            {/* HERO MODULE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Hero Pitch */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-purple-500/30 bg-purple-500/10 text-purple-400 dark:text-purple-300">
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                  THE NEW SERVICENOW, DATADOG & DYNATRACE
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-display font-extrabold tracking-tighter leading-[1.05] text-slate-900 dark:text-white">
                  AI INTEGRITY, <br />
                  <span className="liquid-neon-text">CRYPTO-VERIFIED.</span>
                </h1>

                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                  Legacy monitoring is blind to autonomous agents. <strong>iTechSmart ProofLink™</strong> provides instant, audit-grade SHA-256 cryptographic receipts mapping <strong>every single action, reasoning step, and infrastructure change</strong> your AI triggers. Perfect SLA and total compliance compliance, automated.
                </p>

                {/* Hero CTA Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={() => setActiveTab("playground")}
                    className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transform hover:translate-y-[-2px]"
                  >
                    Test Live Playground <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveTab("compliance")}
                    className="px-8 py-4 bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-white font-bold rounded-xl backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-center"
                  >
                    Read Compliance Mapping
                  </button>
                </div>

                {/* Compliance Target Badges */}
                <div className="flex items-center gap-6 pt-4 border-t border-slate-200 dark:border-white/5 max-w-lg">
                  <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-slate-400 dark:text-gray-500">Regulatory Guard:</span>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5">NIST AI RMF</span>
                    <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5">EU AI Act</span>
                    <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5">CMMC L2</span>
                  </div>
                </div>
              </div>

              {/* Right Column Interactive Dynamic Proof Preview Card */}
              <div className="lg:col-span-5 flex justify-center relative">
                
                {/* Visual Glass Wrapper */}
                <div className={`w-full max-w-md p-6 rounded-[32px] shadow-2xl relative overflow-hidden group transition-all duration-500 border ${isDarkMode ? "glass-panel text-white border-white/10" : "glass-panel-light text-slate-800 border-purple-500/20"}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 space-y-5">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-4 border-slate-200 dark:border-white/10">
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-gray-400">PROOF-LINK CORE ACTIVE</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">ID: iT-AUDIT-992</span>
                    </div>

                    {/* Simulation logs display */}
                    <div className="space-y-3.5">
                      <div className="p-4 bg-slate-100/60 dark:bg-black/40 rounded-2xl border border-slate-200/50 dark:border-white/5 space-y-2">
                        <div className="flex justify-between text-[10px] text-slate-400 dark:text-gray-500 font-mono">
                          <span>TRIGGER_AGENT_ACTION</span>
                          <span>UTC 13:06:51</span>
                        </div>
                        <div className="text-sm font-bold text-purple-950 dark:text-purple-200">
                          Automated VPC Ingress Rules Updated
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 bg-slate-200/40 dark:bg-white/5 p-2 rounded truncate">
                          SHA-256: 8bf6c8b9b2c3a5fde8e92c1c91ff991d31a55b248ea0c72c8d20
                        </div>
                      </div>

                      {/* Every What When Where Why and Who */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-xl border border-slate-200/50 dark:border-white/5">
                          <div className="text-[9px] text-slate-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">WHAT</div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200">Ingress port 443 restricted to verified subnets.</div>
                        </div>
                        <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-xl border border-slate-200/50 dark:border-white/5">
                          <div className="text-[9px] text-slate-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">WHERE</div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200">GCP Cluster VPC-3</div>
                        </div>
                        <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-xl border border-slate-200/50 dark:border-white/5">
                          <div className="text-[9px] text-slate-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">WHO</div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200">AutoShield AI [Agent 9]</div>
                        </div>
                        <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-xl border border-slate-200/50 dark:border-white/5">
                          <div className="text-[9px] text-slate-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">WHY</div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200">Anomalous API request burst.</div>
                        </div>
                      </div>

                      {/* Audit Score tracker */}
                      <div className="pt-2">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="font-semibold text-slate-400 dark:text-slate-500">NIST GV-1.2 Mapping</span>
                          <span className="text-emerald-500 font-bold font-mono">SECURELY COMPLIANT</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 w-full animate-pulse"></div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Ambient revolving graphics */}
                <div className="absolute -top-10 -right-10 w-52 h-52 border border-purple-500/10 rounded-full animate-spin-slow pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />
              </div>

            </div>

            {/* INTRO COMPARATIVE VALUE SECTION - "Why iTechSmart" */}
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
                  Replacing the Legacy Guard for the <span className="liquid-neon-text">Artificial Intelligence Era</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  ServiceNow manages workflows. DataDog indexes system metrics. Dynatrace traces transactions. But when a deep neural model autonomously changes code, alters firewalls, or drops databases, classic tools are blind. ProofLink is your cryptographic source of truth.
                </p>
              </div>

              {/* Grid cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className={`p-8 rounded-3xl border transition-all duration-300 ${isDarkMode ? "bg-white/5 border-white/5 hover:border-purple-500/30" : "bg-white border-purple-500/10 shadow-sm hover:border-purple-500/30"}`}>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6">
                    <Server className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">ServiceNow Alternative</h3>
                  <div className="text-xs uppercase font-mono text-purple-400 mb-4 font-bold">Cognitive Decisions vs. Manual Tickets</div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Legally-binding machine activities happen too fast for manual ITIL workflows. ProofLink synthesizes real-time decisions directly into compliant audit registries instantaneously.
                  </p>
                </div>

                <div className={`p-8 rounded-3xl border transition-all duration-300 ${isDarkMode ? "bg-white/5 border-white/5 hover:border-purple-500/30" : "bg-white border-purple-500/10 shadow-sm hover:border-purple-500/30"}`}>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">DataDog Alternative</h3>
                  <div className="text-xs uppercase font-mono text-purple-400 mb-4 font-bold">Audit-Grade Traceability vs. Raw Metrics</div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    CPU logs and load averages don't record model prompts or neural decision parameters. ProofLink captures complete system intentions alongside raw performance outputs.
                  </p>
                </div>

                <div className={`p-8 rounded-3xl border transition-all duration-300 ${isDarkMode ? "bg-white/5 border-white/5 hover:border-purple-500/30" : "bg-white border-purple-500/10 shadow-sm hover:border-purple-500/30"}`}>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">Dynatrace Alternative</h3>
                  <div className="text-xs uppercase font-mono text-purple-400 mb-4 font-bold">SHA-256 Receipts vs. Standard Stacktraces</div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Don't guess what your autonomous agents did. Every API transaction generates a cryptographic assertion hash stored securely on an immutable digital ledger.
                  </p>
                </div>

              </div>
            </div>

            {/* INTERACTIVE PLAYGROUND TEASER CARD */}
            <div className={`p-8 md:p-12 rounded-[32px] border relative overflow-hidden ${isDarkMode ? "bg-gradient-to-br from-purple-950/20 to-indigo-950/20 border-white/5" : "bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border-purple-500/25 shadow-md"}`}>
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-6 space-y-6">
                  <span className="px-3 py-1 bg-purple-500/15 border border-purple-500/35 rounded-full text-[10px] font-mono font-bold tracking-widest text-purple-400">
                    REAL-TIME DEMO EXPERIENCE
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-bold">
                    Experience the <span className="liquid-neon-text">ProofLink™ Engine</span>
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Test how our platform translates complex, black-box autonomous actions into formal compliance structures mapped specifically to NIST, EU, and defense frameworks. Click the portal playground button to synthesize custom logs live.
                  </p>
                  <button
                    onClick={() => setActiveTab("playground")}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono tracking-wider rounded-xl uppercase flex items-center gap-2 transition-all"
                  >
                    Launch Audit Playground <Terminal className="w-4 h-4" />
                  </button>
                </div>
                <div className="lg:col-span-6">
                  <div className="p-5 bg-slate-900/90 border border-purple-500/20 rounded-2xl font-mono text-xs text-slate-300 space-y-4">
                    <div className="flex justify-between items-center text-[10px] text-purple-400 border-b border-white/5 pb-2">
                      <span>VERIFICATION_LEDGER_CONSOLE</span>
                      <span>ACTIVE</span>
                    </div>
                    <div className="space-y-1 bg-black/50 p-3 rounded-lg text-[11px]">
                      <div className="text-emerald-400">✓ Action: "Restricted database user permissions"</div>
                      <div className="text-slate-400">✓ Cryptographic Block Generated</div>
                      <div className="text-slate-400">✓ Hashed state with metadata: SHA-256 verified</div>
                      <div className="text-purple-400 font-bold">✓ NIST AI GV-1.2 Compliance status: SECURED</div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-white/5 p-2 rounded">
                      <Lock className="w-3.5 h-3.5 text-purple-400" />
                      Receipt Immutable: Verified under ISO/IEC 42001
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ICP AUDIENCE SPECIFICS (MSP, SMB, ENTERPRISE, GOV) */}
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h2 className="text-2xl md:text-3xl font-display font-bold">
                  Designed for High-Trust <span className="liquid-neon-text">Sectors</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Whether you are an outsourced service provider, rapid-growth startup, global enterprise, or a government supplier, ProofLink caters to your exact risk posture.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* MSP Card */}
                <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-purple-500/10 shadow-sm"}`}>
                  <div className="text-sm font-bold text-purple-500 mb-2">01. Managed Service Providers</div>
                  <h4 className="text-lg font-bold font-display mb-2 text-slate-800 dark:text-white">Cross-Tenant SLA Assurance</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Deliver AI monitoring tools as a premium upsell value. Keep multi-tenant accounts isolated and secure with specialized multi-tenancy dashboards.
                  </p>
                </div>

                {/* SMB Card */}
                <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-purple-500/10 shadow-sm"}`}>
                  <div className="text-sm font-bold text-purple-500 mb-2">02. Growing SMBs</div>
                  <h4 className="text-lg font-bold font-display mb-2 text-slate-800 dark:text-white">Instant Staff Multiplier</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Deploy secure AI tools with zero compliance overhead. Get instant, automated audit summaries without hiring expensive continuous audit personnel.
                  </p>
                </div>

                {/* Enterprise Card */}
                <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-purple-500/10 shadow-sm"}`}>
                  <div className="text-sm font-bold text-purple-500 mb-2">03. Enterprises</div>
                  <h4 className="text-lg font-bold font-display mb-2 text-slate-800 dark:text-white">SIEM & SOC Compatibility</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Integrate high-frequency proof logs directly into existing DataDog, Splunk, or ServiceNow pipelines. Maintain secure centralized organizational governance.
                  </p>
                </div>

                {/* Gov Card */}
                <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-purple-500/10 shadow-sm"}`}>
                  <div className="text-sm font-bold text-purple-500 mb-2">04. Government Contractors</div>
                  <h4 className="text-lg font-bold font-display mb-2 text-slate-800 dark:text-white">Mandatory Defense Standards</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Satisfy CMMC Level 2 and NIST SP 800-171 controls instantly. Retain tamper-proof cryptographically signed records for external audit inspection.
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* VIEW: NEXT-GEN OBSERVABILITY / SOLUTIONS COMPARATIVE */}
        {activeTab === "solutions" && (
          <div className="space-y-16 py-4">
            
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-purple-500/30 bg-purple-500/10 text-purple-400">
                PRODUCT ARCHITECTURE
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight">
                Continuous AI <span className="liquid-neon-text">Action Accountability</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Discover the engineering backend that powers the ProofLink™ ledger, keeping your systems observable, explainable, and compliant under upcoming 2026 guidelines.
              </p>
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Box 1: Core Cryptographic Anchor (Double size) */}
              <div className={`col-span-1 md:col-span-8 p-8 rounded-3xl border relative overflow-hidden flex flex-col justify-between min-h-[340px] ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-purple-500/10 shadow-sm"}`}>
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-500/10 text-xs font-semibold text-purple-400">
                    <Lock className="w-4 h-4" /> SECURE LEDGER BASE
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-white">SHA-256 Ledger State Anchor</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
                    For every transaction processed by your autonomous AI actors, ProofLink hashes the state variables, model confidence weights, policy files, and physical nodes. Any unauthorized retrospective modifications are instantly exposed during continuous validation cycles.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/5 flex flex-wrap gap-4 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  <span>✓ 100% Tamper Proof</span>
                  <span>✓ ISO/IEC 42001 Standard</span>
                  <span>✓ Low Latency Microsecond Hashes</span>
                </div>
              </div>

              {/* Box 2: Auto Remediation */}
              <div className={`col-span-1 md:col-span-4 p-8 rounded-3xl border flex flex-col justify-between min-h-[340px] ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-purple-500/10 shadow-sm"}`}>
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-500/10 text-xs font-semibold text-purple-400">
                    <Cpu className="w-4 h-4" /> TRIGGER MONITORING
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white">Rogue Loop Blocker</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Set strict boundaries. If an autonomous model enters an infinite looping pattern or attempts un-authorized system configuration updates, ProofLink automatically freezes agent permissions and triggers instant admin rollbacks.
                  </p>
                </div>
                <div className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1 mt-4">
                  Explore Fail-Safe Controls <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Box 3: Five W's */}
              <div className={`col-span-1 md:col-span-4 p-8 rounded-3xl border flex flex-col justify-between min-h-[340px] ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-purple-500/10 shadow-sm"}`}>
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-500/10 text-xs font-semibold text-purple-400">
                    <Clock className="w-4 h-4" /> AUDIT TRANSPARENCY
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white">The Five W's Core</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Most standard systems logs can say <strong>What</strong> happened. ProofLink is the only engine designed specifically to resolve and map <strong>Who, When, Where, and Why</strong>, yielding absolute explainability.
                  </p>
                </div>
                <div className="space-y-1 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  <div>• Who (Model Registry Identifier)</div>
                  <div>• What (System Command Vector)</div>
                  <div>• Where (Target Host Node & Namespace)</div>
                  <div>• Why (Model Neural Logic Weights)</div>
                </div>
              </div>

              {/* Box 4: Multi-Tenant MSP dashboard (Double size) */}
              <div className={`col-span-1 md:col-span-8 p-8 rounded-3xl border relative overflow-hidden flex flex-col justify-between min-h-[340px] ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-purple-500/10 shadow-sm"}`}>
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-500/10 text-xs font-semibold text-purple-400">
                    <Layers className="w-4 h-4" /> MSP ARCHITECTURE
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-white">Multi-Tenant Isolation Dashboard</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
                    Designed with MSP operations in mind. Secure distinct namespaces for hundreds of unique clients. Instantly download client compliance reports ready for audit assessors with a single API call or visual export button.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-200 dark:border-white/5 pt-4 text-xs">
                  <span className="font-semibold text-slate-400 dark:text-slate-500">Cross-tenant isolation status:</span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-500 text-[10px] font-bold">MILITARY-GRADE ENCRYPTION</span>
                </div>
              </div>

            </div>

            {/* Feature Comparatives Table */}
            <div className={`p-8 rounded-[32px] border ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-purple-500/10 shadow-sm"}`}>
              <h3 className="text-xl font-display font-bold mb-6 text-slate-800 dark:text-white text-center">Competitive Comparison Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500 font-bold">
                      <th className="pb-3">Capabilities</th>
                      <th className="pb-3">ProofLink™ Core</th>
                      <th className="pb-3">DataDog Core</th>
                      <th className="pb-3">ServiceNow Core</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-medium text-slate-700 dark:text-slate-300">
                    <tr>
                      <td className="py-4 font-bold">Cryptographic Hashing</td>
                      <td className="py-4 text-purple-500 dark:text-purple-400 font-bold">✓ Yes (SHA-256)</td>
                      <td className="py-4 text-slate-400">✗ No</td>
                      <td className="py-4 text-slate-400">✗ No</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold">Explainable AI (XAI) Mapping</td>
                      <td className="py-4 text-purple-500 dark:text-purple-400 font-bold">✓ Yes (Full Why/Who metrics)</td>
                      <td className="py-4 text-slate-400">✗ No (Standard metrics only)</td>
                      <td className="py-4 text-slate-400">✗ No (Requires manual input)</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold">EU AI Act Category Logic</td>
                      <td className="py-4 text-purple-500 dark:text-purple-400 font-bold">✓ Yes (Automated Assessment)</td>
                      <td className="py-4 text-slate-400">✗ No</td>
                      <td className="py-4 text-slate-400">✗ No</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold">CMMC L2 Secure Audit Generation</td>
                      <td className="py-4 text-purple-500 dark:text-purple-400 font-bold">✓ Yes (Automated CUI controls)</td>
                      <td className="py-4 text-slate-400">✗ No</td>
                      <td className="py-4 text-slate-400">✗ No</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold">Autonomous Agent Integration</td>
                      <td className="py-4 text-purple-500 dark:text-purple-400 font-bold">✓ Yes (Native SDK Hooks)</td>
                      <td className="py-4 text-slate-400">✗ No (Metric scraping only)</td>
                      <td className="py-4 text-slate-400">✗ No (Incident logging only)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* VIEW: COMPLIANCE HUB (NIST, EU AI ACT, CMMC) */}
        {activeTab === "compliance" && (
          <div className="py-4">
            <ComplianceHub isDarkMode={isDarkMode} />
          </div>
        )}

        {/* VIEW: ROI CALCULATOR & TIER PRICING */}
        {activeTab === "pricing" && (
          <div className="space-y-20 py-4">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-purple-500/30 bg-purple-500/10 text-purple-400">
                VALUE & ROI MODELER
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
                Evaluate Your <span className="liquid-neon-text">Automated ROI</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Understand the clear business value and regulatory insurance that iTechSmart provides. Move away from expensive manual audits to instant continuous compliance.
              </p>
            </div>

            {/* ROI Calculator Slider Tool */}
            <div className={`p-8 md:p-12 rounded-[32px] border ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-purple-500/10 shadow-md"}`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Inputs Left */}
                <div className="lg:col-span-6 space-y-6">
                  <h3 className="text-2xl font-display font-bold">Compliance Cost Estimator</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Select your active infrastructure footprint to model manual assessment resource overhead against ProofLink™ automated cryptographic logs.
                  </p>

                  {/* Slider 1 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Active Autonomous AI Agents / Copilots:</span>
                      <span className="text-purple-500 dark:text-purple-400 font-mono font-bold">{aiAgentsCount} Agents</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={aiAgentsCount}
                      onChange={(e) => setAiAgentsCount(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
                    />
                  </div>

                  {/* Input 2 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold block">Est. Cost Per Incident Investigation ($):</label>
                      <input
                        type="number"
                        value={manualAuditCost}
                        onChange={(e) => setManualAuditCost(Number(e.target.value))}
                        className={`w-full p-2.5 rounded-xl border text-xs font-mono font-bold ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white border-purple-500/10 text-slate-800"}`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold block">Quarterly Board Audit Reports Required:</label>
                      <input
                        type="number"
                        value={quarterlyReports}
                        onChange={(e) => setQuarterlyReports(Number(e.target.value))}
                        className={`w-full p-2.5 rounded-xl border text-xs font-mono font-bold ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white border-purple-500/10 text-slate-800"}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Outputs Right */}
                <div className="lg:col-span-6">
                  <div className="p-6 bg-purple-600/10 border border-purple-500/25 rounded-2xl space-y-6 relative overflow-hidden">
                    
                    {/* Visual glowing accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

                    <div className="text-center space-y-1 relative z-10">
                      <div className="text-xs uppercase font-bold tracking-widest text-purple-400">ESTIMATED COMPLIANCE COST REDUCTION</div>
                      <div className="text-4xl md:text-5xl font-mono font-extrabold text-emerald-500 animate-pulse">
                        ${totalSavings.toLocaleString()} / Year
                      </div>
                      <div className="text-[10px] text-slate-400">Estimated Total Operational ROI Saved</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs border-t border-purple-500/20 pt-4 font-mono">
                      <div>
                        <div className="text-slate-400 mb-1">Manual Legacy Audits:</div>
                        <div className="font-bold text-slate-500 dark:text-slate-300 text-sm line-through">${calculatedLegacyCost.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-purple-400 mb-1">ProofLink™ Automation:</div>
                        <div className="font-bold text-purple-500 text-sm">${calculatedProofLinkCost.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="bg-purple-950/40 p-3 rounded-xl text-[10px] text-slate-400 text-center leading-relaxed">
                      ✓ Over <strong>88% reduction</strong> in compliance resource drain. Instant traceability ensures minimal regulatory risk.
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Standard Tier Pricing Matrix */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-display font-bold">Corporate Plan Tiers</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Transparent subscription metrics tailored strictly to company size and audit constraints.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Tier 1: SMB */}
                <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-purple-500/10 shadow-sm"}`}>
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">GROWING SMB</div>
                    <div className="text-3xl font-display font-extrabold text-slate-800 dark:text-white mb-2">$499 <span className="text-xs font-normal text-slate-500">/ mo</span></div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                      Perfect for emerging startups integrating generative AI into automated workflows.
                    </p>
                    <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-white/5 pt-4">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> Up to 3 Autonomous Agents</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> Complete 5-W Trace Logs</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> EU AI Act Classification</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setDemoLead(prev => ({ ...prev, companySize: "SMB" }));
                      const demoEl = document.getElementById("demo-scheduler-module");
                      if (demoEl) demoEl.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-2.5 bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-xs font-bold rounded-xl mt-6 transition-colors"
                  >
                    Select Plan
                  </button>
                </div>

                {/* Tier 2: MSP */}
                <div className="p-6 rounded-2xl border border-purple-500/30 bg-purple-500/5 flex flex-col justify-between relative shadow-lg">
                  <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-purple-600 text-white text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full">
                    MOST POPULAR
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest mb-2">MSP PARTNER</div>
                    <div className="text-3xl font-display font-extrabold text-slate-800 dark:text-white mb-2">$1,250 <span className="text-xs font-normal text-slate-500">/ mo</span></div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                      Built for managed service providers looking to deliver compliance auditing.
                    </p>
                    <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300 border-t border-purple-500/10 pt-4">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> Unlimited Tenants / Customers</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> Multi-Tenant Dashboard</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> Whitelabel Export Reports</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setDemoLead(prev => ({ ...prev, companySize: "MSP" }));
                      const demoEl = document.getElementById("demo-scheduler-module");
                      if (demoEl) demoEl.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl mt-6 transition-all"
                  >
                    Select Plan
                  </button>
                </div>

                {/* Tier 3: Enterprise */}
                <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-purple-500/10 shadow-sm"}`}>
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">ENTERPRISE CORE</div>
                    <div className="text-3xl font-display font-extrabold text-slate-800 dark:text-white mb-2">$2,999 <span className="text-xs font-normal text-slate-500">/ mo</span></div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                      Designed for global scale operations with strict multi-region cloud infrastructures.
                    </p>
                    <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-white/5 pt-4">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> Splunk / Datadog Direct Integrations</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> Continuous Audit Readiness Reports</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> 24/7 Dedicated Compliance Officer</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setDemoLead(prev => ({ ...prev, companySize: "Enterprise" }));
                      const demoEl = document.getElementById("demo-scheduler-module");
                      if (demoEl) demoEl.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-2.5 bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-xs font-bold rounded-xl mt-6 transition-colors"
                  >
                    Select Plan
                  </button>
                </div>

                {/* Tier 4: Government */}
                <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-purple-500/10 shadow-sm"}`}>
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">GOV & MILITARY</div>
                    <div className="text-3xl font-display font-extrabold text-slate-800 dark:text-white mb-2">Custom <span className="text-xs font-normal text-slate-500">Quotes</span></div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                      Mandatory configuration instances satisfying GovCloud and CMMC Level 2 constraints.
                    </p>
                    <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-white/5 pt-4">
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> FedRAMP Moderate/High Enclaves</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> Hardened CMMC Level 2 Audit Vaults</li>
                      <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /> Static IP & Dedicated Air-Gap Hosting</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      setDemoLead(prev => ({ ...prev, companySize: "Government" }));
                      const demoEl = document.getElementById("demo-scheduler-module");
                      if (demoEl) demoEl.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-2.5 bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-xs font-bold rounded-xl mt-6 transition-colors"
                  >
                    Request Briefing
                  </button>
                </div>

              </div>
            </div>

            {/* DEMO SCHEDULER MODULE */}
            <div id="demo-scheduler-module" className="scroll-mt-24 max-w-3xl mx-auto">
              <div className={`p-8 md:p-10 rounded-[32px] border relative overflow-hidden ${isDarkMode ? "bg-gradient-to-br from-indigo-950/25 to-purple-950/25 border-white/5" : "bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border-purple-500/20 shadow-md"}`}>
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />
                
                <div className="space-y-6 relative z-10">
                  <div className="text-center space-y-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-purple-500 dark:text-purple-400 uppercase">CLIENT CONVERSION HUB</span>
                    <h3 className="text-2xl font-display font-bold">Secure Your Custom Briefing</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Our continuous compliance experts will help map your existing autonomous systems architecture to upcoming regulatory standards.
                    </p>
                  </div>

                  {!demoBooked ? (
                    <div>
                      {demoStep === 1 ? (
                        <form onSubmit={handleDemoSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold block text-slate-600 dark:text-slate-300">Your Name:</label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Sarah Connor"
                                value={demoLead.fullName}
                                onChange={(e) => setDemoLead(prev => ({ ...prev, fullName: e.target.value }))}
                                className={`w-full p-3 rounded-xl border text-xs font-medium ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white border-purple-500/25 text-slate-800"}`}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold block text-slate-600 dark:text-slate-300">Corporate Email Address:</label>
                              <input
                                type="email"
                                required
                                placeholder="e.g. s.connor@cyberdyne.com"
                                value={demoLead.email}
                                onChange={(e) => setDemoLead(prev => ({ ...prev, email: e.target.value }))}
                                className={`w-full p-3 rounded-xl border text-xs font-medium ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white border-purple-500/25 text-slate-800"}`}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold block text-slate-600 dark:text-slate-300">Company Name:</label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Cyberdyne Systems"
                                value={demoLead.companyName}
                                onChange={(e) => setDemoLead(prev => ({ ...prev, companyName: e.target.value }))}
                                className={`w-full p-3 rounded-xl border text-xs font-medium ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white border-purple-500/25 text-slate-800"}`}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold block text-slate-600 dark:text-slate-300">ICP Classification Segment:</label>
                              <select
                                value={demoLead.companySize}
                                onChange={(e) => setDemoLead(prev => ({ ...prev, companySize: e.target.value as any }))}
                                className={`w-full p-3 rounded-xl border text-xs font-semibold ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white border-purple-500/25 text-slate-800"}`}
                              >
                                <option value="SMB">Growing Small & Medium Business (SMB)</option>
                                <option value="MSP">Managed Service Provider (MSP)</option>
                                <option value="Enterprise">Large scale Enterprise</option>
                                <option value="Government">Government / Defense Contractor</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-semibold block text-slate-600 dark:text-slate-300">Primary Compliance Goal:</label>
                            <select
                              value={demoLead.interestReason}
                              onChange={(e) => setDemoLead(prev => ({ ...prev, interestReason: e.target.value }))}
                              className={`w-full p-3 rounded-xl border text-xs font-semibold ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white border-purple-500/25 text-slate-800"}`}
                            >
                              <option value="NIST/EU AI Act Audit Readiness">NIST AI RMF & EU AI Act Compliance Readiness</option>
                              <option value="CMMC Level 2 Defense Certification">CMMC Level 2 Defense / Military Alignment</option>
                              <option value="MSP Multi-Tenant SLA Management">MSP Multi-Tenant SLA & Tenant Isolation Management</option>
                              <option value="Autonomous Incident Rollbacks">Autonomous AI Incident Rollback Guardrails</option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                          >
                            Continue to Calendar Slots <Calendar className="w-4 h-4" />
                          </button>
                        </form>
                      ) : (
                        <div className="space-y-4">
                          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs text-purple-400">
                            ✓ Information captured. Select an available slot for your customized technical brief.
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold block">Select Briefing Date:</label>
                              <input
                                type="date"
                                required
                                value={selectedDemoDate}
                                onChange={(e) => setSelectedDemoDate(e.target.value)}
                                min="2026-06-24"
                                className={`w-full p-3 rounded-xl border text-xs font-bold ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white border-purple-500/25 text-slate-800"}`}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-semibold block">Preferred Time Zone Slot:</label>
                              <select
                                value={selectedDemoTime}
                                onChange={(e) => setSelectedDemoTime(e.target.value)}
                                className={`w-full p-3 rounded-xl border text-xs font-bold ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white border-purple-500/25 text-slate-800"}`}
                              >
                                <option value="">-- Choose Slot --</option>
                                <option value="09:00 AM EST">09:00 AM EST (Morning Session)</option>
                                <option value="11:30 AM EST">11:30 AM EST (Midday Session)</option>
                                <option value="02:00 PM EST">02:00 PM EST (Afternoon Session)</option>
                                <option value="04:30 PM EST">04:30 PM EST (Late Briefing)</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex gap-4 pt-4">
                            <button
                              onClick={() => setDemoStep(1)}
                              className="px-4 py-3 bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-xs font-bold rounded-xl transition-colors"
                            >
                              Back
                            </button>
                            <button
                              onClick={handleConfirmBooking}
                              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                            >
                              Confirm Briefing Reservation <Check className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center p-8 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl space-y-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6 animate-bounce" />
                      </div>
                      <h4 className="text-xl font-display font-bold text-slate-800 dark:text-white">Briefing Successfully Confirmed!</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                        We have registered the request for **{demoLead.companyName}**. A detailed calendar invite for **{selectedDemoDate} at {selectedDemoTime}** has been sent to **{demoLead.email}** with preparation steps.
                      </p>
                      <div className="p-3 bg-emerald-950/50 border border-emerald-500/20 text-[10px] text-slate-400 font-mono inline-block rounded-lg">
                        SLA-VERIFICATION-CODE: IT-DEMO-{Math.random().toString(36).substring(7).toUpperCase()}
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setDemoBooked(false);
                            setDemoStep(1);
                            setSelectedDemoDate("");
                            setSelectedDemoTime("");
                          }}
                          className="text-xs text-purple-400 underline hover:text-purple-300"
                        >
                          Book another slot
                        </button>
                      </div>
                    </motion.div>
                  )}

                </div>
              </div>
            </div>

          </div>
        )}

        {/* VIEW: COMPREHENSIVE INTERACTIVE AUDIT PLAYGROUND */}
        {activeTab === "playground" && (
          <div className="space-y-12 py-4">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-purple-500/30 bg-purple-500/10 text-purple-400 font-mono">
                [ LIVE COMPLIANCE SIMULATOR ]
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
                ProofLink™ <span className="liquid-neon-text">Receipt Synthesizer</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Test the precise metadata outputs generated by iTechSmart's real-time core. Model any simulated action inside your infrastructure and dynamically check mapped compliance hashes.
              </p>
            </div>

            {/* Presets Selection bar */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-400 text-center uppercase tracking-wider">SELECT SIMULATED ACTION PRESETS:</div>
              <div className="flex flex-wrap gap-3 justify-center">
                {playgroundPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => selectPreset(preset)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl border transition-all bg-white/5 border-purple-500/15 hover:border-purple-400 text-slate-700 dark:text-slate-300 hover:bg-purple-500/5"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Playground Editor Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column Controls */}
              <div className={`lg:col-span-5 p-6 rounded-3xl border space-y-5 ${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-purple-500/10 shadow-sm"}`}>
                <h3 className="text-lg font-display font-bold">Configure System Event</h3>
                
                {/* Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">1. Autonomous Action Description:</label>
                  <textarea
                    rows={3}
                    value={actionDescription}
                    onChange={(e) => setActionDescription(e.target.value)}
                    placeholder="Describe exactly what action your automated system performed..."
                    className={`w-full p-3 rounded-xl border text-xs font-medium leading-relaxed ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white border-purple-500/25 text-slate-800"}`}
                  />
                  <span className="text-[10px] text-slate-400">Describe what code updates, firewall patches, or database queries the AI resolved.</span>
                </div>

                {/* Scope Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold block text-slate-500 uppercase tracking-wider">2. Infrastructure Scope:</label>
                    <input
                      type="text"
                      value={infraScope}
                      onChange={(e) => setInfraScope(e.target.value)}
                      placeholder="e.g. AWS Multi-Region VPC"
                      className={`w-full p-2.5 rounded-xl border text-xs font-semibold ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white border-purple-500/25 text-slate-800"}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold block text-slate-500 uppercase tracking-wider">3. Triggering Actor:</label>
                    <input
                      type="text"
                      value={triggeringActor}
                      onChange={(e) => setTriggeringActor(e.target.value)}
                      placeholder="e.g. LLM-Copilot-9"
                      className={`w-full p-2.5 rounded-xl border text-xs font-semibold ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white border-purple-500/25 text-slate-800"}`}
                    />
                  </div>
                </div>

                <button
                  onClick={handleGenerateReceipt}
                  disabled={playgroundLoading}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {playgroundLoading ? "Synthesizing Cryptographic State..." : "Generate ProofLink™ Receipt"}
                  <Terminal className="w-4 h-4 animate-pulse" />
                </button>
              </div>

              {/* Right Column Cryptographic Dynamic Receipt */}
              <div className="lg:col-span-7">
                {playgroundLoading && (
                  <div className="p-12 text-center space-y-4">
                    <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs text-slate-400">Communicating with iTechSmart compliance core AI node...</p>
                  </div>
                )}

                {playgroundError && (
                  <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs text-rose-500 text-center">
                    ⚠️ {playgroundError}
                  </div>
                )}

                {!playgroundLoading && !playgroundError && playgroundResponse && (
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-6 md:p-8 rounded-[32px] border relative overflow-hidden ${isDarkMode ? "glass-panel text-white border-white/10" : "glass-panel-light text-slate-800 border-purple-500/25"}`}
                  >
                    {/* Glowing Liquid Glass Watermark */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="space-y-6 relative z-10">
                      
                      {/* Receipt Header Badge */}
                      <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-mono font-bold tracking-widest text-slate-400">PROOF-LINK CRYPTO LEDGER</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-purple-500 dark:text-purple-400">STATUS: VERIFIED</span>
                      </div>

                      {/* SHA-256 Block Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3.5 bg-slate-100/50 dark:bg-black/40 rounded-xl border border-slate-200/50 dark:border-white/5">
                          <span className="text-[9px] text-slate-400 dark:text-gray-500 font-bold block uppercase tracking-wider mb-1">Receipt Hash ID (SHA-256)</span>
                          <span className="text-xs font-mono text-purple-600 dark:text-purple-300 font-bold break-all block">{playgroundResponse.sha256}</span>
                        </div>
                        <div className="p-3.5 bg-slate-100/50 dark:bg-black/40 rounded-xl border border-slate-200/50 dark:border-white/5 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] text-slate-400 dark:text-gray-500 font-bold block uppercase tracking-wider mb-1">Verifier Authorization Signature</span>
                            <span className="text-xs font-mono font-bold text-emerald-500 block">{playgroundResponse.verifierCode}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200 dark:border-white/5 mt-2">
                            Synthesized via {playgroundResponse.isRealAi ? "Gemini-3.5-Flash Audit Node" : "Local Sandbox Compliance Engine"}
                          </div>
                        </div>
                      </div>

                      {/* Every What, When, Where, Why and Who answered */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-display font-bold text-slate-400">Resolution mapping (The 5 W's):</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-xl border border-slate-200/50 dark:border-white/5 space-y-1">
                            <span className="text-[9px] text-slate-400 font-bold block">WHAT</span>
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{playgroundResponse.rawPayload.what}</span>
                          </div>
                          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-xl border border-slate-200/50 dark:border-white/5 space-y-1">
                            <span className="text-[9px] text-slate-400 block font-bold">WHEN</span>
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{playgroundResponse.rawPayload.when}</span>
                          </div>
                          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-xl border border-slate-200/50 dark:border-white/5 space-y-1">
                            <span className="text-[9px] text-slate-400 block font-bold">WHERE</span>
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{playgroundResponse.rawPayload.where}</span>
                          </div>
                          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-xl border border-slate-200/50 dark:border-white/5 space-y-1">
                            <span className="text-[9px] text-slate-400 block font-bold">WHO</span>
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{playgroundResponse.rawPayload.who}</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-xl border border-slate-200/50 dark:border-white/5 space-y-1">
                          <span className="text-[9px] text-slate-400 block font-bold">WHY (Autonomous Reasoning Logic Path)</span>
                          <span className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed block">{playgroundResponse.rawPayload.why}</span>
                        </div>
                      </div>

                      {/* Framework Alignments */}
                      <div className="border-t border-slate-200 dark:border-white/10 pt-4 space-y-3.5">
                        <div className="flex flex-wrap gap-4 text-xs font-semibold">
                          <div className="flex-1 min-w-[150px] p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/10">
                            <div className="text-[9px] text-purple-400 uppercase font-mono tracking-wider mb-1">EU AI ACT RISK</div>
                            <span className="text-slate-800 dark:text-white font-bold">{playgroundResponse.rawPayload.euActCategory}</span>
                          </div>
                          <div className="flex-1 min-w-[150px] p-2.5 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                            <div className="text-[9px] text-indigo-400 uppercase font-mono tracking-wider mb-1">NIST AI RMF CONTROLS</div>
                            <span className="text-slate-800 dark:text-white font-mono text-[10px] block font-bold">
                              {playgroundResponse.rawPayload.nistMapping.join(", ") || "None mapped"}
                            </span>
                          </div>
                          <div className="flex-1 min-w-[150px] p-2.5 rounded-lg bg-pink-500/5 border border-pink-500/10">
                            <div className="text-[9px] text-pink-400 uppercase font-mono tracking-wider mb-1">CMMC LEVEL 2 CONTROLS</div>
                            <span className="text-slate-800 dark:text-white font-mono text-[10px] block font-bold">
                              {playgroundResponse.rawPayload.cmmcControls.join(", ") || "None mapped"}
                            </span>
                          </div>
                        </div>

                        <div className="text-xs p-3.5 bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                          <strong>Executive Compliance Summary:</strong> {playgroundResponse.rawPayload.executiveSummary}
                        </div>
                      </div>

                      {/* Interactive Ledger verification block */}
                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-200 dark:border-white/10 pt-4">
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold font-mono">
                          <Lock className="w-3.5 h-3.5 text-purple-500" /> ISO/IEC 42001 Cryptographic Seal Enabled
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleVerifyReceipt}
                            disabled={verifyingReceipt || isReceiptVerified}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                              isReceiptVerified
                                ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-500"
                                : "bg-purple-600 hover:bg-purple-500 text-white"
                            }`}
                          >
                            {verifyingReceipt ? "Contacting Registry..." : isReceiptVerified ? "✓ Certificate Sealed" : "Verify On-Ledger"}
                          </button>
                        </div>
                      </div>

                      {/* Display Seal Certification */}
                      <AnimatePresence>
                        {isReceiptVerified && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-xl space-y-2 text-xs"
                          >
                            <div className="font-bold flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" /> SECURE SEAL CONFIRMED
                            </div>
                            <p className="leading-relaxed text-[11px]">
                              ProofLink has matched the synthesized SHA-256 receipt against public sovereign ledgers. This signature holds a perfect SLA lock of <strong>100.00% verification</strong> and can be safely printed or attached to formal defense or corporate financial reports.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </motion.div>
                )}
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Corporate footer with compliance tags */}
      <footer className={`border-t py-12 mt-20 relative z-10 text-xs ${isDarkMode ? "bg-[#040406]/95 border-white/5 text-gray-500" : "bg-white border-purple-500/10 text-slate-500 shadow-inner"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-200 dark:border-white/5">
            
            {/* Left */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-white font-extrabold text-xs transform rotate-45">
                  T
                </div>
                <span className="text-lg font-display font-extrabold tracking-tight text-slate-800 dark:text-white">
                  iTechSmart<span className="text-purple-500">.Inc</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed max-w-sm">
                The next-generation observability and accountability core, mapping autonomous neural changes cryptographically for perfect compliance.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="font-bold text-slate-700 dark:text-slate-300">PLATFORM</div>
                <ul className="space-y-1">
                  <li><button onClick={() => setActiveTab("home")} className="hover:text-purple-500">ProofLink™ Core</button></li>
                  <li><button onClick={() => setActiveTab("solutions")} className="hover:text-purple-500">Observability</button></li>
                  <li><button onClick={() => setActiveTab("playground")} className="hover:text-purple-500 font-mono text-[10px]">Playground Console</button></li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="font-bold text-slate-700 dark:text-slate-300">REGULATIONS</div>
                <ul className="space-y-1">
                  <li><button onClick={() => setActiveTab("compliance")} className="hover:text-purple-500">NIST AI RMF</button></li>
                  <li><button onClick={() => setActiveTab("compliance")} className="hover:text-purple-500">EU AI Act</button></li>
                  <li><button onClick={() => setActiveTab("compliance")} className="hover:text-purple-500">CMMC Level 2</button></li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="font-bold text-slate-700 dark:text-slate-300">COGNITIVE TRUST</div>
                <ul className="space-y-1">
                  <li><span className="block">SLA Guaranteed</span></li>
                  <li><span className="block">ISO/IEC 42001</span></li>
                  <li><span className="block">SOC 2 Type II</span></li>
                </ul>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-wider uppercase font-semibold">
            <div>&copy; 2026 iTechSmart Inc. Global Infrastructure Guard. All Rights Reserved.</div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span>Sovereign Ledger Sync Operational</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

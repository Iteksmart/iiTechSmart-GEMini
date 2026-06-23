import { useState } from "react";
import { Shield, BookOpen, AlertTriangle, Scale, CheckCircle2, FileText, ChevronRight, Download } from "lucide-react";
import { motion } from "motion/react";

interface ComplianceHubProps {
  isDarkMode: boolean;
}

export default function ComplianceHub({ isDarkMode }: ComplianceHubProps) {
  const [activeTab, setActiveTab] = useState<"eu" | "nist" | "cmmc">("eu");
  const [checklist, setChecklist] = useState({
    auditLogs: false,
    actorIdentified: false,
    decisionExplainable: false,
    tamperProofStorage: false,
    slaAutomated: false,
    continuousMonitoring: false,
  });

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const scorePercentage = Math.round((checkedCount / Object.keys(checklist).length) * 100);

  return (
    <div id="compliance-hub-page" className="space-y-16 py-4">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-purple-500/30 bg-purple-500/10 text-purple-400 dark:text-purple-300"
        >
          <Shield className="w-4 h-4 text-purple-400" />
          Enterprise & Government Regulatory Shield
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight"
        >
          Meet Critical <span className="liquid-neon-text">Global AI Mandates</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
        >
          ProofLink provides MSPs, SMBs, enterprises, and defense contractors with a decentralized, cryptographically verifiable ledger that guarantees compliance with the EU AI Act, NIST AI Risk Management Framework, and CMMC v2.
        </motion.p>
      </div>

      {/* Grid: Nav Tabs and Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar / Buttons */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
          <button
            id="tab-btn-eu"
            onClick={() => setActiveTab("eu")}
            className={`flex-1 lg:flex-none flex items-center gap-3 px-5 py-4 rounded-xl text-left font-display font-semibold transition-all duration-300 ${
              activeTab === "eu"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            <Scale className="w-5 h-5 flex-shrink-0" />
            <div className="hidden sm:block lg:block">
              <div className="text-sm">EU AI Act</div>
              <div className="text-[10px] opacity-75 font-normal">Risk Classification</div>
            </div>
            <span className="sm:hidden lg:hidden text-xs">EU AI Act</span>
          </button>

          <button
            id="tab-btn-nist"
            onClick={() => setActiveTab("nist")}
            className={`flex-1 lg:flex-none flex items-center gap-3 px-5 py-4 rounded-xl text-left font-display font-semibold transition-all duration-300 ${
              activeTab === "nist"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            <BookOpen className="w-5 h-5 flex-shrink-0" />
            <div className="hidden sm:block lg:block">
              <div className="text-sm">NIST AI RMF</div>
              <div className="text-[10px] opacity-75 font-normal">Risk Management</div>
            </div>
            <span className="sm:hidden lg:hidden text-xs">NIST RMF</span>
          </button>

          <button
            id="tab-btn-cmmc"
            onClick={() => setActiveTab("cmmc")}
            className={`flex-1 lg:flex-none flex items-center gap-3 px-5 py-4 rounded-xl text-left font-display font-semibold transition-all duration-300 ${
              activeTab === "cmmc"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            <Shield className="w-5 h-5 flex-shrink-0" />
            <div className="hidden sm:block lg:block">
              <div className="text-sm">CMMC Level 2</div>
              <div className="text-[10px] opacity-75 font-normal">Government & Defense</div>
            </div>
            <span className="sm:hidden lg:hidden text-xs">CMMC L2</span>
          </button>
        </div>

        {/* Tab content space */}
        <div className="lg:col-span-9">
          <div className="glass-panel-heavy p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 relative overflow-hidden">
            {/* Ambient Purple glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />

            {activeTab === "eu" && (
              <motion.div
                key="eu-content"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
                  <div className="p-3 bg-purple-100 dark:bg-purple-950/60 rounded-xl text-purple-600 dark:text-purple-400">
                    <Scale className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold">The EU AI Act</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Regulation mapping & compliance enforcement starting 2026</p>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  The European Union AI Act classifies artificial intelligence applications into four risk tiers. Substantial fines of up to <strong>€35 Million or 7% of global turnover</strong> apply for infractions. ProofLink operates as a continuous compliance engine to map and secure automated activities.
                </p>

                {/* Risk Tiers cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-rose-500 font-bold mb-2 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      HIGH RISK (Annex III)
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                      Includes AI operating in critical infrastructure, recruitment, biometrics, banking, or credit profiling.
                    </p>
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                      <strong>Requirement:</strong> Detailed documentation, high logging traceability, and automated risk metrics.
                      <div className="mt-1.5 text-purple-600 dark:text-purple-400">
                        ⚡ <strong>ProofLink Solution:</strong> Automated SHA-256 logs recording full 5-Ws (Who, What, When, Where, Why) immutably.
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-amber-500 font-bold mb-2 text-sm">
                      <Scale className="w-4 h-4" />
                      LIMITED RISK
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                      Systems interacting with humans, like generative chat assistants, system copilots, or automated customer systems.
                    </p>
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                      <strong>Requirement:</strong> User must know they are interacting with an AI. AI outcomes must be explainable.
                      <div className="mt-1.5 text-purple-600 dark:text-purple-400">
                        ⚡ <strong>ProofLink Solution:</strong> Real-time visual compliance labels and dynamic explainability (XAI) receipts.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-950/30 border border-purple-500/20 rounded-2xl p-5 text-sm text-slate-700 dark:text-slate-300">
                  <h4 className="font-bold text-purple-400 mb-2">How ProofLink Enforces EU AI Act Compliance</h4>
                  <ul className="space-y-2 list-disc pl-5 text-xs">
                    <li>Creates un-falsifiable record archives mapping AI systems to critical model registry identifiers.</li>
                    <li>Automates Explainable AI (XAI) mapping by converting deep learning nodes into cryptographic statements of intent.</li>
                    <li>Supports immediate external auditing via dynamic, secure compliance portals with Zero-Knowledge verification.</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === "nist" && (
              <motion.div
                key="nist-content"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
                  <div className="p-3 bg-purple-100 dark:bg-purple-950/60 rounded-xl text-purple-600 dark:text-purple-400">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold">NIST AI RMF 1.0</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">National Institute of Standards & Technology AI Risk Management Framework</p>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Developed to improve the trustworthy deployment of AI systems, the NIST framework focuses on four primary organizational cores: <strong>Govern, Map, Measure, and Manage</strong>. ProofLink translates these conceptual standards into technical realities directly on your infrastructure.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-bold text-sm text-purple-600 dark:text-purple-400">GOVERN FUNCTION (GV-1.2)</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Establish rigorous organizational policies and tracing of system inputs, model states, and actions.
                    </p>
                    <div className="text-xs pt-2 font-mono text-slate-700 dark:text-slate-300">
                      → ProofLink registers actor certificates to prevent rogue/shadow AI execution.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-bold text-sm text-purple-600 dark:text-purple-400">MEASURE FUNCTION (MS-2.3)</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Validate system outputs dynamically and maintain absolute audit trails of AI model decision boundaries.
                    </p>
                    <div className="text-xs pt-2 font-mono text-slate-700 dark:text-slate-300">
                      → ProofLink hashes input, output, weights, and timestamps into immutable block receipts.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-bold text-sm text-purple-600 dark:text-purple-400">MAP FUNCTION (MP-1.5)</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Categorize internal dependencies and identify technical context where the AI agent holds access to infrastructure.
                    </p>
                    <div className="text-xs pt-2 font-mono text-slate-700 dark:text-slate-300">
                      → ProofLink logs exact endpoints, subnets, and databases touched by AI systems.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-bold text-sm text-purple-600 dark:text-purple-400">MANAGE FUNCTION (MG-1.2)</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Respond quickly to AI failures or anomalies and rollback systems with clean state verification logs.
                    </p>
                    <div className="text-xs pt-2 font-mono text-slate-700 dark:text-slate-300">
                      → ProofLink triggers automated alerts and blocks un-verified AI agent updates.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "cmmc" && (
              <motion.div
                key="cmmc-content"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
                  <div className="p-3 bg-purple-100 dark:bg-purple-950/60 rounded-xl text-purple-600 dark:text-purple-400">
                    <Shield className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold">CMMC Level 2 & Gov Contracts</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Cybersecurity Maturity Model Certification for Defense and Aerospace</p>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  For organizations working with the US Department of Defense (DoD), satisfying **CMMC Level 2** (mapping to NIST SP 800-171) is a mandatory milestone. When AI agents operate on systems containing Controlled Unclassified Information (CUI), every single machine action must be rigorously audited.
                </p>

                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <h4 className="font-display font-semibold text-purple-600 dark:text-purple-400">ProofLink Direct Mapping to CMMC Controls:</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-xs font-semibold block">CMMC AU.L2-3.3.1 (Audit Records)</strong>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Create and retain system audit logs. ProofLink automates the logging of all AI autonomous triggers, capturing context and parameters with zero operator overhead.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-xs font-semibold block">CMMC AU.L2-3.3.2 (Audit Events)</strong>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Identify system actions. ProofLink maps specifically "Who, What, When, Where, and Why" of machine models, providing defense audit logs that instantly clarify automated behavior.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-xs font-semibold block">CMMC AU.L2-3.3.5 (Audit Generation)</strong>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Create audit logs that are secure from tampering. ProofLink records cryptographic SHA-256 state locks stored on secure centralized cloud environments or distributed ledgers, rendering retroactive manipulation mathematically impossible.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-l-4 border-purple-500 bg-purple-500/5 text-xs text-slate-500 dark:text-slate-400">
                  <strong>Notice:</strong> Failing CMMC audit trails instantly disqualifies government suppliers. ProofLink provides the precise cryptographic evidence defense assessors require.
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Compliance Checklist Estimator tool */}
      <div className="glass-panel p-8 md:p-10 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-5">
            <h3 className="text-2xl font-display font-bold">Assess Your AI Compliance Posture</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              MSP, Enterprise, or Government Contractor? Toggle your existing logging capabilities to estimate your compliance readiness score under upcoming 2026 mandates.
            </p>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimated Score</div>
              <div className="flex items-end gap-3">
                <span className={`text-5xl font-mono font-bold ${scorePercentage > 80 ? 'text-emerald-500' : scorePercentage > 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                  {scorePercentage}%
                </span>
                <span className="text-xs text-slate-400 mb-1">Audit Readiness</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${scorePercentage}%` }}
                />
              </div>
            </div>

            {scorePercentage === 100 ? (
              <div className="text-xs p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
                ✓ Perfect score! You satisfy basic logging. Secure these pipelines with <strong>ProofLink Cryptography</strong> to prevent internal log tampering.
              </div>
            ) : (
              <div className="text-xs p-3 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl">
                ⚠️ Compliance Gap Detected. ProofLink can automate all unchecked parameters out-of-the-box in under 20 minutes of integration.
              </div>
            )}
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => toggleChecklist("auditLogs")}
              className={`p-4 rounded-xl text-left border flex items-start gap-3 transition-all duration-300 ${
                checklist.auditLogs
                  ? "bg-purple-500/10 border-purple-500 text-purple-700 dark:text-purple-300"
                  : "bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${checklist.auditLogs ? 'text-purple-500' : 'text-slate-400'}`} />
              <div>
                <div className="text-xs font-bold font-display">System Action Logging</div>
                <div className="text-[10px] opacity-75 mt-0.5">Logs of automated actions are saved securely.</div>
              </div>
            </button>

            <button
              onClick={() => toggleChecklist("actorIdentified")}
              className={`p-4 rounded-xl text-left border flex items-start gap-3 transition-all duration-300 ${
                checklist.actorIdentified
                  ? "bg-purple-500/10 border-purple-500 text-purple-700 dark:text-purple-300"
                  : "bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${checklist.actorIdentified ? 'text-purple-500' : 'text-slate-400'}`} />
              <div>
                <div className="text-xs font-bold font-display">Strict Actor Identification</div>
                <div className="text-[10px] opacity-75 mt-0.5">Every AI task correlates to a certified model registry.</div>
              </div>
            </button>

            <button
              onClick={() => toggleChecklist("decisionExplainable")}
              className={`p-4 rounded-xl text-left border flex items-start gap-3 transition-all duration-300 ${
                checklist.decisionExplainable
                  ? "bg-purple-500/10 border-purple-500 text-purple-700 dark:text-purple-300"
                  : "bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${checklist.decisionExplainable ? 'text-purple-500' : 'text-slate-400'}`} />
              <div>
                <div className="text-xs font-bold font-display">Explainability (XAI) Mapping</div>
                <div className="text-[10px] opacity-75 mt-0.5">Can detail exactly WHY an AI made any specific infrastructure change.</div>
              </div>
            </button>

            <button
              onClick={() => toggleChecklist("tamperProofStorage")}
              className={`p-4 rounded-xl text-left border flex items-start gap-3 transition-all duration-300 ${
                checklist.tamperProofStorage
                  ? "bg-purple-500/10 border-purple-500 text-purple-700 dark:text-purple-300"
                  : "bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${checklist.tamperProofStorage ? 'text-purple-500' : 'text-slate-400'}`} />
              <div>
                <div className="text-xs font-bold font-display">Tamper-Proof Storage</div>
                <div className="text-[10px] opacity-75 mt-0.5">Logs are protected with decentralized SHA-256 hashing.</div>
              </div>
            </button>

            <button
              onClick={() => toggleChecklist("slaAutomated")}
              className={`p-4 rounded-xl text-left border flex items-start gap-3 transition-all duration-300 ${
                checklist.slaAutomated
                  ? "bg-purple-500/10 border-purple-500 text-purple-700 dark:text-purple-300"
                  : "bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${checklist.slaAutomated ? 'text-purple-500' : 'text-slate-400'}`} />
              <div>
                <div className="text-xs font-bold font-display">Automated SLA Validation</div>
                <div className="text-[10px] opacity-75 mt-0.5">AI performance metrics are evaluated autonomously in real time.</div>
              </div>
            </button>

            <button
              onClick={() => toggleChecklist("continuousMonitoring")}
              className={`p-4 rounded-xl text-left border flex items-start gap-3 transition-all duration-300 ${
                checklist.continuousMonitoring
                  ? "bg-purple-500/10 border-purple-500 text-purple-700 dark:text-purple-300"
                  : "bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${checklist.continuousMonitoring ? 'text-purple-500' : 'text-slate-400'}`} />
              <div>
                <div className="text-xs font-bold font-display">Continuous Audit Trail</div>
                <div className="text-[10px] opacity-75 mt-0.5">Compliance records are compiled 24/7 with zero interruption.</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

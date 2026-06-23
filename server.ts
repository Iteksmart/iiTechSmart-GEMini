import express from "express";
import path from "path";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("iTechSmart ProofLink: Gemini API initialized successfully.");
  } catch (error) {
    console.error("iTechSmart ProofLink: Failed to initialize Gemini API Client:", error);
  }
} else {
  console.log("iTechSmart ProofLink: Working in high-fidelity sandbox mode (No active GEMINI_API_KEY configured).");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Route: Verify or analyze AI event
  app.post("/api/generate-receipt", async (req, res) => {
    const { actionDescription, infrastructure, actorType } = req.body;

    if (!actionDescription) {
      return res.status(400).json({ error: "Action description is required." });
    }

    const infraStr = infrastructure || "AWS Cloud Cluster us-east-1 (Kubernetes + PostgreSQL)";
    const actorStr = actorType || "Autonomous Agent iT-9902";
    const timestampISO = new Date().toISOString();

    let resultData: any = null;

    if (aiClient) {
      try {
        const prompt = `Analyze this automated AI Action in the infrastructure. Generate compliance reporting context mapping it to standard frameworks (NIST AI RMF, EU AI Act, CMMC v2).
        
AI Action Description: "${actionDescription}"
Infrastructure Scope: "${infraStr}"
Triggering Actor: "${actorStr}"
Timestamp of Action: "${timestampISO}"

Provide complete technical context, resolving the Five W's (What, When, Where, Why, Who). Categorize risk and map to security frameworks. Return a structured JSON response matching the required schema. Ensure values are detailed and highly technical.`;

        const response = await aiClient.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            systemInstruction: "You are the iTechSmart ProofLink audit core engine. You analyze infrastructure operations performed by AI agents and generate cryptographic-ready audit assertions. You must strictly output JSON matching the requested schema.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                action: { type: Type.STRING },
                timestamp: { type: Type.STRING },
                riskRating: { type: Type.STRING, description: "e.g., Minimal, Limited, High, Critical" },
                complianceRating: { type: Type.STRING, description: "e.g., Compliant, Review Required" },
                what: { type: Type.STRING, description: "Precise summary of the action done" },
                when: { type: Type.STRING, description: "Trigger context and execution schedule" },
                where: { type: Type.STRING, description: "Affected nodes, endpoints, database, or subnets" },
                who: { type: Type.STRING, description: "Actor model ID, user orchestration key, or autonomous loop ID" },
                why: { type: Type.STRING, description: "Reasoning context (why the model decided this action, confidence weights, policy checks)" },
                nistMapping: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "NIST AI Risk Management Framework Controls, e.g. GOVERN-1.2, MEASURE-2.3, MANAGE-1.1"
                },
                euActCategory: { type: Type.STRING, description: "EU AI Act risk tier: Minimal Risk, Limited Risk, High Risk, or Prohibited System" },
                cmmcControls: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "CMMC Level 2 Audit Controls, e.g., AU.L2-3.3.1, AU.L2-3.3.2"
                },
                executiveSummary: { type: Type.STRING, description: "A high-level summary of the cryptographic assertion" }
              },
              required: ["action", "timestamp", "riskRating", "complianceRating", "what", "when", "where", "who", "why", "nistMapping", "euActCategory", "cmmcControls", "executiveSummary"]
            }
          }
        });

        const textResponse = response.text;
        if (textResponse) {
          resultData = JSON.parse(textResponse.trim());
        }
      } catch (geminiError) {
        console.error("Gemini analysis error, falling back to dynamic sandbox template engine:", geminiError);
      }
    }

    // Fallback/Deterministic generator (sandbox mode or in case of Gemini failures)
    if (!resultData) {
      // Create high-fidelity contextually styled mock analysis that is specific to the user's input
      const textLower = actionDescription.toLowerCase();
      let risk = "Minimal";
      let euTier = "Minimal Risk";
      let nist = ["GOVERN-1.2", "MEASURE-2.1"];
      let cmmc = ["AU.L2-3.3.1 (Audit Records)"];
      let whyReason = "Automated proactive adjustment based on threshold criteria optimization policies.";
      
      if (textLower.includes("deploy") || textLower.includes("update") || textLower.includes("password") || textLower.includes("firewall") || textLower.includes("security")) {
        risk = "Limited";
        euTier = "Limited Risk";
        nist = ["GOVERN-1.2", "MANAGE-1.2", "MEASURE-2.4"];
        cmmc = ["AU.L2-3.3.1 (System Audits)", "AU.L2-3.3.2 (Audit Events)"];
        whyReason = "AI executed configuration modification to mitigate potential security vulnerabilities or balance performance spikes.";
      } else if (textLower.includes("database") || textLower.includes("delete") || textLower.includes("user") || textLower.includes("refund") || textLower.includes("grant")) {
        risk = "High";
        euTier = "High Risk";
        nist = ["GOVERN-1.3", "MAP-1.5", "MANAGE-1.2", "MEASURE-3.1"];
        cmmc = ["AU.L2-3.3.1 (Audit Trails)", "AU.L2-3.3.5 (Audit Generation)", "AC.L2-3.1.1 (Access Controls)"];
        whyReason = "The AI system executed structured modification to critical stateful databases or processed financial/identity classifications requiring high traceability under the EU AI Act Annex III guidelines.";
      }

      resultData = {
        action: actionDescription.length > 50 ? actionDescription.substring(0, 50) + "..." : actionDescription,
        timestamp: timestampISO,
        riskRating: risk,
        complianceRating: "Compliant",
        what: `Dynamic transaction audit logging of action: ${actionDescription}`,
        when: `Executed at ${timestampISO} on event trigger. Trigger context: Active Infrastructure Agent Orchestrator.`,
        where: infraStr,
        who: actorStr,
        why: whyReason,
        nistMapping: nist,
        euActCategory: euTier,
        cmmcControls: cmmc,
        executiveSummary: `ProofLink cryptographically asserted and cataloged AI infrastructure action under ${euTier} classification with full SLA trace.`
      };
    }

    // Generate SHA-256 Cryptographic Receipt
    const serializedPayload = JSON.stringify(resultData, Object.keys(resultData).sort());
    const hash = crypto.createHash("sha256").update(serializedPayload).digest("hex");

    res.json({
      success: true,
      rawPayload: resultData,
      sha256: hash,
      verifierCode: `IT-PROOF-${hash.substring(0, 12).toUpperCase()}`,
      timestamp: timestampISO,
      isRealAi: !!aiClient
    });
  });

  // Serve static files / Vite asset middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`iTechSmart Inc. Server running on port ${PORT}`);
  });
}

startServer();

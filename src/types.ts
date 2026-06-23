export interface AuditPayload {
  action: string;
  timestamp: string;
  riskRating: string;
  complianceRating: string;
  what: string;
  when: string;
  where: string;
  who: string;
  why: string;
  nistMapping: string[];
  euActCategory: string;
  cmmcControls: string[];
  executiveSummary: string;
}

export interface ReceiptResponse {
  success: boolean;
  rawPayload: AuditPayload;
  sha256: string;
  verifierCode: string;
  timestamp: string;
  isRealAi: boolean;
}

export interface DemoLead {
  fullName: string;
  email: string;
  companyName: string;
  companySize: "SMB" | "MSP" | "Enterprise" | "Government";
  urgency: "Immediate" | "Evaluating" | "Future Plan";
  interestReason: string;
}

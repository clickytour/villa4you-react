export type ToolStatus = "active" | "comingSoon";
export type ToolRole = "guest" | "owner" | "agent" | "pmc" | "serviceProvider" | "all";
export type ToolCategory = "planning" | "revenue" | "operations" | "analytics" | "collaboration";

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  status: ToolStatus;
  roles: ToolRole[];
  primaryRole: ToolRole;
  color: string;
  hasDemo: boolean;
  features: string[];
  useCases?: { role: string; cases: string[] }[];
  inputs?: string[];
  outputs?: string[];
}

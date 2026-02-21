export { TOOLS, TOOL_CATEGORIES, TOOL_ROLES } from "./data";
export type { Tool, ToolStatus, ToolRole, ToolCategory } from "./types";

import { TOOLS } from "./data";

export function getToolBySlug(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByRole(role: string) {
  return TOOLS.filter((t) => t.roles.includes(role as any));
}

export function getActiveTools() {
  return TOOLS.filter((t) => t.status === "active");
}

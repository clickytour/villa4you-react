export function canAccessQa(): boolean {
  // QA hub is always accessible — not sensitive, just a page index.
  // Header button visibility is controlled separately in SiteHeader.tsx.
  return true;
}

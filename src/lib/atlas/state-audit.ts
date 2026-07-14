export type StateAuditSearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function hasHiddenStateLabels(searchParams: StateAuditSearchParams) {
  const value = (await searchParams)["state-audit"];
  return value === "hidden-labels";
}

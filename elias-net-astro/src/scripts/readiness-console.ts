/** Readiness Console is browser-local and must never transmit or persist input. */
export const readinessContract = { categories: 5, difficultiesPerCategory: 3, network: false, storage: false } as const;

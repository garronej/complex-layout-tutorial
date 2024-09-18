
export const pageIds = ["about me", "projects", "contact"] as const;
export type PageId = typeof pageIds[number];

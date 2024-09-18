
export const projectIds = ["project1", "project2", "project3"] as const;
export type ProjectId = typeof projectIds[number];
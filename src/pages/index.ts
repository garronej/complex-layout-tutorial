import * as account from "./account";
import * as catalog from "./catalog";
import * as launcher from "./launcher";

import { objectKeys } from "tsafe/objectKeys";
import type { UnionToIntersection } from "tsafe";
import type { RouterOpts } from "type-route";

export const pages = {
    account,
    catalog,
    launcher,
    home,
    myFiles,
    mySecrets,
    myService,
    myServices,
    page404,
    projectSettings,
    terms,
    sqlOlapShell,
    dataExplorer
};

export const routeDefs = {} as UnionToIntersection<
    (typeof pages)[keyof typeof pages]["routeDefs"]
>;

objectKeys(pages).forEach(pageName =>
    Object.assign(routeDefs, pages[pageName].routeDefs)
);

export const routerOpts = {
    "queryStringSerializer": launcher.queryStringSerializer
} satisfies RouterOpts;


export const pageIds = ["about me", "projects", "contact"] as const;
export type PageId = typeof pageIds[number];


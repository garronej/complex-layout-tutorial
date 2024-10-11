import {
    createRouter,
    defineRoute,
    createGroup,
    param,
    type Route
} from "type-route";
export const routeDefs = {
    projects: defineRoute(
        {
            project: param.query.optional.string
        },
        () => `/projects`
    )
};

// https://ameliart.fr/projects
// https://ameliart.fr/projects?project=projet1
// https://ameliart.fr/projects?project=projet2

export const routeGroup = createGroup(Object.values(createRouter(routeDefs).routes));

export type PageRoute = Route<typeof routeGroup>;

import {
    createRouter,
    defineRoute,
    createGroup,
    param,
    noMatch,
    type Route,
    type ValueSerializer
} from "type-route";
import { type ProjectId, projectIds } from "./projectIds";
import { id } from "tsafe/id";

export const routeDefs = {
    projects: defineRoute(
        {
            projectId: param.path.optional
                .ofType(
                    id<ValueSerializer<ProjectId>>({
                        parse: raw =>
                            !id<readonly string[]>(projectIds).includes(raw)
                                ? noMatch
                                : (raw as ProjectId),
                        stringify: value => value
                    })
                )
                .default(projectIds[0]),
            isGalleryVisible: param.query.optional.boolean.default(true)

        },
        ({ projectId }) => `/account/${projectId}`

    )
};


export const routeGroup = createGroup(Object.values(createRouter(routeDefs).routes));

export type PageRoute = Route<typeof routeGroup>;

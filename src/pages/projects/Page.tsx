import { tss } from "tss";
import { lazy, Suspense } from "react";
import type { PageRoute } from "./route";
import { routes } from "routes";

const ProjectGallery = lazy(() => import("./ProjectGallery"));
const ProjectDetails = lazy(() => import("./ProjectDetails"));

export type Props = {
  className?: string;
  route: PageRoute;
};

export default function Page(props: Props) {
  const { className, route } = props;

  const { cx, classes } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Suspense fallback={<p>Loading...</p>}>
        {route.params.gallery ? (
          <ProjectGallery
            className={classes.gallery}
            projectId={route.params.projectId}
            getChangeProjectIdLink={(projectId) => 
              routes.projects({
                ...route.params,
                projectId,
              }).link
            }
            projectDetailsLink={
              routes[route.name]({
                ...route.params,
                detailsIndex: 0,
                gallery: false,
              }).link
            }
          />
        ) : (
          <ProjectDetails
            className={classes.details}
            projectId={route.params.projectId}
            detailsIndex={route.params.detailsIndex}
            setDetailsIndex={detailsIndex => {
                routes[route.name]({
                    ...route.params,
                    detailsIndex,
                }).replace();
            }}
            onBackToGallery={() => {
              routes[route.name]({
                ...route.params,
                gallery: true,
              }).push();
            }}
          />
        )}
      </Suspense>
    </div>
  );
}

const useStyles = tss.withName({ Page }).create({
  root: {
    border: "5px solid yellow",
  },
  gallery: {
    height: "100%",
  },
  details: {
    height: "100%",
  },
});

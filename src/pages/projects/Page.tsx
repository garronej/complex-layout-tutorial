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
        {route.params.isGalleryVisible ? (
          <ProjectGallery
            className={classes.gallery}
            projectId={route.params.projectId}
            onChangeProjectId={(projectId) => {
              routes[route.name]({
                ...route.params,
                projectId,
              }).push();
            }}
            onSeeProjectDetails={() => {
              routes[route.name]({
                ...route.params,
                isGalleryVisible: false,
              }).push();
            }}
          />
        ) : (
          <ProjectDetails
            className={classes.details}
            projectId={route.params.projectId}
            onBackToGallery={() => {
              routes[route.name]({
                ...route.params,
                isGalleryVisible: true,
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

import { tss } from "tss";
import { lazy, Suspense } from "react";
import type { PageRoute } from "./route";

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
          <ProjectGallery className={classes.gallery} route={route} />
        ) : (
          <ProjectDetails className={classes.details} route={route} />
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

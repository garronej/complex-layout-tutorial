import { tss } from "tss";
import { lazy, Suspense } from "react";
import { routes } from "routes";
import type { PageRoute } from "../route";
const Project1Details = lazy(() => import("./Project1Details"));
const Project2Details = lazy(() => import("./Project2Details"));
const Project3Details = lazy(() => import("./Project3Details"));

export type Props = {
  className?: string;
  route: PageRoute;
};

export default function ProjectDetails(props: Props) {
  const { className, route } = props;

  const { cx, classes } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.backToGalleryWrapper}>
        <a
          {...routes.projects({
            ...route.params,
            gallery: true,
          }).link}
        >
          Back to Gallery
        </a>
      </div>
      <div className={classes.content}>
        <Suspense fallback={<p>Loading...</p>}>
          {(() => {
            switch (route.params.projectId) {
              case "project1":
                return (
                  <Project1Details
                    route={route}
                    className={classes.projectDetails}
                  />
                );
              case "project2":
                return <Project2Details className={classes.projectDetails} />;
              case "project3":
                return <Project3Details className={classes.projectDetails} />;
            }
          })()}
        </Suspense>
      </div>
    </div>
  );
}

const useStyles = tss.withName({ ProjectDetails }).create({
  root: {
    border: "5px solid blue",
    display: "flex",
    flexDirection: "column",
  },
  backToGalleryWrapper: {
    paddingLeft: 30,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    border: "5px solid orange",
  },
  projectDetails: {
    height: "100%",
  },
});

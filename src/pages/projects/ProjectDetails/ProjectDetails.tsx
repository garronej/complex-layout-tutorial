import { tss } from "tss";
import { type ProjectId } from "../projectIds";
import { lazy, Suspense } from "react";
import { useScrollNavigation } from "tools/useScrollNavigation";
import type { Link } from "type-route";
import Button from "@mui/material/Button";
const Project1Details = lazy(() => import("./Project1Details"));
const Project2Details = lazy(() => import("./Project2Details"));
const Project3Details = lazy(() => import("./Project3Details"));

export type Props = {
  className?: string;
  projectId: ProjectId;
  detailsIndex: number;
  getChangeDetailIndexLink: (detailsIndex: number) => Link;
  backToGalleryLink: Link;
};

export default function ProjectDetails(props: Props) {
  const {
    className,
    projectId,
    detailsIndex,
    getChangeDetailIndexLink,
    backToGalleryLink,
  } = props;

  const { cx, classes } = useStyles();

  const nextDetailsLink = getChangeDetailIndexLink(detailsIndex + 1);
  const previousDetailsLink = getChangeDetailIndexLink(detailsIndex - 1);

  useScrollNavigation((direction) => {
    switch (direction) {
      case "up":
        previousDetailsLink.onClick();
        break;
      case "down":
        nextDetailsLink.onClick();
        break;
    }
  });

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.backToGalleryWrapper}>
        <a {...backToGalleryLink}>Back to Gallery</a>
      </div>
      <div className={classes.content}>
        <Suspense fallback={<p>Loading...</p>}>
          {(() => {
            switch (projectId) {
              case "project1":
                return (
                  <Project1Details
                    detailsIndex={detailsIndex}
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
      <div className={classes.navigationArrowsWrapper}>
        <div>
          <Button {...previousDetailsLink} disabled={detailsIndex === 0}>
            Previous
          </Button>
          {" | "}
          <Button {...nextDetailsLink}>Next</Button>
        </div>
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
  navigationArrowsWrapper: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
});

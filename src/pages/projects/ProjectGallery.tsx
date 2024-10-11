import { tss } from "tss";
import { projectIds } from "./projectIds";
import { useScrollNavigation } from "tools/useScrollNavigation";
import type { PageRoute } from "./route";
import { routes } from "routes";
import Button from "@mui/material/Button";

type Props = {
  className?: string;
  route: PageRoute;
};

export default function ProjectGallery(props: Props) {
  const { className, route } = props;

  const { cx, classes } = useStyles();

  const previousProjectRoute = (() => {
    const i = projectIds.indexOf(route.params.projectId);

    if (i === 0) {
      return undefined;
    }

    return routes.projects({
      ...route.params,
      projectId: projectIds[i - 1],
    });
  })();

  const nextProjectRoute = (() => {
    const i = projectIds.indexOf(route.params.projectId);

    if (i === projectIds.length - 1) {
      return undefined;
    }

    return routes.projects({
      ...route.params,
      projectId: projectIds[i + 1],
    });
  })();

  useScrollNavigation((direction) => {
    switch (direction) {
      case "up":
        previousProjectRoute?.replace();
        break;
      case "down":
        console.log(nextProjectRoute);
        nextProjectRoute?.replace();
        break;
    }
  });

  return (
    <div className={cx(classes.root, className)}>
      <h1>Project Gallery</h1>
      <p>Describing {route.params.projectId}</p>
      <div>
        {projectIds.map((projectId_i) => (
          <div
            key={projectId_i}
            className={cx(
              classes.project,
              projectId_i === route.params.projectId
                ? classes.selectedProject
                : undefined
            )}
          >
            <h1>{projectId_i}</h1>
            {projectId_i === route.params.projectId && (
              <a
                {...routes.projects({
                  ...route.params,
                  gallery: false,
                  projectId: projectId_i,
                  detailsIndex: 0,
                }).link}
              >
                View details
              </a>
            )}
          </div>
        ))}
      </div>
      <div>
        <br />
        <br />
        <Button
          {...previousProjectRoute?.link}
          disabled={previousProjectRoute === undefined}
        >
          Previous
        </Button>
        {" | "}
        <Button {...nextProjectRoute?.link} disabled={nextProjectRoute === undefined}>
          Next
        </Button>
      </div>
    </div>
  );
}

const useStyles = tss.withName({ ProjectGallery }).create({
  root: {
    border: "5px solid green",
  },
  project: {
    border: "1px solid black",
  },
  selectedProject: {
    border: "5px solid red",
  },
});

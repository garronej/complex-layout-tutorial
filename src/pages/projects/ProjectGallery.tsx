import { tss } from "tss";
import { projectIds, type ProjectId } from "./projectIds";
import { useScrollNavigation } from "tools/useScrollNavigation";
import type { Link } from "type-route";

type Props = {
  className?: string;
  projectId: ProjectId;
  getChangeProjectIdLink: (projectId: ProjectId) => Link;
  projectDetailsLink: Link;
};

export default function ProjectGallery(props: Props) {
  const { className, projectId, getChangeProjectIdLink, projectDetailsLink } =
    props;

  const { cx, classes } = useStyles();

  const nextProjectLink = (() => {
    const currentIndex = projectIds.indexOf(projectId);
    let nextIndex = currentIndex + 1;

    if (nextIndex === projectIds.length) {
      nextIndex = 0;
    }

    const link = getChangeProjectIdLink(projectIds[nextIndex]);

    return link;
  })();

  const previousProjectLink = (() => {
    const currentIndex = projectIds.indexOf(projectId);
    let previousIndex = currentIndex - 1;

    if (previousIndex === -1) {
      previousIndex = projectIds.length - 1;
    }

    const link = getChangeProjectIdLink(projectIds[previousIndex]);

    return link;
  })();

  useScrollNavigation((direction) => {
    switch (direction) {
      case "up":
        previousProjectLink.onClick();
        break;
      case "down":
        nextProjectLink.onClick();
        break;
    }
  });

  return (
    <div className={cx(classes.root, className)}>
      <h1>Project Gallery</h1>
      <p>Describing {projectId}</p>
      <div>
        {projectIds.map((projectId_i) => (
          <div
            key={projectId_i}
            className={cx(
              classes.project,
              projectId_i === projectId ? classes.selectedProject : undefined
            )}
          >
            <h1>{projectId_i}</h1>
            {projectId_i === projectId && (
              <a {...projectDetailsLink}>
                View details
              </a>
            )}
          </div>
        ))}
      </div>
      <div>
        <br />
        <br />
        <a {...previousProjectLink}>Previous</a>
        {" | "}
        <a {...nextProjectLink}>Next</a>
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

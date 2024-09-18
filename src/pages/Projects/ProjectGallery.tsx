
import { tss } from "tss";
import { projectIds, type ProjectId } from "./projectIds";
import { useScrollNavigation } from "tools/useScrollNavigation";

type Props = {
    className?: string;
    projectId: ProjectId;
    onChangeProjectId: (projectId: ProjectId) => void;
    onSeeProjectDetails: () => void;
};

export default function ProjectGallery(props: Props) {

    const { className, projectId, onChangeProjectId, onSeeProjectDetails } = props;

    const { cx, classes } = useStyles();

    const goToNextProject = () => {
        const currentIndex = projectIds.indexOf(projectId);
        let nextIndex = currentIndex + 1;

        if (nextIndex === projectIds.length) {
            nextIndex = 0;
        }

        onChangeProjectId(projectIds[nextIndex]);
    };

    const goToPreviousProject = () => {
        const currentIndex = projectIds.indexOf(projectId);
        let previousIndex = currentIndex - 1;

        if (previousIndex === -1) {
            previousIndex = projectIds.length - 1;
        }

        onChangeProjectId(projectIds[previousIndex]);
    };

    useScrollNavigation(direction => {
        switch (direction) {
            case "up": 
                goToPreviousProject();
                break;
            case "down":
                goToNextProject();
                break;
        }
    });

    return (
        <div className={cx(classes.root, className)}>
            <h1>Project Gallery</h1>
            <p>Describing {projectId}</p>
            <div>
                {projectIds.map(projectId_i => (
                    <div
                        key={projectId_i}
                        className={cx(classes.project, projectId_i === projectId ? classes.selectedProject : undefined)}
                    >
                        <h1>{projectId_i}</h1>
                        {projectId_i === projectId && <button onClick={() => onSeeProjectDetails()}>View details</button>}
                    </div>
                ))}
            </div>
            <div>
                <br />
                <br />
                <button
                    onClick={goToPreviousProject}
                >
                    Previous
                </button>
                <button
                    onClick={goToNextProject}
                >
                    Next
                </button>
            </div>

        </div>
    );

}

const useStyles = tss.withName({ ProjectGallery }).create({
    root: {
        border: '5px solid green',
    },
    project: {
        border: "1px solid black",
    },
    selectedProject: {
        border: "5px solid red",
    }
});

import { tss } from "tss";
import { lazy, Suspense, useState } from "react";
import { ProjectId, projectIds } from "./projectIds";

const ProjectGallery = lazy(() => import("./ProjectGallery"));
const ProjectDetails = lazy(() => import("./ProjectDetails"));

export type Props = {
    className?: string;
};

export default function Project(props: Props) {

    const { className } = props;

    const { cx, classes } = useStyles();

    const [projectId, setProjectId] = useState<ProjectId>(projectIds[0]);
    const [isGalleryVisible, setGalleryVisible] = useState(true);

    return (
        <div className={cx(classes.root, className)}>
            <Suspense fallback={<p>Loading...</p>}>
                {isGalleryVisible ? (
                    <ProjectGallery
                        className={classes.gallery}
                        projectId={projectId}
                        onChangeProjectId={setProjectId}
                        onSeeProjectDetails={() => setGalleryVisible(false)}
                    />
                ) : (
                    <ProjectDetails
                        className={classes.details}
                        projectId={projectId}
                        onBackToGallery={() => setGalleryVisible(true)}
                    />
                )}



            </Suspense>
        </div>
    );

}

const useStyles = tss.withName({ Project }).create({
    root: {
        border: '5px solid yellow',
    },
    gallery: {
        height: "100%",
    },
    details: {
        height: "100%",
    },
});
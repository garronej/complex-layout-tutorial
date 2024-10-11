import { tss } from "tss";
import { type ProjectId } from "../projectIds";
import { lazy, Suspense } from "react";
import { useScrollNavigation } from "tools/useScrollNavigation";
const Project1Details = lazy(() => import("./Project1Details"));
const Project2Details = lazy(() => import("./Project2Details"));
const Project3Details = lazy(() => import("./Project3Details"));

export type Props = {
    className?: string;
    projectId: ProjectId;
    detailsIndex: number;
    setDetailsIndex: (index: number) => void;
    onBackToGallery: () => void;
};

export default function ProjectDetails(props: Props) {

    const { className, projectId, detailsIndex, setDetailsIndex , onBackToGallery } = props;

    const { cx, classes } = useStyles();

    const incrementDetailsIndex = () => {   
        setDetailsIndex(detailsIndex + 1);
    }

    const decrementDetailsIndex = () => {
        setDetailsIndex(detailsIndex - 1);
    }

    useScrollNavigation(direction => {
        switch (direction) {
            case "up": 
                decrementDetailsIndex();
                break;
            case "down":
                incrementDetailsIndex();
                break;
        }
    });

    return (
        <div className={cx(classes.root, className)}>
            <div className={classes.backToGalleryWrapper}>
                <button onClick={onBackToGallery}>Back to Gallery</button>
            </div>
            <div className={classes.content}>
                <Suspense fallback={<p>Loading...</p>}>
                    {(() => {
                        switch (projectId) {
                            case 'project1':
                                return <Project1Details detailsIndex={detailsIndex} className={classes.projectDetails} />;
                            case 'project2':
                                return <Project2Details className={classes.projectDetails} />;
                            case 'project3':
                                return <Project3Details className={classes.projectDetails} />;
                        }
                    })()}
                </Suspense>
            </div>
            <div className={classes.navigationArrowsWrapper}>
                <div>
                    <button
                        onClick={decrementDetailsIndex}
                    >
                        Previous
                    </button>
                    <button
                        onClick={incrementDetailsIndex}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );

}

const useStyles = tss.withName({ ProjectDetails }).create({
    root: {
        border: '5px solid blue',
        display: 'flex',
        flexDirection: 'column',
    },
    backToGalleryWrapper: {
        paddingLeft: 30,
        paddingBottom: 40
    },
    content: {
        flex: 1,
        marginLeft: 40,
        marginRight: 40,
        border: '5px solid orange',
    },
    projectDetails: {
        height: '100%',
    },
    navigationArrowsWrapper: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 40,
        paddingBottom: 40,
    }
});

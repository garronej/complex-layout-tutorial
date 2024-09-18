
import { tss, GlobalStyles } from "tss";
import { Header } from "./Header";
import { useState, lazy, Suspense } from "react";
import type { PageId } from "pages";

const Projects = lazy(() => import("pages/Projects"));
const Contact = lazy(() => import("pages/Contact"));
const AboutMe = lazy(() => import("pages/AboutMe"));

export function App() {

    const { classes } = useStyles();
    const [pageId, setPageId] = useState<PageId>("projects");

    return (
        <>
            <GlobalStyles
                styles={{
                    body: {
                        margin: 0,
                        padding: 0,
                        overflow: "hidden",
                    },
                    "*": {
                        boxSizing: "border-box",
                    }
                }}
            />
            <div className={classes.root}>
                <Header
                    pageId={pageId}
                    onPageChange={pageId => setPageId(pageId)}
                    className={classes.header}
                />
                <main className={classes.main}>
                    <Suspense fallback={<p>Loading...</p>}>
                        {(() => {
                            switch (pageId) {
                                case "projects":
                                    return <Projects className={classes.page} />;
                                case "contact":
                                    return <Contact className={classes.page} />;
                                case "about me":
                                    return <AboutMe className={classes.page} />;
                            }
                        })()}
                    </Suspense>
                </main>
            </div>
        </>
    );


}

const useStyles = tss.withName({ App }).create({
    root: {
        height: '100vh',
        border: '10px solid red',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        height: 50
    },
    main: {
        flex: 1,
        border: '5px solid green',
    },
    page: {
        height: '100%',
    }
});
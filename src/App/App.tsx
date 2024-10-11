import { tss, GlobalStyles } from "tss";
import { Header } from "./Header";
import { Suspense } from "react";
import { pages, pageIds } from "pages";
import { useRoute } from "routes";
import { routes, RouteProvider } from "routes";

export function App() {
  return (
    <RouteProvider>
      <AppContextualized />
    </RouteProvider>
  );
}

function AppContextualized() {
  const { classes } = useStyles();
  const route = useRoute();

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
          },
        }}
      />
      <div className={classes.root}>
        <Header
          pageId={route.name}
          className={classes.header}
        />
        <main className={classes.main}>
          <Suspense fallback={<p>Loading...</p>}>
            {(() => {
              for (const pageId of pageIds) {
                //You must be able to replace "home" by any other page and get no type error.
                const page = pages[pageId as "contact"];

                if (page.routeGroup.has(route)) {
                  return (
                    <page.LazyComponent
                      className={classes.page}
                      route={route}
                    />
                  );
                }
              }

              return <pages.page404.LazyComponent />;
            })()}
          </Suspense>
        </main>
      </div>
    </>
  );
}

const useStyles = tss.withName({ App }).create({
  root: {
    height: "100vh",
    border: "10px solid red",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: 50,
  },
  main: {
    flex: 1,
    border: "5px solid green",
  },
  page: {
    height: "100%",
  },
});

import { tss, GlobalStyles } from "tss";
import { Header } from "./Header";
import { Suspense } from "react";
import { pages, pageIds } from "pages";
import { useRoute, RouteProvider } from "routes";
import {
  FixedScrollProvider,
  useIsFixedScrollEnabled,
} from "tools/fixed-scroll";

export function App() {
  return (
    <RouteProvider>
      <FixedScrollProvider>
        <AppContextualized />
      </FixedScrollProvider>
    </RouteProvider>
  );
}

function AppContextualized() {
  const route = useRoute();

  const { isFixedScrollEnabled } = useIsFixedScrollEnabled();

  const { classes } = useStyles({ isFixedScrollEnabled });

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
          },
          "*": {
            boxSizing: "border-box",
          },
        }}
      />
      <div className={classes.root}>
        <Header pageId={route.name} className={classes.header} />
        <main className={classes.main}>
          <Suspense fallback={<p>Loading...</p>}>
            {(() => {
              for (const pageId of pageIds) {
                //You must be able to replace "contact" by any other page and get no type error.
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

const useStyles = tss
  .withName({ App })
  .withParams<{ isFixedScrollEnabled: boolean }>()
  .create(({ isFixedScrollEnabled }) => ({
    root: isFixedScrollEnabled
      ? {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }
      : {},
    header: (() => {
      const common = {
        border: "4px solid red",
        height: "50px",
      };

      return isFixedScrollEnabled
        ? {
            ...common,
          }
        : {
            ...common,
            position: "fixed",
            top: 0,
            width: "100%",
          };
    })(),
    main: isFixedScrollEnabled
      ? {
          flex: 1,
        }
      : {
          marginTop: "50px",
        },
    page: isFixedScrollEnabled ? { height: "100%" } : {},
  }));

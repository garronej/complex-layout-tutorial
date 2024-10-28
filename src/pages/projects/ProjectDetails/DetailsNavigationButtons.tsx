import Button from "@mui/material/Button";
import { tss } from "tss";
import { routes } from "routes";
import type { PageRoute } from "../route";

type Props = {
  className?: string;
  route: PageRoute;
  detailsCount: number;
};

export function DetailsNavigationButtons(props: Props) {
  const { className, route, detailsCount } = props;



  const { classes, cx } = useStyles();

  const previousDetailsRoute =
    route.params.detailsIndex === 0
      ? undefined
      : routes.projects({
          ...route.params,
          detailsIndex: route.params.detailsIndex - 1,
        });

  const nextDetailsRoute = detailsCount - 1 === route.params.detailsIndex
    ? undefined
    : routes.projects({
        ...route.params,
        detailsIndex: route.params.detailsIndex + 1,
      });

  return (
    <div className={cx(classes.root, className)}>
      <div>
        <Button
          {...previousDetailsRoute?.link}
          disabled={previousDetailsRoute === undefined}
        >
          Previous
        </Button>
        {" | "}
        <Button
          {...nextDetailsRoute?.link}
          disabled={nextDetailsRoute === undefined}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const useStyles = tss.withName({ DetailsNavigationButtons }).create({
  root: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
});

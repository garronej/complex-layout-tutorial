import Button from "@mui/material/Button";
import { tss } from "tss";
import { routes } from "routes";
import type { PageRoute } from "../route";
import { useScrollNavigation } from "tools/useScrollNavigation";

type Props = {
  className?: string;
  route: PageRoute;
  detailsIndex: number;
  isLastDetails: boolean;
};

export function DetailsNavigationButtons(props: Props) {
  const { className, route, detailsIndex, isLastDetails } = props;

  const { classes, cx } = useStyles();

  const previousDetailsRoute =
    detailsIndex === 0
      ? undefined
      : routes.projects({
          ...route.params,
          detailsIndex: detailsIndex - 1,
        });

  const nextDetailsRoute = isLastDetails
    ? undefined
    : routes.projects({
        ...route.params,
        detailsIndex: detailsIndex + 1,
      });

  useScrollNavigation((direction) => {
    switch (direction) {
      case "up":
        previousDetailsRoute?.replace();
        break;
      case "down":
        nextDetailsRoute?.replace();
        break;
    }
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

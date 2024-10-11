import { tss } from "tss";
import { DetailsNavigationButtons } from "./DetailsNavigationButtons";
import type { PageRoute } from "../route";

type Props = {
  className?: string;
  route: PageRoute;
};

export default function Project1Details(props: Props) {
  const { className, route } = props;

  const { cx, classes } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      {(() => {
        switch (route.params.detailsIndex) {
          case 0:
            return <Project1Details0 />;
          case 1:
            return <Project1Details1 />;
          case 2:
            return <Project1Details2 />;
        }
      })()}
      <DetailsNavigationButtons
        route={route}
        detailsIndex={route.params.detailsIndex}
        isLastDetails={route.params.detailsIndex === 2}
      />
    </div>
  );
}

function Project1Details0() {
  return <h1>Project 1 Details 1</h1>;
}

function Project1Details1() {
  return <h1>Project 1 Details 2</h1>;
}

function Project1Details2() {
  return <h1>Project 1 Details 3</h1>;
}

const useStyles = tss.withName({ Project1Details }).create({
  root: {
    border: "5px solid green",
  },
});

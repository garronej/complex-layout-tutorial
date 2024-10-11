import { tss } from "tss";
import  { type PageId, pageIds } from "pages";
import { routes } from "routes";

type Props = {
  className?: string;
  pageId: PageId | false;
};


export function Header(props: Props) {
  const { className, pageId } = props;

  const { cx, classes } = useStyles();

  return (
    <header className={cx(classes.root, className)}>
      <h1>Amelia</h1>
      <div style={{ flex: 1 }} />
      {pageIds
        .filter((pageId) => pageId !== "page404")
        .map((pageId_i) => (
          <a
            key={pageId_i}
            className={pageId_i === pageId ? classes.activePage : undefined}
            {...routes[pageId_i]().link}
          >
            {pageId_i}
          </a>
        ))}
    </header>
  );
}

const useStyles = tss.withName({ Header }).create({
  root: {
    border: "5px solid blue",
    display: "flex",
    alignItems: "center",
    gap: 5
  },
  activePage: {
    border: "2px solid red",
  },
});

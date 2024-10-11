import { tss } from "tss";
import  { type PageId, pageIds } from "pages";

type Props = {
  className?: string;
  pageId: PageId | false;
  onPageChange: (pageId: PageId) => void;
};


export function Header(props: Props) {
  const { className, pageId, onPageChange } = props;

  console.log({ pageId });

  const { cx, classes } = useStyles();

  return (
    <header className={cx(classes.root, className)}>
      <h1>Amelia</h1>
      <div style={{ flex: 1 }} />
      {pageIds
        .filter((pageId) => pageId !== "page404")
        .map((pageId_i) => (
          <button
            key={pageId_i}
            className={pageId_i === pageId ? classes.activePage : undefined}
            onClick={() => onPageChange(pageId_i)}
          >
            {pageId_i}
          </button>
        ))}
    </header>
  );
}

const useStyles = tss.withName({ Header }).create({
  root: {
    border: "5px solid blue",
    display: "flex",
    alignItems: "center",
  },
  activePage: {
    border: "2px solid red",
  },
});


import { tss } from "tss";

type Props = {
    className?: string;
};

export default function Project2Details({ className }: Props) {

    const { cx, classes } = useStyles();

    return (
        <div className={cx(classes.root, className)}>
            <h2>Project 2 Details</h2>
            <p>Details about Project 2 go here.</p>
        </div>
    );
}

const useStyles = tss.withName({ Project2Details }).create({
    root: {
        border: '5px solid green',
    }
});

import { tss } from "tss";

type Props = {
    className?: string;
};

export default function Project3Details({ className }: Props) {

    const { cx, classes } = useStyles();

    return (
        <div className={cx(classes.root, className)}>
            <h3>Project 3 Details</h3>
            <p>Details about Project 3 go here.</p>
        </div>
    );
}

const useStyles = tss.withName({ Project3Details }).create({
    root: {
        border: '5px solid green',
    }
});
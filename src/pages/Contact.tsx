
import { tss } from "tss";

export type Props = {
    className?: string;
};

export default function Contact(props: Props) {

    const { className } = props;

    const { cx, classes } = useStyles();

    return (
        <div className={cx(classes.root, className)}>
            <div>
                <h1>Contact Title</h1>
                <p>Contact description goes here.</p>
            </div>
        </div>
    );

}

const useStyles = tss.withName({ Contact }).create({
    root: {
        border: '5px solid yellow',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
});
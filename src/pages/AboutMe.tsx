
import { tss } from "tss";

export type Props = {
    className?: string;
};

export default function AboutMe(props: Props) {

    const { className } = props;

    const { cx, classes } = useStyles();

    return (
        <div className={cx(classes.root, className)}>
            <div>
                <h1>AboutMe Title</h1>
                <p>AboutMe description goes here.</p>
            </div>
        </div>
    );

}

const useStyles = tss.withName({ AboutMe }).create({
    root: {
        border: '5px solid yellow',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
});
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    fixedHeight: {
        height: 240,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    content: {
        width: "100%"
    }
}));

export default useStyles;
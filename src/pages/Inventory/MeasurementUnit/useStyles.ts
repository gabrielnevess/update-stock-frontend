import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    centered: {
        margin: theme.spacing(2, 0, 2),
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        width: "100%"
    },
    fab: {
        position: "fixed",
        [theme.breakpoints.up("md")]: {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        [theme.breakpoints.down("sm")]: {
            bottom: "2px",
            right: "2px"
        }
    },
    marginIcon: {
        margin: theme.spacing(1),
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
            width: 1000,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
        [theme.breakpoints.up(1000 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(3),
        },
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default useStyles;
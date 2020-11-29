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
    marginIcon: {
        margin: theme.spacing(1),
    }
}));

export default useStyles;
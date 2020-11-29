import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    depositContext: {
        flex: 1,
    },
    centered: {
        margin: theme.spacing(2, 0, 2),
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

export default useStyles;
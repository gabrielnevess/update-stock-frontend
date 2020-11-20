import { makeStyles } from "@material-ui/core/styles";
import screenLogin from "../../../assets/svg/screen_login.svg";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundImage: `url(${screenLogin})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPositionY: "bottom",
        height: window.innerHeight
    },
    layout: {
        width: "auto",
        paddingTop: theme.spacing(5),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto"
        },
    },
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            padding: theme.spacing(3),
        },
    },
    titleWithLogo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    buttonBack: {
        marginTop: theme.spacing(3),
    },
    centered: {
        margin: theme.spacing(2, 0, 2),
        display: "flex",
        justifyContent: "center",
    },
    logo: {
		width: 300,
		height: 150
    },
    title: {
        marginTop: theme.spacing(1)
    }
}));

export default useStyles;
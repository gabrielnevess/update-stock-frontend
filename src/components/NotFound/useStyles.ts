import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(20),
		paddingBottom: theme.spacing(4),
	},
	error404: {
		width: 200,
		height: 200
	},
	description: {
		textAlign: "center"
	}
}));

export default useStyles;
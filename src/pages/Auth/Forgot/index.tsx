import React from "react";
import {
	Button,
	Grid,
	CircularProgress,
	Typography,
	Paper,
	Container
} from "@material-ui/core";
import Input from "../../../components/Input";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
	Formik,
	Field,
	Form
} from "formik";
import { useHistory } from "react-router-dom";
import useStyles from "./useStyles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { forgotPassword } from "../../../services/authService";
import { RestError } from "../../../interfaces/RestError";

interface InitialForgot {
    email: string
}

const Forgot: React.FC = () => {
	const history = useHistory();
    const classes = useStyles();
    
	const initialForgot: InitialForgot = {
		email: ""
	}

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("email inválido")
			.nullable(false)
			.required("email é obrigatório")
	}).defined();

	return (
		<Container
			disableGutters={true}
			maxWidth={false}
			className={classes.container}
		>
			<div className={classes.layout}>
				<Paper className={classes.paper}>

					<Button
						className={classes.buttonBack}
						color="primary"
						onClick={() => history.goBack()}>
						<ArrowBackIcon />
						Voltar
					</Button>

					<div className={classes.title}>
						<Typography component="h1" variant="h5">
							Recuperar senha
						</Typography>
					</div>

					<Formik
						initialValues={initialForgot}
						validationSchema={validationSchema}
						onSubmit={async (values, { setSubmitting, setFieldError }) => {

							try {
								setSubmitting(true);
								const data = await forgotPassword<InitialForgot>(values);
								setSubmitting(false);
								if (data) {
									history.push("/entrar");
									toast.info("Enviamos um e-mail para redefinição de senha!");
								}
							} catch (error) {
								setSubmitting(false);
								error.response?.data?.map((el: RestError, key: number) => setFieldError(el.field, el.details));
							}

						}}>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							setFieldValue,
							isSubmitting
						}) => {
							return (
								<Form className={classes.form}
									noValidate
									onSubmit={handleSubmit}>
									<Grid container spacing={2}>

										<Grid item xs={12} sm={12}>
											<Typography color="error" variant="subtitle2">
												* Campo(s) obrigatório(s)
										</Typography>
										</Grid>

										<Grid item xs={12}>
											<Field
												component={Input}
												variant="outlined"
												required
												fullWidth
												id="email"
												label="Email"
												name="email"
												autoComplete="email"
												onChange={handleChange}
												onBlur={handleBlur}
												disabled={isSubmitting}
												value={values.email}
												helperText={errors.email && touched.email ? errors.email : ""}
												error={errors.email && touched.email}
											/>
										</Grid>
									</Grid>
									<React.Fragment>
										{isSubmitting ?
											<div className={classes.centered}>
												<CircularProgress />
											</div> :
											<Button
												type="submit"
												fullWidth
												variant="contained"
												color="primary"
												className={classes.submit}>Recuperar</Button>
										}
									</React.Fragment>
								</Form>
							)
						}}
					</Formik>
				</Paper>
			</div>
		</Container>
	);
}

export default Forgot;
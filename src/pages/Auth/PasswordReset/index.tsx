import React, { useState } from "react";
import {
    Button,
    Grid,
    CircularProgress,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    Container
} from "@material-ui/core";
import Input from "../../../components/Input";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
    Formik,
    Field,
    Form
} from "formik";
import { 
    useHistory, 
    useLocation
} from "react-router-dom";
import useStyles from "./useStyles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { passwordReset } from "../../../services/authService";
import { RestError } from "../../../interfaces/RestError";

interface PasswordState {
    password: boolean;
    confirmPassword: boolean;
}

interface initialPasswordReset {
    password: string;
    confirmPassword: string;
}

type PasswordResetType = {
    token: string;
    newPassword: string;
}   

const PasswordReset: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();
    
    const [showPassword, setShowPassword] = useState<PasswordState>({
        password: false,
        confirmPassword: false
    });

    const handleClickShowPassword = (prop: string, value: boolean) => {
        setShowPassword({
            ...showPassword,
            [prop]: !value
        });
    }

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    
    const initialPasswordReset: initialPasswordReset = {
        password: "",
        confirmPassword: ""
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(5, "senha deve ter no minímo 5 caracteres")
            .max(255, "senha deve ter no máximo 255 caracteres")
            .nullable(false)
            .required("senha é obrigatório"),
        confirmPassword: Yup.string()
            .min(5, "senha de confirmação deve ter no minímo 5 caracteres")
            .max(255, "senha de confirmação deve ter no máximo 255 caracteres")
            .nullable(false)
            .required("senha de confirmação é obrigatório")
            .test("passwords-match", "A senha deve ser igual ao campo interior", function (value) {
                return this.parent.password === value;
            })
    });

    const query = useQuery();

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
                            Redefinição de Senha
					    </Typography>
                    </div>

                    <Formik
                        initialValues={initialPasswordReset}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {

                            try {

                                setSubmitting(true);
                                const object: PasswordResetType = {
                                    token: query.get("token") || "",
                                    newPassword: values.confirmPassword
                                }

                                const data = await passwordReset<PasswordResetType>(object);
                                setSubmitting(false);
                                if (data) {
                                    history.push("/entrar");
                                    toast.success("Senha alterada com sucesso!");
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

                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                component={Input}
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Nova Senha"
                                                type={showPassword.password ? "text" : "password"}
                                                id="password"
                                                autoComplete="current-password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled={isSubmitting}
                                                InputProps={{
                                                    endAdornment:
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => handleClickShowPassword("password", showPassword.password)}
                                                                edge="end"
                                                            >
                                                                {showPassword.password ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>

                                                }}
                                                value={values.password}
                                                helperText={errors.password && touched.password ? errors.password : ""}
                                                error={errors.password && touched.password}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                component={Input}
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="confirmPassword"
                                                label="Confirmar nova senha"
                                                type={showPassword.confirmPassword ? "text" : "password"}
                                                id="confirmPassword"
                                                autoComplete="current-password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled={isSubmitting}
                                                InputProps={{
                                                    endAdornment:
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => handleClickShowPassword("confirmPassword", showPassword.confirmPassword)}
                                                                edge="end"
                                                            >
                                                                {showPassword.confirmPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>

                                                }}
                                                value={values.confirmPassword}
                                                helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ""}
                                                error={errors.confirmPassword && touched.confirmPassword}
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
                                                className={classes.submit}>Alterar Senha</Button>
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

export default PasswordReset;
import React, { useState, useEffect } from "react";
import {
    Button,
    TextField,
    CircularProgress,
    Typography,
    Paper,
    Container,
    Grid,
    Link
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from "./useStyles";
import { useAuth } from "../../../hooks/auth";
import logoImage from "../../../assets/img/logo.png";

interface InitialLogin {
    login: string;
    password: string
}

const Login: React.FC = () => {
    const { logged, signIn } = useAuth();
    const classes = useStyles();

    const initialLogin: InitialLogin = {
        login: "",
        password: ""
    };

    const [currentLogin, setCurrentLogin] = useState(initialLogin);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const redirectByCredentials = () => {
        if (logged?.isLogged) {
            history.push("/funcionario");
        }
    }

    useEffect(() => {
        redirectByCredentials();
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentLogin({ ...currentLogin, [name]: value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        await signIn(currentLogin);
        setLoading(false);
        redirectByCredentials();
    };

    return (
        <Container 
            disableGutters={true}
            maxWidth={false}
            className={classes.container}
        >
            <div className={classes.layout}>
                <Paper className={classes.paper}>

                    <div className={classes.titleWithLogo}>
                        <img src={logoImage}
                            alt="logo"
                            className={classes.logo} />
                        <Typography component="h1" variant="h5" className={classes.title}>
                            Faça o seu Login
                        </Typography>
                    </div>

                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={(e) => onSubmit(e)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="login"
                            label="Usuário"
                            name="login"
                            autoComplete="login"
                            autoFocus
                            disabled={loading}
                            value={currentLogin.login}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            disabled={loading}
                            autoComplete="current-password"
                            value={currentLogin.password}
                            onChange={handleInputChange}
                        />
                        {loading ?
                            <div className={classes.centered}>
                                <CircularProgress />
                            </div> :
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}>Entrar</Button>
                        }
                    </form>
                    <Grid
                        container
                        justify="center"
                        alignContent="center"
                        direction="column">
                        <Grid item>
                            <Link
                                href="/recuperar-senha"
                                variant="body2"
                            >
                                {"Esqueceu sua senha? Clique aqui"}
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </Container>
    );
}

export default Login;
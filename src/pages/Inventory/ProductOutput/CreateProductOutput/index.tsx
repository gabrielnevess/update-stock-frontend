import React, { useState, useEffect, memo } from "react";
import {
    Button,
    Grid,
    CircularProgress,
    Typography,
    Paper,
    Box,
    FormControl,
    Select,
    InputLabel,
    FormHelperText
} from "@material-ui/core";
import {
    useHistory
} from "react-router-dom";
import { toast } from "react-toastify";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useStyles from "./useStyles";
import {
    Formik,
    Field,
    Form,
    FormikErrors,
    FormikTouched,
    getIn
} from "formik";
import * as Yup from "yup";
import { RestError } from "../../../../interfaces/RestError";
import { inventoryProductOutput } from "../../Sidebar/Menu";
import { saveProductOutput } from "../../../../services/productOutputService";
import Input from "../../../../components/Input";
import { Product } from "../../../../interfaces/Product";
import { Pageable } from "../../../../interfaces/Pageable";
import { getProducts } from "../../../../services/productService";
import { ProductOutput } from "../../../../interfaces/ProductOutput";

const CreateEditProductOutput: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Pageable<Product>>({} as Pageable<Product>);

    const validationSchema = Yup.object().shape({
        product: Yup.object().shape({
            id: Yup.number()
                .nullable(false)
                .required("produto é obrigatório")
                .test("product-match", "obrigatório selecionar um produto", function (value: any): any {
                    if (value) {
                        return value !== -1;
                    }
                }),
        }),
        qtd: Yup.number()
            .positive("quantidade não pode ser zero ou negativo")
            .nullable(false)
            .required("quantidade é obrigatório"),
        observation: Yup.string()
            .min(10, "observação deve ter no minímo 10 caracteres")
            .max(500, "observação deve ter no máximo 500 caracteres")
            .nullable(false)
            .required("observação é obrigatório")
    });

    const isValueValid = (errors: FormikErrors<ProductOutput>, touched: FormikTouched<ProductOutput>, key: string) => {
        return getIn(errors, key) && getIn(touched, key);
    }

    const initialProductOutput = {
        id: "",
        product: {
            id: ""
        },
        qtd: "",
        observation: ""
    };

    const getAllProduct = async () => {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    }

    useEffect(() => {
        getAllProduct();
    }, []);

    const renderTitle = "Saída de Produto";
    const renderButtonText = "Salvar";

    return (
        <React.Fragment>
            <div className={classes.layout}>
                <Paper className={classes.paper}>

                    <Button
                        color="primary"
                        onClick={() => history.goBack()}>
                        <ArrowBackIcon />
									Voltar
							</Button>

                    <Box mb={3}>
                        <Typography
                            variant="h5"
                            align="center"
                        >
                            {renderTitle}
                        </Typography>
                    </Box>

                    <Formik
                        enableReinitialize={true}
                        initialValues={initialProductOutput}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            try {
                                setSubmitting(true);
                                const object = {
                                    ...values
                                };
                                const data = await saveProductOutput(object);
                                setSubmitting(false);
                                if (data) {
                                    history.push(inventoryProductOutput);
                                    toast.success("Saída de Produto salvo com sucesso!");
                                }
                            } catch (error) {
                                setSubmitting(false);
                                error?.map((el: RestError, key: number) => setFieldError(el.field, el.details));
                            }
                        }}>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting
                        }) => {
                            return (
                                <Form className={classes.form}
                                    noValidate
                                    onSubmit={handleSubmit}>

                                    <Grid container spacing={2}>

                                        <Grid item>
                                            <Typography color="error" variant="subtitle2">
                                                * Campo(s) obrigatório(s)
													</Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControl
                                                variant="outlined"
                                                required
                                                error={isValueValid(errors, touched, "product.id") ? true : false}
                                                className={classes.formControl}
                                                disabled={loading}
                                            >
                                                <InputLabel id="product.id">Produto</InputLabel>
                                                <Field
                                                    component={Select}
                                                    labelId="product.id"
                                                    id="product.id"
                                                    native
                                                    onChange={handleChange}
                                                    value={values?.product?.id}
                                                    inputProps={{
                                                        id: "product.id"
                                                    }}
                                                    label="Produto *"
                                                >
                                                    <option value={-1}>Selecione um produto</option>
                                                    {products?.content?.map((el: Product, key: number) => (
                                                        <option key={key} value={el.id}>{el.name} - {el.model}</option>
                                                    ))}
                                                </Field>
                                                {isValueValid(errors, touched, "product.id") ? <FormHelperText>{errors?.product?.id}</FormHelperText> : ""}
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Field
                                                component={Input}
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="qtd"
                                                label="Quantidade"
                                                name="qtd"
                                                autoComplete="qtd"
                                                type="number"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values?.qtd}
                                                helperText={errors.qtd && touched.qtd ? errors.qtd : ""}
                                                error={errors.qtd && touched.qtd}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Field
                                                component={Input}
                                                autoComplete="observation"
                                                name="observation"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="observation"
                                                label="Observação"
                                                multiline
                                                rowsMax={4}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values?.observation}
                                                helperText={errors.observation && touched.observation ? errors.observation : ""}
                                                error={errors.observation && touched.observation}
                                            />
                                        </Grid>

                                    </Grid>

                                    {isSubmitting ?
                                        <div className={classes.centered}>
                                            <CircularProgress />
                                        </div> :
                                        <Button
                                            name="submit"
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}>
                                            {renderButtonText}
                                        </Button>
                                    }
                                </Form>
                            )
                        }}
                    </Formik>
                    
                </Paper>
            </div>
        </React.Fragment>
    );
}

export default memo(CreateEditProductOutput);
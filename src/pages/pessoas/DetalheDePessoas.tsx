import { useEffect, useState } from "react";
import { Box, Paper, Grid, Typography, LinearProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';

import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { VTextField, VForm, useVForm, TVFormErrors } from "../../shared/forms";
import { AutoCompleteCidade } from "./components/AutoCompleteCidade";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  nomeCompleto: yup.string().required().min(3),
  email: yup.string().email().required(),
  cidadeId: yup.number().integer().required()
})

export const DetalheDePessoas = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const { formRef, save, saveAndBack, isSaveAndBack } = useVForm();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
          console.log(result);

          formRef.current?.setData(result);
        }
      });
    }else{
      formRef.current?.setData({
        email: '',
        nomeCompleto: '',
        cidadeId: undefined
      })
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    console.log(dados)
    formValidationSchema.validate(dados, { abortEarly: false })
    .then(dadosValidados =>{
      setIsLoading(true);

      if (id === "nova") {
        PessoasService.create(dadosValidados).then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            if(isSaveAndBack()){
              navigate('/pessoas');
            }else{
              navigate(`/pessoas/detalhe/${result}`);
            }
          }
        });
      } else {
        PessoasService.updateById(Number(id), dadosValidados).then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            if(isSaveAndBack()){
              navigate('/pessoas');
            }
            setNome(dadosValidados.nomeCompleto);
          }
        });
      }
    })
    .catch((errors: yup.ValidationError) => {
      const validationErrors: TVFormErrors = {};
      errors.inner.forEach(error => {
        if(!error.path) return;

        validationErrors[error.path] = error.message;
      });
      console.log(validationErrors);

      formRef.current?.setErrors(validationErrors);
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/pessoas");
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id !== "nova" ? nome : "Nova pessoa"}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEVoltar={saveAndBack}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label="Nome"
                  name="nomeCompleto" 
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name="email" 
                  label="E-mail"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <AutoCompleteCidade isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};

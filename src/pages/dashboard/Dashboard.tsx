import { useEffect, useState } from "react";
import { Box, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";

import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const Dashboard = () => {
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(false);
  const [isLoadingCidades, setIsLoadingCidades] = useState(false);
  const [pessoasTotalCount, setPessoasTotalCount] = useState(0);
  const [cidadesTotalCount, setCidadesTotalCount] = useState(0);

  useEffect(()=>{
    setIsLoadingPessoas(true);
    setIsLoadingCidades(true);

    PessoasService.getAll().then((result)=>{
      setIsLoadingPessoas(false);
      if(result instanceof Error){
        alert(result.message);
      }else{
        setPessoasTotalCount(result.totalCount);
      }
    });
    CidadesService.getAll().then((result) => {
      setIsLoadingCidades(false);
      if(result instanceof Error){
        alert(result.message);
      }else{
        setCidadesTotalCount(result.totalCount);
      }
    })
  }, [])

    return (
      <LayoutBaseDePagina
        titulo="Página inicial"
        barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}
      >
        <Box width="100%" display="flex">
          <Grid container margin={2}>
            <Grid item container spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" align="center">
                      Total de pessoas
                    </Typography>

                    <Box padding={6} display="flex" justifyContent="center" alignItems="center" >
                      {!isLoadingPessoas && (
                        <Typography variant="h1">
                          {pessoasTotalCount}
                        </Typography>
                      )}
                      {isLoadingPessoas && (
                        <Typography variant='h1'>
                          <CircularProgress size={70} />
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" align="center">
                      Total de cidades
                    </Typography>

                    <Box padding={6} display="flex" justifyContent="center" alignItems="center" >
                      {!isLoadingCidades && (
                        <Typography variant="h1">
                          {cidadesTotalCount}
                          </Typography>
                      )}
                      {isLoadingCidades && (
                        <Typography variant='h1'>
                          <CircularProgress size={70} />
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </LayoutBaseDePagina>
    );
};
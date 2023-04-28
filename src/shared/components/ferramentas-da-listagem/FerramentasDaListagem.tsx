import { Box, Button, Icon, IconButton, Paper, TextField, useTheme } from '@mui/material';

import { Environment } from '../../environment';

interface IFerramentasDaListagemProps{
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem = ({
    textoDaBusca = '', 
    mostrarInputBusca = false, 
    aoMudarTextoDeBusca,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
    aoClicarEmNovo
}: IFerramentasDaListagemProps) => {
    const theme = useTheme();

    return(
        <Box
          height={theme.spacing(5)} 
          marginX={1} 
          padding={1} 
          paddingX={2} 
          display='flex' 
          gap={1} 
          alignItems='center' 
          component={Paper}
        >
            {mostrarInputBusca && (
                <TextField
                size='small' 
                value={textoDaBusca}
                placeholder={Environment.INPUT_DE_BUSCA} 
                InputProps={{
                  endAdornment: <IconButton edge='end'><Icon>search</Icon></IconButton>
                }}
                onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
              />
            )}

            <Box flex={1} display='flex' justifyContent='end'>
                {mostrarBotaoNovo && (
                    <Button
                      variant='contained' 
                      disableElevation 
                      onClick={aoClicarEmNovo}
                      endIcon={<Icon>add</Icon>}
                    >
                        {textoBotaoNovo}
                    </Button>
                )

                }
            </Box>
        </Box>
    );
};
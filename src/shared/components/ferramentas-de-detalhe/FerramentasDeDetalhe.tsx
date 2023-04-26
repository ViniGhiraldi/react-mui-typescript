import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

interface IFerramentasDeDetalheProps{
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEVoltar?: boolean;

    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmSalvarEVoltar?: () => void;
}

export const FerramentasDeDetalhe = ({
    textoBotaoNovo = 'Novo',
    
    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEVoltar = false,
    
    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEVoltar
}: IFerramentasDeDetalheProps) => {
    const theme = useTheme();

    return (
      <Box
        height={theme.spacing(5)}
        marginX={1}
        padding={1}
        paddingX={2}
        display="flex"
        gap={1}
        alignItems="center"
        component={Paper}
      >
        {mostrarBotaoSalvar && (
            <Button
            variant="contained"
            disableElevation
            onClick={aoClicarEmSalvar}
            startIcon={<Icon>save</Icon>}
            >Salvar</Button>
        )}
        {mostrarBotaoSalvarEVoltar && (
            <Button
            variant="outlined"
            disableElevation
            onClick={aoClicarEmSalvarEVoltar}
            startIcon={<Icon>save</Icon>}
            >Salvar & Voltar</Button>
        )}
        {mostrarBotaoApagar && (
            <Button
            variant="outlined"
            disableElevation
            onClick={aoClicarEmApagar}
            startIcon={<Icon>delete</Icon>}
            >Apagar</Button>
        )}
        {mostrarBotaoNovo && (
            <Button
            variant="outlined"
            disableElevation
            onClick={aoClicarEmNovo}
            startIcon={<Icon>add</Icon>}
            >{textoBotaoNovo}</Button>
        )}
        <Divider variant='middle' orientation='vertical' />
        {mostrarBotaoVoltar && (
            <Button
            variant="outlined"
            disableElevation
            onClick={aoClicarEmVoltar}
            startIcon={<Icon>arrow_back</Icon>}
            >Voltar</Button>
        )}
      </Box>
    );
};
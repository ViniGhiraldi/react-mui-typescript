import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";

interface IButtonFerramentasDeDetalheProps {
  variant: "contained" | "outlined";
  onClickInButton?: () => void;
  icon: string;
  text: string;
}

const ButtonFerramentasDeDetalhe = ({
  variant,
  onClickInButton,
  icon,
  text,
}: IButtonFerramentasDeDetalheProps) => {
  return (
    <Button
      variant={variant}
      disableElevation
      onClick={onClickInButton}
      startIcon={<Icon>{icon}</Icon>}
    >
      <Typography
        variant="button"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {text}
      </Typography>
    </Button>
  );
};

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEVoltar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEVoltarCarregando?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEVoltar?: () => void;
}

export const FerramentasDeDetalhe = ({
  textoBotaoNovo = "Novo",

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEVoltar = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEVoltarCarregando = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEVoltar,
}: IFerramentasDeDetalheProps) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      justifyContent={!smDown ? 'flex-start' : 'center'}
      component={Paper}
    >
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
        <ButtonFerramentasDeDetalhe
          variant="contained"
          onClickInButton={aoClicarEmSalvar}
          icon="save"
          text="Salvar"
        />
      )}

      {mostrarBotaoSalvarCarregando && <Skeleton width={110} height={60} />}

      {mostrarBotaoSalvarEVoltar &&
        !mostrarBotaoSalvarEVoltarCarregando &&
        !mdDown && (
          <ButtonFerramentasDeDetalhe
            variant="outlined"
            onClickInButton={aoClicarEmSalvarEVoltar}
            icon="save"
            text="Salvar e Voltar"
          />
        )}

      {mostrarBotaoSalvarEVoltarCarregando && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
        <ButtonFerramentasDeDetalhe
          variant="outlined"
          onClickInButton={aoClicarEmApagar}
          icon="delete"
          text="Apagar"
        />
      )}

      {mostrarBotaoApagarCarregando && <Skeleton width={110} height={60} />}

      {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && (
        <ButtonFerramentasDeDetalhe
          variant="outlined"
          onClickInButton={aoClicarEmNovo}
          icon="add"
          text={textoBotaoNovo}
        />
      )}

      {mostrarBotaoNovoCarregando && !smDown && <Skeleton width={110} height={60} />}

      {mostrarBotaoVoltar &&
        (mostrarBotaoNovo ||
          mostrarBotaoApagar ||
          mostrarBotaoSalvar ||
          mostrarBotaoSalvarEVoltar ||
          smDown) && <Divider variant="middle" orientation="vertical" />}

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
        <ButtonFerramentasDeDetalhe
          variant="outlined"
          onClickInButton={aoClicarEmVoltar}
          icon="arrow_back"
          text="Voltar"
        />
      )}

      {mostrarBotaoVoltarCarregando && <Skeleton width={110} height={60} />}
    </Box>
  );
};

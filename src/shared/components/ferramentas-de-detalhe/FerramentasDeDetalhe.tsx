import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@mui/material";

import { useState, useRef, useCallback } from "react";

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
  const options = ['Novo', 'Salvar', 'Deletar'];

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleClose = useCallback((event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  }, []);

  const handleMenuItemClick = useCallback((index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  }, []);

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      justifyContent={smDown ? "center" : "flex-start"}
      component={Paper}
    >
      {!smDown ? (
        <>
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

          {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && (
            <ButtonFerramentasDeDetalhe
              variant="outlined"
              onClickInButton={aoClicarEmNovo}
              icon="add"
              text={textoBotaoNovo}
            />
          )}

          {mostrarBotaoNovoCarregando && <Skeleton width={110} height={60} />}
        </>
      ) : (
        <>
          <ButtonGroup variant="contained" ref={anchorRef} disableElevation>
            <Button
              onClick={
                options[selectedIndex] === "Novo"
                  ? aoClicarEmNovo
                  : options[selectedIndex] === "Salvar"
                  ? aoClicarEmSalvar
                  : options[selectedIndex] === 'Apagar'
                  ? aoClicarEmApagar
                  : undefined
              }
            >
              {options[selectedIndex]}
            </Button>
            <Button size="small" onClick={handleToggle} disableRipple>
              <Icon>arrow_drop_down_icon</Icon>
            </Button>
          </ButtonGroup>
          <Popper
            sx={{
              zIndex: 1,
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndex}
                          onClick={() => handleMenuItemClick(index)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      )}

      {
        (
          mostrarBotaoVoltar && (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEVoltar || smDown)
        ) && (
          <Divider variant="middle" orientation="vertical" />
        )
      }

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

import { ReactNode, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Icon, IconButton, TextField, Typography } from "@mui/material";
import * as yup from 'yup';

import { useAppThemeContext, useAuthContext } from "../../contexts";

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(5)
})

interface ILoginProps{
    children?: ReactNode;
}

export const Login = ({children}: ILoginProps) => {
    const { isAuthenticated, login } = useAuthContext();
    const { toggleTheme } = useAppThemeContext();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = () => {
        setIsLoading(true);

        loginSchema.validate({ email, password }, { abortEarly: false }).then((dadosValidados) => {
            login(dadosValidados.email, dadosValidados.password).then(() => {
                setIsLoading(false);
            })
        })
        .catch((errors: yup.ValidationError) => {
            setIsLoading(false);
            errors.inner.forEach(error => {
                if(error.path === 'email'){
                    setEmailError(error.message);
                }else if(error.path === 'password'){
                    setPasswordError(error.message);
                }
            })
        })
        
    }

    if (isAuthenticated) return (
        <>{children}</>
    )

    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2} width={250}>
              <Typography variant="h6" align="center">
                Identifique-se
              </Typography>

              <TextField
                fullWidth
                type="email"
                label="Email"
                value={email}
                disabled={isLoading}
                error={!!emailError}
                helperText={emailError}
                onChange={(e) => {
                  setEmail(e.target.value);
                  emailError ? setEmailError("") : undefined;
                }}
              />
              <TextField
                label="Senha"
                type="password"
                value={password}
                disabled={isLoading}
                error={!!passwordError}
                helperText={passwordError}
                onChange={(e) => {
                  setPassword(e.target.value);
                  passwordError ? setPasswordError("") : undefined;
                }}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Box width="100%" display="flex" justifyContent='space-between'>
              <Button
                variant="contained" 
                disabled={isLoading} 
                onClick={handleSubmit}
                endIcon={isLoading ? <CircularProgress color='inherit' size={20} /> : undefined}
              >
                Entrar
              </Button>
              <IconButton disabled={isLoading} onClick={toggleTheme} title='Alternar tema'>
                <Icon>dark_mode</Icon>
              </IconButton>
            </Box>
          </CardActions>
        </Card>
      </Box>
    );
};
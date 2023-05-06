import { BrowserRouter } from "react-router-dom";

import './shared/forms/TraducoesYup';

import { AppRoutes } from "./routes";
import { AppThemeProvider, AuthProvider, DrawerProvider } from "./shared/contexts";
import { MenuLateral } from "./shared/components";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <AuthProvider>
          <BrowserRouter>
            <MenuLateral>
              <AppRoutes />
            </MenuLateral>
          </BrowserRouter>
        </AuthProvider>
      </DrawerProvider>
    </AppThemeProvider>
  );
};

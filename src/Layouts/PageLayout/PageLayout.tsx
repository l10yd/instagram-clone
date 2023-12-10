import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { Flex, Box, Spinner } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";

interface PageLayoutProps {
  children: ReactNode;
}

//каждая страница обернута в этот компонент

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  //сайдбар будет рендериться только если юзер авторизован
  const canRenderSidebar = pathname !== "/auth" && user;
  //хедер рендерится, если юзер не авторизован и на любой странице кроме auth
  const canRenderNavbar = !user && !loading && pathname !== "/auth";

  //пока грузится, рендерит крутилку-загрузку
  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) {
    return <PageLayoutSpinner />;
  }

  return (
    <>
      <Flex flexDirection={canRenderNavbar ? "column" : "row"}>
        {/* сайдбар слева */}
        {canRenderSidebar && (
          <Box w={{ base: "70px", md: "240px" }}>
            <Sidebar />
          </Box>
        )}

        {/* хедер */}
        {canRenderNavbar && <Navbar />}

        {/* основной контент, справа или по центру(если без сайдбара) */}
        <Box
          flex={1}
          width={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
          marginX={"auto"}
        >
          {children}
        </Box>
      </Flex>
    </>
  );
};

export default PageLayout;

//крутилка загрузка
const PageLayoutSpinner = () => {
  return (
    <Flex
      flexDir="column"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="xl" />
    </Flex>
  );
};

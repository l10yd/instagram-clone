import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";

interface PageLayoutProps {
  children: ReactNode;
}

//каждая страница обернута в этот компонент

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <>
      <Flex>
        {/* сайдбар слева, не рендерится на авторизации */}
        {pathname !== "/auth" && (
          <Box w={{ base: "70px", md: "240px" }}>
            <Sidebar />
          </Box>
        )}

        {/* контент справа */}
        <Box flex={1} w={{ base: "calc(100%-70px)", md: "calc(100%-240px)" }}>
          {children}
        </Box>
      </Flex>
    </>
  );
};

export default PageLayout;

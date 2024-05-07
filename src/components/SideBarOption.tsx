import { FC, FunctionComponent } from "react";
import { useRouter } from "next/router";
import { Box, Text, Icon, type BoxProps } from "@chakra-ui/react";

export type SidebarOptionProps = {
  icon: FunctionComponent;
  paths: string[];
} & BoxProps;

export const SidebarOption: FC<SidebarOptionProps> = ({
  icon,
  paths,
  children,
  ...forward
}) => {
  const { push, pathname } = useRouter();
  const selected = paths.includes(pathname);
  return (
    <Box
      pos="relative"
      columnGap={3}
      cursor="pointer"
      onClick={() => push(paths[0])}
      rounded="sm"
      bgColor={selected ? "brand.100" : "transparent"}
      _hover={selected ? {} : { bgColor: "brand.100", color: "black" }}
      color={selected ? "black" : "brand.900"}
      pointerEvents={pathname === paths[0] ? "none" : "all"}
      pr={3}
      pl={10}
      py={2}
      fontWeight={500}
      {...forward}
      userSelect="none"
    >
      <Icon pos="absolute" left={3} top="9px" as={icon} fontSize="1.25rem" />
      <Text>{children}</Text>
    </Box>
  );
};

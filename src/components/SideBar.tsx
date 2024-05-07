import { type FC } from "react";
import { Grid, GridItem, Text, Icon } from "@chakra-ui/react";
import { HiX } from "react-icons/hi";
import { SidebarOption, type SidebarOptionProps } from "./SideBarOption";

export const Sidebar: FC<{
  onClose?: Function;
  options: {
    scrollOptions: SidebarOptionProps[];
    fixedOptions?: SidebarOptionProps[];
  };
}> = ({ onClose, options }) => {
  return (
    <Grid templateRows="1fr 0fr" h="full" rowGap={5} bg={"brand.50"}>
      <GridItem>
        <Grid autoFlow="row">
          <GridItem borderBottom="1px solid" borderBottomColor="whiteAlpha.200">
            <Grid
              templateColumns="1fr 0fr"
              h={5}
              alignItems="center"
              px={{ base: 3, lg: 6 }}
            >
              <GridItem>{/* <Logo size="sm" path="/_home" /> */}</GridItem>
              <GridItem>
                {onClose && (
                  <Icon
                    display="inline"
                    verticalAlign="-7px"
                    fontSize="2xl"
                    as={HiX}
                    color="black"
                    cursor="pointer"
                    onClick={() => onClose()}
                  />
                )}
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            <Grid autoFlow="row" rowGap={4} pt={4}>
              {options.scrollOptions.map((option, j) => (
                <GridItem key={`sidebar-option-${j}`}>
                  <SidebarOption {...option} />
                </GridItem>
              ))}
            </Grid>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        <Grid autoFlow="row" rowGap={2}>
          {options?.fixedOptions &&
            options.fixedOptions.map((option, j) => (
              <GridItem key={`sidebar-option-${j}`}>
                <SidebarOption {...option} />
              </GridItem>
            ))}
          {/* Buffers */}
          <GridItem />
          <GridItem />
          <GridItem />
        </Grid>
      </GridItem>
    </Grid>
  );
};

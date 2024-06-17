import React, {
  FormEvent,
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Switch,
} from "@chakra-ui/react";
import { RestroDashboardLayout } from "@/components/layouts/RestroDashboardLayout";
import { DiscountCondition } from "../../../../../packages/enums/DiscountCondition";
import { DiscountType } from "../../../../../packages/enums/DiscountType";
import { MenuItem } from "../../../../../packages/types/entity/MenuItem";
import { useRestroStore } from "@/hooks/useRestroStore";
import { Modal } from "../../../../../packages/types/common/modal";
import AddCombinationModal from "@/components/Modals/CouponModals/AddCombinationModal";
import { useModal } from "@/hooks/useModal";
import MenuItemCardSmall from "@/components/RestaurantPanel/menuItems/MenuItemCardSmall";
import AddFreeItemModal from "@/components/Modals/CouponModals/AddFreeItemModal";
import { ICoupon } from "../../../../../packages/types/entity/ICoupon.";
import { useNotification } from "@/hooks/useNotification";
import { useCoupon } from "@/hooks/useCoupon";

const RestroNewCouponPage = () => {
  const {
    state: { restaurant },
  } = useRestroStore();
  const { modal, setModal } = useModal();
  const { setNotification } = useNotification();
  const { createCoupon } = useCoupon();
  const menuItems = restaurant?.menuItems;

  const [codeType, setCodeType] = useState<"random" | "custom">("random");
  const [code, setCode] = useState<string>("");

  const [condition, setCondition] = useState<DiscountCondition>(
    DiscountCondition.AMOUNT
  );
  const [billAmount, setBillAmount] = useState<string>("");
  const [combination, setCombination] = useState<MenuItem[]>([]);

  const [discountType, setDiscountType] = useState<DiscountType>(
    DiscountType.FLAT
  );

  const [giftItem, setGiftItem] = useState<MenuItem | null>(null);
  const [discount, setDiscount] = useState<string>("");
  const [limit, setLimit] = useState<string | undefined>(undefined);
  const [upto, setUpTo] = useState<string>("");
  const [activated, setActivated] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);

  const CombinationItemsModal: Modal = {
    title: "Select Menu Items",
    ModalBody: () => (
      <AddCombinationModal
        options={menuItems || []}
        combination={combination}
        setCombination={setCombination}
      />
    ),
  };

  const GiftItemModal: Modal = {
    title: "Select Gift Item",
    ModalBody: () => (
      <AddFreeItemModal
        item={giftItem}
        setItem={setGiftItem}
        options={menuItems || []}
      />
    ),
  };

  useEffect(() => {
    if (combination.length == 0 && !modal) {
      setCondition(DiscountCondition.AMOUNT);
    }
    if (!giftItem && !modal) {
      setDiscountType(DiscountType.FLAT);
    }
  }, [modal]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createCoupon({
      codeType,
      code,
      condition,
      billAmount,
      combination,
      discountType,
      giftItem,
      limit,
      upto,
      discount,
      activated,
      isPublic,
    });
  };
  return (
    <Box
      w="100%"
      h="100%"
      overflow="scroll"
      p={6}
      bg="white"
      boxShadow="md"
      borderRadius="md"
    >
      <Heading mb={6} color={"brand.900"}>
        Create New Coupon
      </Heading>
      <form onSubmit={handleSubmit}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl id="codeType" isRequired>
              <FormLabel>Coupon Code Type</FormLabel>
              <RadioGroup
                name="codeType"
                value={codeType}
                onChange={(value) => setCodeType(value as "random" | "custom")}
              >
                <Stack direction="row">
                  <Radio value="random">Random</Radio>
                  <Radio value="custom">Custom</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </GridItem>
          {codeType === "custom" && (
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl id="code" isRequired>
                <FormLabel>Coupon Code</FormLabel>
                <Input
                  name="code"
                  value={code}
                  onChange={(e) => {
                    const code = e.target.value;
                    code.length < 15 && setCode(code.trim().toUpperCase());
                  }}
                />
              </FormControl>
            </GridItem>
          )}
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl id="code">
              <FormLabel>Total Redemptions</FormLabel>

              <Input
                name="redemptions"
                placeholder="Empty Value reffers no limit"
                _placeholder={{ color: "brand.900", opacity: 1 }}
                type="number"
                value={limit}
                onChange={(e) => {
                  const value = e.target.value;
                  setLimit(value);
                }}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl id="condition" isRequired>
              <FormLabel>Discount Condition</FormLabel>
              <RadioGroup
                name="condition"
                value={condition}
                onChange={(value) => {
                  value === DiscountCondition.COMBINATION &&
                    combination.length == 0 &&
                    setModal(CombinationItemsModal);
                  setCondition(value as DiscountCondition);
                }}
              >
                <Stack direction="row">
                  <Radio value={DiscountCondition.AMOUNT}>Amount</Radio>
                  <Radio value={DiscountCondition.COMBINATION}>
                    Combination
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </GridItem>
          {condition === DiscountCondition.AMOUNT ? (
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl id="billAmount" isRequired>
                <FormLabel>Minimum Bill Amount</FormLabel>
                <Input
                  type="number"
                  name="billAmount"
                  value={billAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    setBillAmount(value);
                  }}
                />
              </FormControl>
            </GridItem>
          ) : (
            <GridItem colSpan={{ base: 1, md: 2 }}>
              {combination.length != 0 && (
                <Flex
                  flexDirection={"row"}
                  columnGap={3}
                  alignItems={"center"}
                  flexWrap={"wrap"}
                  rowGap={3}
                >
                  {combination.map((item) => (
                    <MenuItemCardSmall key={item._id} item={item} />
                  ))}
                  <Button
                    bg={"brand.900"}
                    color={"white"}
                    size={"sm"}
                    sx={{
                      ":hover": {
                        bgColor: "brand.600",
                      },
                    }}
                    onClick={() => {
                      setModal(CombinationItemsModal);
                    }}
                  >
                    Edit
                  </Button>
                </Flex>
              )}
            </GridItem>
          )}
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl id="type" isRequired>
              <FormLabel>Discount Type</FormLabel>
              <RadioGroup
                name="type"
                value={discountType}
                onChange={(value) => {
                  value == DiscountType.GIFT_ITEM &&
                    !giftItem &&
                    setModal(GiftItemModal);
                  setDiscountType(value as DiscountType);
                }}
              >
                <Stack direction="row">
                  <Radio value={DiscountType.FLAT}>Flat</Radio>
                  <Radio value={DiscountType.PERCENTAGE}>Percentage</Radio>
                  <Radio value={DiscountType.GIFT_ITEM}>Gift Item</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </GridItem>
          {(discountType === DiscountType.FLAT ||
            discountType === DiscountType.PERCENTAGE) && (
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                rowGap={3}
                columnGap={3}
              >
                <FormControl id="discount" isRequired>
                  <FormLabel>
                    {discountType === DiscountType.FLAT
                      ? "Flat Amount"
                      : "Percentage Value"}
                  </FormLabel>
                  <Input
                    type="number"
                    name="discount"
                    value={discount}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDiscount(value);
                    }}
                  />
                </FormControl>

                {discountType === DiscountType.PERCENTAGE && (
                  <FormControl id="discount" isRequired>
                    <FormLabel>Upto Amount</FormLabel>
                    <Input
                      type="number"
                      name="upto"
                      value={upto}
                      onChange={(e) => {
                        const value = e.target.value;
                        setUpTo(value);
                      }}
                    />
                  </FormControl>
                )}
              </Flex>
            </GridItem>
          )}
          {discountType === DiscountType.GIFT_ITEM && (
            <GridItem colSpan={{ base: 1, md: 2 }}>
              {giftItem && (
                <Flex>
                  <MenuItemCardSmall item={giftItem} />
                  <Button
                    bg={"brand.900"}
                    color={"white"}
                    size={"sm"}
                    sx={{
                      ":hover": {
                        bgColor: "brand.600",
                      },
                    }}
                    onClick={() => {
                      setModal(GiftItemModal);
                    }}
                  >
                    Edit
                  </Button>
                </Flex>
              )}
            </GridItem>
          )}
          <Grid gap={6}>
            <GridItem>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="activated" mb="0">
                  Activated
                </FormLabel>
                <Switch
                  id="activated"
                  name="activated"
                  isChecked={activated}
                  onChange={(e) => {
                    setActivated(e.target.checked);
                  }}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="isPublic" mb="0">
                  Public Coupon
                </FormLabel>
                <Switch
                  id="isPublic"
                  name="isPublic"
                  isChecked={isPublic}
                  onChange={(e) => {
                    setIsPublic(e.target.checked);
                  }}
                />
              </FormControl>
            </GridItem>
          </Grid>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Button colorScheme="teal" type="submit" w="full">
              Create Coupon
            </Button>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
};

RestroNewCouponPage.getLayout = (page: ReactElement) => (
  <RestroDashboardLayout>{page}</RestroDashboardLayout>
);

export default RestroNewCouponPage;

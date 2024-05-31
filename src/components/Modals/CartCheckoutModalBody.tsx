import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useStore } from "@/hooks/useStore";
import UserPanelMenuCard from "../UserPanel/Cards/UserPanelMenuCard";
import NoCartItems from "../UserPanel/NoCartItems";
import { BiNote, BiRightArrowAlt, BiSad } from "react-icons/bi";
import { Address } from "../../../packages/types/entity/Address";
import { RiBillFill } from "react-icons/ri";
import { User } from "../../../packages/types/entity/User";
import AddressCard from "../UserPanel/Cards/AddressCard";
import { FaAddressCard } from "react-icons/fa";
import { axios } from "../../../packages/axios";
import { IBill } from "../../../packages/types/entity/IBill";
import BillCard from "../UserPanel/Cards/BillCard";
import { useModal } from "@/hooks/useModal";
import { useNotification } from "@/hooks/useNotification";
import { useOrder } from "@/hooks/useOrder";

function CartCheckoutModalBody() {
  const { state } = useStore();
  const { setModal } = useModal();
  const { setNotification } = useNotification();
  const { placeOrder } = useOrder();
  const cart = state.cart;
  const user = state.user as User;
  const userAddress = user.addressList;
  const router = useRouter();
  const [note, setNote] = useState<string | null>(null);
  const [noteEdit, setNoteEdit] = useState<boolean>(false);
  const [savedNote, setSavedNote] = useState<string | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [addressEdit, setAddressEdit] = useState<boolean>(false);
  const [billLoading, setBillLoading] = useState<boolean>(false);
  const [bill, setBill] = useState<IBill | null>(null);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const id = router.query.id as string;
  const cartItems = cart[id] || [];
  const menuItemList = cartItems.map((item) => item.menuItem);
  const [billError, setBillError] = useState<string | null>(null);

  const handleNoteSave = () => {
    if (note === null || note === "") {
      setSavedNote(null);
    } else {
      setSavedNote(note);
    }

    setNoteEdit(false);
  };

  const handleClearNote = () => {
    setNote(null);
  };

  useEffect(() => {
    if (address && !addressEdit) {
      setBillLoading(true);
      (async () => {
        try {
          setBillError(null);
          const res = await axios.post("/order/bill", {
            restaurantId: id,
            userAddress: address,
          });
          const { data } = res;
          if (data.success) {
            setBill(data.bill);
            setBillLoading(false);
          } else {
            setBill(null);
            setBillLoading(false);
            setBillError(data.message);
          }
        } catch (error) {
          setBill(null);
          setBillLoading(false);
          setBillError("Could'nt deliver to this Address");
        }
      })();
    }
  }, [address, addressEdit, cartItems]);

  const handleOrder = async () => {
    setOrderLoading(true);
    if (!bill) return;
    setNotification(await placeOrder(id, address?._id, note, bill.toPay));
    setOrderLoading(false);
    setModal(null);
  };

  return (
    <>
      {cartItems.length == 0 && <NoCartItems />}
      {cartItems.length > 0 && (
        <Box>
          {!addressEdit && (
            <>
              <Flex
                flexWrap={"wrap"}
                flexDirection={"row"}
                columnGap={2}
                rowGap={2}
              >
                {menuItemList.map((menuItem) => (
                  <UserPanelMenuCard
                    menuItem={menuItem}
                    restaurantId={id}
                    key={menuItem.id}
                    isCartItem={true}
                  />
                ))}
              </Flex>
              {(!savedNote || noteEdit) && (
                <Flex
                  height={"30px"}
                  borderRadius={"10px"}
                  maxWidth={"fit-content"}
                  px={1}
                  boxShadow={"lg"}
                  mt={3}
                  bg={"brand.900"}
                  flexDirection={"row"}
                  columnGap={1}
                  alignItems={"center"}
                  color={"white"}
                  fontSize={"0.8em"}
                  onClick={() => {
                    setNoteEdit(true);
                  }}
                  cursor={"pointer"}
                >
                  <Icon as={BiNote}></Icon>
                  <Text>Add a note for the restaurant</Text>
                </Flex>
              )}
              {savedNote && !noteEdit && (
                <Text
                  color={"brand.900"}
                  onClick={() => {
                    setNoteEdit(true);
                  }}
                  cursor={"pointer"}
                >
                  Note for the restaurant
                </Text>
              )}
              {(noteEdit || savedNote) && (
                <Box mt={2}>
                  <Textarea
                    value={note || ""}
                    onChange={(e) => setNote(e.target.value)}
                    boxShadow="lg"
                    bg="white"
                    minH="80px"
                    maxW="full"
                    overflowWrap="break-word"
                    resize="none"
                    whiteSpace="pre-wrap"
                    wordBreak="break-word"
                    pb={1}
                    disabled={!noteEdit}
                  />
                  <Flex
                    h={"40px"}
                    w={"full"}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    px={1}
                    columnGap={1}
                  >
                    {noteEdit && (
                      <Button
                        bg={"brand.900"}
                        color={"white"}
                        size={"sm"}
                        sx={{
                          ":hover": {
                            bgColor: "brand.600",
                          },
                        }}
                        onClick={handleClearNote}
                      >
                        Clear
                      </Button>
                    )}
                    {noteEdit && (
                      <Button
                        bg={"brand.900"}
                        color={"white"}
                        size={"sm"}
                        sx={{
                          ":hover": {
                            bgColor: "brand.600",
                          },
                        }}
                        onClick={handleNoteSave}
                      >
                        Save
                      </Button>
                    )}
                  </Flex>
                </Box>
              )}

              {address && (
                <>
                  <Box
                    mt={2}
                    boxShadow={"lg"}
                    w={"full"}
                    minH={"30px"}
                    borderRadius={"10px"}
                    p={4}
                    border={"solid"}
                    borderWidth={"1px"}
                    borderColor={"brand.200"}
                    cursor={"pointer"}
                    onClick={() => {
                      setAddressEdit(true);
                    }}
                  >
                    <Flex direction={"row"} columnGap={1} alignItems={"center"}>
                      <Icon as={FaAddressCard}></Icon>
                      <Text>Delivery At</Text>
                    </Flex>
                    <Text
                      fontSize={"0.8em"}
                    >{`${address.addressLine},${address.city},${address.zipCode}`}</Text>
                  </Box>
                  <Box
                    mt={2}
                    boxShadow={"lg"}
                    w={"full"}
                    minH={"30px"}
                    borderRadius={"10px"}
                    p={4}
                    border={"solid"}
                    borderWidth={"1px"}
                    borderColor={"brand.200"}
                  >
                    {billLoading && (
                      <Flex
                        direction={"row"}
                        alignItems={"center"}
                        columnGap={2}
                      >
                        <Icon as={RiBillFill}></Icon>
                        Total Bill: ₹ <Spinner />
                      </Flex>
                    )}
                    {!billLoading && bill && <BillCard bill={bill} />}
                    {!billLoading && billError && (
                      <Text color={"red"}> {billError}</Text>
                    )}
                  </Box>
                  {!billLoading && !billError && (
                    <Flex
                      mt={3}
                      h={"30px"}
                      w={"full"}
                      borderRadius={"10px"}
                      bg={"brand.900"}
                      cursor={"pointer"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      color={"white"}
                      pointerEvents={orderLoading ? "none" : "all"}
                      onClick={handleOrder}
                    >
                      {!orderLoading && <Text>Order</Text>}
                      {orderLoading && <Spinner />}
                    </Flex>
                  )}
                </>
              )}

              {!address && (
                <Flex
                  w={"full"}
                  h={"30px"}
                  mt={3}
                  borderRadius={"5px"}
                  bg={"white"}
                  boxShadow={"lg"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={"brand.900"}
                  columnGap={2}
                  cursor={"pointer"}
                  onClick={() => {
                    setAddressEdit(true);
                  }}
                >
                  <Text>Select Address</Text>
                  <Icon as={BiRightArrowAlt}></Icon>
                </Flex>
              )}
            </>
          )}

          {/* select address form */}

          {addressEdit && (
            <>
              {userAddress.length == 0 && (
                <Flex
                  w={"full"}
                  flexDirection={"column"}
                  rowGap={1}
                  alignItems={"center"}
                  color={"brand.900"}
                  fontSize={"1.5em"}
                >
                  <Icon as={BiSad} fontSize={"2em"}></Icon>
                  <Text>No Address</Text>
                  <Text>Please Add Address first</Text>
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
                      router.push("/profile/address");
                    }}
                  >
                    DashBoard
                  </Button>
                </Flex>
              )}
              <Flex flexWrap={"wrap"}>
                {userAddress.map((add) => (
                  <AddressCard
                    address={add}
                    key={add._id}
                    activeAddress={address?._id}
                    setActiveAddress={setAddress}
                  />
                ))}
              </Flex>
              <Flex
                w={"full"}
                mt={2}
                h={"30px"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  bg={"brand.900"}
                  color={"white"}
                  size={"sm"}
                  sx={{
                    ":hover": {
                      bgColor: "brand.600",
                    },
                  }}
                  disabled={!address}
                  onClick={() => {
                    setAddressEdit(false);
                  }}
                  w={"200px"}
                >
                  Done
                </Button>
              </Flex>
            </>
          )}
        </Box>
      )}
    </>
  );
}

export default CartCheckoutModalBody;

import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { Address } from "../../../packages/types/entity/Address";
import { axios } from "../../../packages/axios";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Box } from "@chakra-ui/react";
import MenuPagePlaceholder from "@/components/placeholders/MenuPagePlaceholder";
import RestaurantMenu from "@/components/RestaurantMenuPage/RestaurantMenu";

interface IMenuItem {
  name: string;
  price: number;
  ratings: string;
  imageUrl: string;
  totalReview: number;
  description: string;
  groupName: string;
  id: string;
}

interface RestroMenuResult {
  id: string;
  name: string;
  outlets: Address[];
  cuisins: string[];
  menuItems: IMenuItem[];
  logoUrl: string;
  ratings: string;
  menuGroups: string[];
}
function RestaurantMenuPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const [loading, setLoading] = useState<boolean>(true);
  const [restaurant, setRestaurant] = useState<RestroMenuResult | null>(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await axios.get(`/search/restro-menu/${id}`);
        const { data } = res;
        if (data.success) {
          setTimeout(() => {
            setRestaurant(data.restaurant);
          }, 1500);
        } else {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      } catch (error) {}
    })();
  }, [id]);

  useEffect(() => {
    if (restaurant) {
      setLoading(false);
    }
  }, [restaurant]);

  return (
    <Box w={"full"}>
      {loading && <MenuPagePlaceholder />}
      {restaurant && <RestaurantMenu restaurant={restaurant} />}
      {!loading && !restaurant && <>not found</>}
    </Box>
  );
}

RestaurantMenuPage.getLayout = (page: ReactElement) => (
  <AppLayout>{page}</AppLayout>
);

export default RestaurantMenuPage;

import React, { useState } from "react";
import { ICoupon } from "../../../../packages/types/entity/ICoupon.";
import { Flex } from "@chakra-ui/react";
import CouponCard from "../cards/CouponCard";
import { useCoupon } from "@/hooks/useCoupon";
import { useStore } from "@/hooks/useStore";
import AnimatedLogo from "@/components/AnimatedLogo";

interface Props {
  coupons: ICoupon[];
}

function CouponList({ coupons: _coupons }: Props) {
  const [coupons, setCoupons] = useState<ICoupon[]>(_coupons);
  const [listLoading, setListLoading] = useState<boolean>(false);
  const { toggleActive, deleteCoupon } = useCoupon();
  const handleDelete = async (couponId: string) => {
    setListLoading(true);
    const isDeleted = await deleteCoupon(couponId);
    if (isDeleted) {
      setCoupons((prev) => prev.filter((coupon) => coupon._id != couponId));
    }
    setTimeout(() => {
      setListLoading(false);
    }, 1000);
  };

  const handleToogle = async (couponId: string) => {
    setListLoading(true);
    const isToggled = await toggleActive(couponId);
    if (isToggled) {
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon._id == couponId
            ? { ...coupon, activated: !coupon.activated }
            : { ...coupon }
        )
      );
    }
    setTimeout(() => {
      setListLoading(false);
    }, 1000);
  };
  return (
    <>
      {listLoading && <AnimatedLogo />}
      <Flex
        h={"full"}
        w={"full"}
        flexWrap={"wrap"}
        gap={3}
        justifyContent={"flex-start"}
      >
        {coupons.map((coupon, i) => (
          <CouponCard
            coupon={coupon}
            key={i}
            handleDelete={handleDelete}
            handleToogle={handleToogle}
          />
        ))}
      </Flex>
    </>
  );
}

export default CouponList;

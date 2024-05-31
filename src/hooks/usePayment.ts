import useRazorPay, { RazorpayOptions } from "react-razorpay";
import { axios } from "../../packages/axios";

interface IRazorPayOrder {
  id: string;
  amount: number;
  currency: string;
}

interface IUsePaymentReturns {
  handlePayment: (
    order: IRazorPayOrder
  ) => Promise<{ success: boolean | undefined }>;
}

export const usePayment = (): IUsePaymentReturns => {
  const [Razorpay] = useRazorPay();

  return {
    handlePayment: async (order) => {
      return new Promise((resolve, reject) => {
        const options: RazorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "",
          amount: order.amount.toString(),
          currency: order.currency,
          name: "FlavourFleet",
          description: "Complete the payment to place order",
          image:
            "https://res.cloudinary.com/ddojfhzod/image/upload/v1717068100/flavourfleet/logo.png",
          order_id: order.id,
          handler: async (response: any) => {
            try {
              const { data } = await axios.post("/payment/verify", {
                ...response,
                order_id: order.id,
              });
              if (!data.success) resolve({ success: false });
              resolve({ success: true });
            } catch (error) {
              resolve({ success: false });
            }
          },
          modal: {
            ondismiss: () => {
              resolve({ success: false });
            },
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response: any) {
          resolve({ success: false });
        });

        rzp1.open();
      });
    },
  };
};

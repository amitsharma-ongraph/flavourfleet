import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "./useStore";
import { Nullable } from "../../packages/types/common/nullable";
import { Modal } from "../../packages/types/common/modal";

interface Returns {
  modal: Nullable<Modal>;
  modalLoading: boolean;
  setModal: (modal: Nullable<Modal>) => void;
  setModalLoading: (loading: boolean) => void;
}

export const useModal = (): Returns => {
  const { query } = useRouter();
  const { state, dispatch } = useStore();

  useEffect(() => {
    console.log("modal changed in the useModal", state.modal);
  }, [state.modal]);

  return {
    modal: state.modal,
    modalLoading: state.modalController.loading,
    setModal(modal) {
      console.log("set modal called");
      dispatch({
        type: "setModal",
        data: modal,
      });
    },
    setModalLoading(loading) {
      dispatch({
        type: "setModalController",
        data: {
          loading,
        },
      });
    },
  };
};

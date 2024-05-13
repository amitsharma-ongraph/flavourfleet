import { useState } from "react";
import { axios } from "../../packages/axios";

interface IUseSearchReturns {
  isLoading: boolean;
  getGroupSuggestions: () => Promise<any[]>;
}

const useSearch = (): IUseSearchReturns => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getGroupSuggestions = async () => {
    const res = await axios.get("/search/group-suggestion");
    const { data } = res;
    if (data.success === true) {
      return data.groups;
    }
    return [];
  };
  return {
    isLoading,
    getGroupSuggestions,
  };
};

export default useSearch;

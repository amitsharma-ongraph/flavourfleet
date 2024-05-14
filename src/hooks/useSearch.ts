import { axios } from "../../packages/axios";
import _axios from "axios";
import { CancelTokenSource } from "axios";

interface IUseSearchReturns {
  getGroupSuggestions: () => Promise<any[]>;
  getSearchOptions: (keyword: string) => Promise<any[]>;
}

const useSearch = (): IUseSearchReturns => {
  let cancleTokenSource: CancelTokenSource | null = null;

  const getGroupSuggestions = async () => {
    const res = await axios.get("/search/group-suggestion");
    const { data } = res;
    if (data.success === true) {
      return data.groups;
    }
    return [];
  };
  return {
    getGroupSuggestions,
    getSearchOptions: async (keyword) => {
      if (cancleTokenSource) {
        cancleTokenSource.cancel("");
      }

      cancleTokenSource = _axios.CancelToken.source();
      try {
        const response = await axios.get(`/search/search-options/${keyword}`, {
          cancelToken: cancleTokenSource.token,
        });
        return response.data.searchOptions;
      } catch (error) {
        if (_axios.isCancel(error)) {
          console.log("Previous request canceled:", error.message);
        } else {
          console.error("Error fetching search results:", error);
        }
        return [];
      }
    },
  };
};

export default useSearch;

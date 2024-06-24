import { axios } from "../../packages/axios";
import _axios from "axios";
import { CancelTokenSource } from "axios";

interface IUseSearchReturns {
  getGroupSuggestions: () => Promise<any[]>;
  getSearchOptions: (keyword: string) => Promise<any[]>;
}

const useSearch = (): IUseSearchReturns => {
  let cancleTokenSource: CancelTokenSource | null = null;

  return {
    getGroupSuggestions: async () => {
      const res = await axios.get("/search/group-suggestion");
      const { data } = res;
      if (data.success === true) {
        return data.groups;
      }
      return [];
    },
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
        return [];
      }
    },
  };
};

export default useSearch;

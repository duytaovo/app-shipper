import httpRequest from "../../utils/httpRequest";

const statisticApi = {
  getStatic(data: any) {
    return httpRequest.get("/manage/statistic", data);
  },
};

export default statisticApi;


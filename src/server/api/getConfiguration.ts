import { BasicService } from '../index';

class GetConfigurationApi extends BasicService {
  getDetails = () => this.fetcher.get('/configuration');
}

const getConfigurationApi = new GetConfigurationApi();

export default getConfigurationApi;

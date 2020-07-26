import { fetchInstance } from 'utils/fetch';
import { AxiosResponse, CancelTokenSource } from 'axios';

export default async function fetchAutocomplete(
  query: string,
  source: CancelTokenSource
): Promise<AxiosResponse<any>> {
  return fetchInstance.get(
    `https://www.omio.com.ua/suggester-api/v5/position?term=${query}&locale=uk&hierarchical=true`,
    {
      cancelToken: source.token
    }
  );
}

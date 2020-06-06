import { fetchInstance } from 'utils/fetch';
import { AxiosResponse } from 'axios';

export default async function fetchAutocomplete(
  query: string
): Promise<AxiosResponse<any>> {
  return fetchInstance.get(
    `https://www.omio.com.ua/suggester-api/v5/position?term=${query}&locale=uk&hierarchical=true`
  );
}

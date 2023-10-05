import { DeleteData, GetData, PostData, SetAuthToken } from '../utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  const createProductMutation = useMutation(
    async ({ name, desc, type, banner, unit, price, available, suplier }) => {
      const response = await PostData('product/create', {
        name,
        desc,
        type,
        banner,
        unit,
        price,
        available,
        suplier,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['product']);
        // queryClient.invalidateQueries(['product', data._id], { exact: true });
        queryClient.setQueryData(['product', data._id], data);
        console.log('useCreateProductMutation:', data);
      },
    }
  );

  return createProductMutation;
}

export function useProductCategoryQuery(type) {
  const productCategoryQuery = useQuery({
    queryKey: ['product', type],
    queryFn: async () => {
      const response = await GetData(`category/${type}`);
      return response.data;
    },
  });

  return productCategoryQuery;
}

export function useProductIdQuery(id) {
  const productIdQuery = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await GetData(`${id}`);
      return response.data;
    },
  });

  return productIdQuery;
}

export function useGetProductsByIdsArrayMutation() {
  const queryClient = useQueryClient();

  const getProductsByIdsArrayMutation = useMutation(
    async ({ ids }) => {
      const response = await PostData('ids', { ids });
      return response.data;
    },
    {
      onSuccess: (data) => {
        const idArray = data.data.map((item) => item._id);
        data.data.forEach((product) => {
          queryClient.invalidateQueries(['product', product._id], {
            exact: true,
          });
          queryClient.setQueryData(['product', product._id], product);
        });
        // queryClient.invalidateQueries(['product', data], { exact: true });
        console.log('useGetProductsByIdsArrayMutation:', idArray);
      },
    }
  );

  return getProductsByIdsArrayMutation;
}

export function useAllProductsQuery() {
  const allProductsQuery = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const response = await GetData('');
      return response.data;
    },
  });

  return allProductsQuery;
}

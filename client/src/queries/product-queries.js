import { DeleteData, GetData, PostData } from '../utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  const createProductMutation = useMutation(
    async ({
      name,
      description,
      category_type,
      imageData,
      quantity,
      price,
      active,
    }) => {
      const response = await PostData('product/create', {
        name,
        description,
        category_type,
        imageData,
        quantity,
        price,
        active,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['product']);
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
      const response = await GetData(`product/category/${type}`);
      return response.data;
    },
  });

  return productCategoryQuery;
}

export function useProductIdQuery(id) {
  const productIdQuery = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await GetData(`product/${id}`);
      return response.data;
    },
  });

  return productIdQuery;
}

export function useGetProductsByIdsArrayMutation() {
  const queryClient = useQueryClient();

  const getProductsByIdsArrayMutation = useMutation(
    async ({ ids }) => {
      const response = await PostData('product/ids', { ids });
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
      const response = await GetData('product/');
      return response.data;
    },
  });

  return allProductsQuery;
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();

  const deleteProfileMutation = useMutation(
    async (id) => {
      const response = await DeleteData(`product/${id}`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['product']);
        console.log('useDeleteProductMutation:', data);
      },
    }
  );

  return deleteProfileMutation;
}

export function useToggleProductActiveStateMutation() {
  const queryClient = useQueryClient();

  const toggleProductActiveStateMutation = useMutation(
    async (id) => {
      const response = await PostData(`product/toggleactive/${id}`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['product']);
        queryClient.setQueryData(['product', data._id], data);
        console.log('toggleProductActiveStateMutation:', data);
      },
    }
  );

  return toggleProductActiveStateMutation;
}

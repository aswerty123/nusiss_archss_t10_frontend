import { DeleteData, GetData, PostData, SetAuthToken } from '../utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  const createProductMutation = useMutation(
    async ({ name, desc, type, imageData, unit, price, available, active }) => {
      // Create a FormData object and append the file
      let formData = new FormData();
      formData.append('user_id', 'dummy_id');
      formData.append('name', name);
      formData.append('description', desc);
      formData.append('category_type', type);
      formData.append('quantity', unit);
      formData.append('price', price);
      formData.append('active', active);
      formData.append('imageData', imageData);
      // Check if imageData is a single file or a FileList
      if (imageData instanceof FileList) {
        // If it's a FileList, append all files under the same key
        for (let i = 0; i < imageData.length; i++) {
          formData.append('imageData', imageData[i]);
        }
      } else if (imageData instanceof File) {
        // If it's a single File, append it directly under the key "imageData"
        formData.append('imageData', imageData);
      }
      // to log the form data
      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      const response = await PostData('product/create', formData);
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
      const response = await GetData(`products/category/${type}`);
      return response.data;
    },
  });

  return productCategoryQuery;
}

export function useProductIdQuery(id) {
  const productIdQuery = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await GetData(`products/${id}`);
      return response.data;
    },
  });

  return productIdQuery;
}

export function useGetProductsByIdsArrayMutation() {
  const queryClient = useQueryClient();

  const getProductsByIdsArrayMutation = useMutation(
    async ({ ids }) => {
      const response = await PostData('products/ids', { ids });
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
      const response = await GetData('products/');
      return response.data;
    },
  });

  return allProductsQuery;
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();

  const deleteProfileMutation = useMutation(
    async (id) => {
      const response = await DeleteData(`products/${id}`);
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

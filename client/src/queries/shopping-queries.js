import { DeleteData, GetData, PostData, SetAuthToken } from '../utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

//===================================================== Cart

export function useAddToCartMutation() {
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation(
    async ({ product_id, qty }) => {
      const response = await PostData('shopping/cart', { product_id, qty });
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['cart']);
        //   queryClient.setQueryData(['cart'], data);
        console.log('addToCartMutation:', data);
      },
    }
  );

  return addToCartMutation;
}

export function useDeleteFromCartMutation() {
  const queryClient = useQueryClient();

  const deleteFromCartMutation = useMutation(
    async ({ id }) => {
      const response = await DeleteData(`shopping/cart/${id}`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['cart']);
        //   queryClient.setQueryData(['cart'], data);
        console.log('deleteFromCartMutation:', data);
      },
    }
  );

  return deleteFromCartMutation;
}

export function useCartQuery() {
  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await GetData('shopping/cart');
      return response.data;
    },
  });

  return cartQuery;
}

//===================================================== Wishlist

export function useAddToWishlistMutation() {
  const queryClient = useQueryClient();

  const addToWishlistMutation = useMutation(
    async ({ product_id }) => {
      const response = await PostData('shopping/wishlist', { product_id });
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['wishlist']);
        //   queryClient.setQueryData(['cart'], data);
        console.log('addToWishlistMutation:', data);
      },
    }
  );

  return addToWishlistMutation;
}

export function useDeleteFromWishlistMutation() {
  const queryClient = useQueryClient();

  const deleteFromWishlistMutation = useMutation(
    async ({ id }) => {
      const response = await DeleteData(`shopping/wishlist/${id}`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['wishlist']);
        //   queryClient.setQueryData(['cart'], data);
        console.log('deleteFromCartMutation:', data);
      },
    }
  );

  return deleteFromWishlistMutation;
}

export function useWishlistQuery() {
  const wishlistQuery = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const response = await GetData('shopping/wishlist');
      return response.data;
    },
  });

  return wishlistQuery;
}

//===================================================== order

export function useCreateOrderMutation() {
  const queryClient = useQueryClient();

  const createOrderMutation = useMutation(
    async () => {
      const response = await PostData('shopping/order');
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['order']);
        queryClient.setQueryData(['order', data._id], data);
        console.log('createOrderMutation:', data);
      },
    }
  );

  return createOrderMutation;
}

export function useOrderIdQuery(id) {
  const productIdQuery = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const response = await GetData(`shopping/order/${id}`);
      return response.data;
    },
  });

  return productIdQuery;
}

export function useAllOrdersQuery(id) {
  const productIdQuery = useQuery({
    queryKey: ['order'],
    queryFn: async () => {
      const response = await GetData(`shopping/orders`);
      return response.data;
    },
  });

  return productIdQuery;
}

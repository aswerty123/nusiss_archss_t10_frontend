import { DeleteData, GetData, PostData, SetAuthToken } from '../utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useSignUpMutation() {
  const queryClient = useQueryClient();

  const signUpMutation = useMutation(
    async ({ email, password, phone, role }) => {
      const response = await PostData('customer/signup', {
        email,
        password,
        phone,
        role,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['login'], { exact: true });
        queryClient.setQueryData(['login'], data);
        console.log('useSignUpMutation', data);
        SetAuthToken(data);
        window.location.href = '/home';
      },
    }
  );

  return signUpMutation;
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation(
    async ({ email, password }) => {
      const response = await PostData('customer/login', {
        email,
        password,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['login'], { exact: true });
        queryClient.setQueryData(['login'], data);
        console.log('useLoginMutation:', data);
        SetAuthToken(data);
        window.location.href = '/home';
      },
    }
  );

  return loginMutation;
}

export function useProfileQuery() {
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await GetData('customer/profile');
      return response.data;
    },
  });

  return profileQuery;
}

export function useAddAddressMutation() {
  const queryClient = useQueryClient();

  const addAddressMutation = useMutation(
    async ({ street, postalCode, city, country }) => {
      const response = await PostData('customer/address', {
        street,
        postalCode,
        city,
        country,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['profile'], { exact: true });
        queryClient.setQueryData(['profile'], data);
        console.log('useAddAddressMutation:', data);
      },
    }
  );

  return addAddressMutation;
}

export function useDeleteProfileMutation() {
  const queryClient = useQueryClient();

  const deleteProfileMutation = useMutation(
    async () => {
      const response = await DeleteData('customer/profile');
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['profile'], { exact: true });
        console.log('useDeleteProfileMutation:', data);
      },
    }
  );

  return deleteProfileMutation;
}

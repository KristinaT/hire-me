import http from './http';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Child } from '../types';

const fetchChildrenList = async () => {
  const queryParams = {
    groupId: '86413ecf-01a1-44da-ba73-1aeda212a196',
    institutionId: 'dc4bd858-9e9c-4df7-9386-0d91e42280eb'
  };
  
  const url = `/daycare/tablet/group`;
  
  const response = await http.get(url, {
    params: queryParams
  });

  return response.data.children;
}

export const useFetchChildrenList = () => useQuery<Array<Child>>(['children', 'items'],fetchChildrenList);

const checkInChild = async ({ childId, pickupTime }: {childId:string, pickupTime: string}) => {
  const url = `v2/children/${childId}/checkins`;
  const data = {
    pickupTime
  }

  const response = await http.post(url, data);

  return response.data;
}

export const useCheckInChild = () => {
  const queryClient = useQueryClient();

  return useMutation(checkInChild, {
    onSettled: () => {
      queryClient.invalidateQueries(['children', 'items'])
    }
  })
}

const checkOutChild = async (childId: string) => {
  const url = `v2/children/${childId}/checkout`;

  const response = await http.post(url);

  return response.data;
}

export const useCheckOutChild = () => {
  const queryClient = useQueryClient();

  return useMutation(checkOutChild, {
    onSettled: () => {
      queryClient.invalidateQueries(['children', 'items'])
    }
  })
}
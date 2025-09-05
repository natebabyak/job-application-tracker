import useSWR from "swr";

const fetcher = (input: string) => fetch(input).then((res) => res.json());

export function useApplications() {
  const { data, error, isLoading } = useSWR("/api/applications/me", fetcher);

  return {
    applications: data,
    error,
    isLoading,
  };
}

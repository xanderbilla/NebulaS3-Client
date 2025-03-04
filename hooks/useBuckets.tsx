import useSWR from "swr";

const fetcher = (url: string) => {
    const sessionToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('sessionToken='))
        ?.split('=')[1];

    return fetch(url, {
        headers: new Headers({
            'Content-Type': 'application/json',
            ...(sessionToken && { 'sessionToken': sessionToken }),
        }),
    }).then((res) => res.json());
};

export default function useBuckets() {
    const { data, error, mutate } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/s3/buckets`,
        fetcher
    );

    const refetch = async () => {
        await mutate(
            async () => {
                const newData = await fetcher(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/s3/buckets`
                );
                return newData;
            },
            { revalidate: true }
        );
    };

    return {
        buckets: data?.data || [],
        isLoading: !data && !error,
        isError: error,
        refetch,
    };
}

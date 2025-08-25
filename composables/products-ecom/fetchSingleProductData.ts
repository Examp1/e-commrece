export default async function fetchSingleProductData(slug: string) {
    const { data, refresh } = await useFetch(
        "/api/e-commerce/get-single-product",
        {
            query: {
                slug,
            },
        },
    );
    console.log(data.value);
    return {
        data, refresh
    }
}

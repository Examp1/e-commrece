export function useHeaders() {
    const userCookie: Ref<{
        token: {
            accessToken: string,
            refreshToken: string,
        }

    }> = useCookie("user", userCookieSettigns);
    const accessToken = userCookie.value?.token.accessToken;

    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
    };
    return headers;
}

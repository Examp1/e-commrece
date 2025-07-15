import { withAuth } from "~/utils/withAuth";
export default withAuth(async (event) => {
    return {
        isAuthenticatd: true,
    };
});

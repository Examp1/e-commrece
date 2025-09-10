import { authGuard } from "~/middleware/authGuard";

export function withAuth(handler: Parameters<typeof defineEventHandler>[0]) {
    return defineEventHandler(async (event) => {
        await authGuard(event); // защищает API
        return handler(event); // если токен валидный — выполняется handler
    });
}

export function showApiError(error: any) {
    const errors = error?.data?.data?.fieldErrors;

    if (typeof error?.data?.message !== "undefined") {
        showCustomError(error?.data?.message);
    }
    for (const inputFieldName in errors) {
        for (const inputErrorMessage of errors[inputFieldName]) {
            showCustomError(inputErrorMessage);
        }
    }
}

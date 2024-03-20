export function formatCode(code: string) {
    return fetch("/api/v1/format", {
        method: "POST",
        body: code,
    }).then((res) => res.text());
}

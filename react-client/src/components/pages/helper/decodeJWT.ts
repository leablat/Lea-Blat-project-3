import decodeJWT from "jwt-decode"

export function checkIsAdminJwt() {
    const token = localStorage.getItem("token")
    if (!token)
        return null
    const JwtPayload: any = decodeJWT(token || "")
    if (JwtPayload?.role == "admin") {
        return true
    }
    return false
}
export function getJwtPayloads() {
    const token = localStorage.getItem("token")
    if (token)
        return decodeJWT(token || "")
    return {}
}
// export {getJwtPayloads, checkIsAdminJwt}

import crypto from "crypto";

export function helper(len: number): string {
    return crypto.randomBytes(len).toString("base64url").slice(0, len);
}
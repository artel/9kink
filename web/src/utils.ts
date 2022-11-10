import { PostgrestError } from "@supabase/supabase-js";

export function capitalize(str: string) {
  return str?.[0]?.toUpperCase() + str.substring(1);
}

export function deCamelCase(str: string) {
  return str.split("").reduce((acc, cur, idx) => {
    if (idx === 0) {
      return cur.toUpperCase();
    } else if (cur === cur.toUpperCase()) {
      return acc + " " + cur;
    } else {
      return acc + cur;
    }
  }, "");
}

export function isUniqueConstraintError(err: unknown): err is PostgrestError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (err as any).code === "23505";
}
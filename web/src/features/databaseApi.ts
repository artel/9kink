import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { PostgrestError } from "@supabase/supabase-js";
import supabase from "../supabase";
import { selectUserId } from "./selectors";

const baseQuery: BaseQueryFn<void, unknown, PostgrestError> = () => {
  return {
    error: {
      message: "not implemented",
    } as PostgrestError,
  };
};

// Define a service using a base URL and expected endpoints
export const databaseApi = createApi({
  reducerPath: "databaseApi",
  baseQuery,
  endpoints: (builder) => ({
    profile: builder.query({
      async queryFn(
        args:
          | { userId: string; username?: undefined }
          | { userId?: undefined; username: string }
      ) {
        const { error, data } = await supabase
          .from("profile")
          .select("*")
          .eq(args.userId ? 'user_id' : 'username', args.userId ?? args.username);
        const profile = data?.find((i) => i);
        const result: QueryReturnValue<typeof profile, PostgrestError> = error
          ? { error }
          : { data: profile };
        return result;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// eslint-disable-next-line no-empty-pattern
export const { useProfileQuery } = databaseApi;

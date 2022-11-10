import { Divider, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useParams } from "react-router-dom";
import { useProfileQuery } from "../features/databaseApi";
import supabase from "../supabase";

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { currentData, error } = useProfileQuery(
    username ? { username } : skipToken
  );

  return (
    <>
      {currentData && (
        <Flex direction="column" gap={4}>
          <HStack>
            {currentData.avatarFile && (
              <Image
                boxSize="100px"
                objectFit="cover"
                src={
                  supabase.storage
                    .from("userdata")
                    .getPublicUrl(
                      `${currentData.user_id}/avatar/${currentData.avatarFile}`
                    ).data.publicUrl
                }
              />
            )}
            <Text fontSize="5xl">{currentData.username}</Text>
          </HStack>
          <Text>{currentData.bio}</Text>
          <Divider />
        </Flex>
      )}
    </>
  );
}

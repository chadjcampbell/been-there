import { FriendType } from "../routes/Friends";

export function findFriendId(friendsArray: FriendType[], searchString: string) {
  const words = searchString.split(" "); // Split the input string into words
  const friendName = words.slice(3).join(" "); // Extract the friend's name from the remaining words
  const friend = friendsArray.find((friend) => friend.name === friendName);

  if (friend) {
    return friend.user_id; // Return the id if a matching friend is found
  } else {
    return null; // Return null if no matching friend is found
  }
}

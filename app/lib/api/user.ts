import { User } from "@/types";

class UserApi {
  async getMe(): Promise<User> {
    const response = await fetch("/api/me");
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return response.json();
  }
}

export const userApi = new UserApi();

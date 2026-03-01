import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

type ChatInput = z.infer<typeof api.chat.send.input>;

export function useChat() {
  return useMutation({
    mutationFn: async (data: ChatInput) => {
      // Validate input before sending
      const validated = api.chat.send.input.parse(data);
      
      const res = await fetch(api.chat.send.path, {
        method: api.chat.send.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to send message");
      }
      
      const responseData = await res.json();
      // Validate response against schema
      return api.chat.send.responses[200].parse(responseData);
    },
  });
}

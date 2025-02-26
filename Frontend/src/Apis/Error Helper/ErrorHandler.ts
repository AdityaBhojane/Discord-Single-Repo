
import axios from "axios";

export function ErrorHandler(error: unknown): never {
  if (axios.isAxiosError(error)) {
    console.error("Axios error:", error.response?.data);
    throw error.response?.data.error || "An Axios error occurred";
  } else if (error instanceof Error) {
    console.error("Error:", error.message);
    throw new Error(error.message || "An unexpected error occurred");
  } else {
    console.error("Unknown error:", error);
    throw new Error("An unexpected error occurred");
  }
}
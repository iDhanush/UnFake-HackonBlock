import { baseUrl } from "../constant";
import { useStore } from "../context/StoreContext";

const useFetch = async (link,wallet) => {
  try {
    const res = await fetch(`${baseUrl}/link/${wallet}/upload?link=${link}`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    });
    const result = await res.json();
    const id = result.id;
    return id;
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("can't upload the file");
  }
};
export default useFetch;

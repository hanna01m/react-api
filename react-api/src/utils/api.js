import Axios from "axios";

export const apiUrl = async () => {
  try {
    const response = await Axios.get("https://polisen.se/api/events", {
      timeout: 5000,
    });
    if (response.data.length > 0) {
      return response.data;
    } else {
      console.log("Ingen data hittades");
      return [];
    }
  } catch (error) {
    console.error("Fel inträffade vid hämtning av data");
    return [];
  }
};

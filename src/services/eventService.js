const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/events`;
// will continue
const getEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.json();
  } catch (error) {}
};
export { getEvents };

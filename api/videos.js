export default async function handler(req, res) {
  try {
    const API_TOKEN = "adb3ca178449bc63c7ecbb66";

    const query = new URLSearchParams(req.query).toString();
    const url =
      "https://rpmshare.com/api/v1/video/manage" +
      (query ? `?${query}` : "");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "api-token": API_TOKEN,
        "accept": "application/json"
      }
    });

    const data = await response.json(); // parse JSON

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    res.status(response.status).json(data);

  } catch (err) {
    res.status(500).json({
      error: "Proxy error",
      message: err.message
    });
  }
}

var axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const port = 3002;

const domain = "endprasadcloud";

const auth = {
  username: "e.n.d.prasad@gmail.com",
  password:
    "ATATT3xFfGF0h-tsQ0Z0np3NB03fcrjy7e7i7wtEIMvfI__4VXk-pKjd1vCALZrjPU9o0FvZsCg1Ssg6G_1GS5plx61Plbf5yzYvZzm89IEWE1-YBypBRu_DkX7vlmT7dCcCyDa4iEVYIF0SutNqow-tZY8JQdoYo2YFaNlg53KZ6MiiggPIzWM=7DB7AF7D",
};

//Gets all issues in a particular project using the Jira Cloud REST API
async function getIssues() {
  try {
    const baseUrl = "https://" + domain + ".atlassian.net";

    const config = {
      method: "get",
      url: baseUrl + "/rest/api/2/search",
      headers: { "Content-Type": "application/json" },
      auth: auth,
    };
    const response = await axios.request(config);
    console.log(response.data.issues);
    return response.data;
  } catch (error) {
    console.log("error: ");
    console.log(error.response.data.errors);
  }
}

app.get("/", async (req, res) => {
  const data = await getIssues();
  res.send(JSON.stringify(data));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// console.log(getIssues());

var axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const port = 3002;

const domain = process.env.DOMAIN;

const auth = {
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
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

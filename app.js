import express from "express";
import axios from "axios";

const app = express();

app.get("/api", (req, res) => {
  const bearerToken = "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";
  const owner = "sean101123";
  const repo = "my-test-repo";
  const pullRequestNumber = 1;

  axios
    .get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${pullRequestNumber}`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    )
    .then((pullRequestResponse) => {
      const diffUrl = pullRequestResponse.data.diff_url;

      axios
        .get(diffUrl, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        })
        .then((diffResponse) => {
          res.send(diffResponse.data);
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});

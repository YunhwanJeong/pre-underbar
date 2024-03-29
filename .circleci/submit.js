const { exec } = require("child_process");
const https = require("https");

exec('echo "$airtable_api_key"', (err, apikey) => {
  if (err) {
    console.log(err);
    throw new Error("echo command did not work right");
  }

  if (apikey === "\n") {
    throw new Error("There is not the airtable_api_key");
  }

  exec('echo "$CIRCLE_PR_USERNAME"', (err, username) => {
    if (err) {
      console.log(err);
      throw new Error("echo command did not work right");
    }

    if (username === "\n") {
      throw new Error("There is not github username");
    }

    const options = {
      hostname: "api.airtable.com",
      path: "/v0/appuy4MROSeydCbsB/test",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: " Bearer " + apikey.trim()
      }
    };
    console.log(JSON.stringify(options.headers));

    const req = https.request(options, res => {
      let data;

      res.on("data", chunk => {
        data += chunk;
        // callback(null, result);
      });

      res.on("end", () => {
        console.log(data);

        if (data.includes("error")) {
          throw new Error("There is an error on response from airtable.");
        }
      });
    });

    req.on("error", e => {
      console.log(e);
      throw new Error("data did not send to airtable correctly");
    });

    // send the request
    req.write(
      JSON.stringify({
        fields: {
          subject: "PRE-exercise-underbar",
          username: username.trim()
        }
      })
    );
    req.end();
  });
});

// Submit homework also to leanrco.
// User can check it in /pre/batch/homework mypage.
exec('echo "$learnco_api_key"', (err, apikey) => {
  if (err) {
    console.log(err);
    throw new Error("echo command did not work right");
  }

  if (apikey === "\n") {
    throw new Error("This is not the learnco_api_key");
  }

  exec('echo "$CIRCLE_PR_USERNAME"', (err, username) => {
    if (err) {
      console.log(err);
      throw new Error("echo command did not work right");
    }

    if (username === "\n") {
      throw new Error("There is not github username");
    }

    const options = {
      hostname: "lcserver.codestates.com",
      path: "/api/homework",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apikey.trim()
      }
    };
    console.log(JSON.stringify(options.headers));

    const req = https.request(options, res => {
      let data;

      res.on("data", chunk => {
        data += chunk;
        // callback(null, result);
      });

      res.on("end", () => {
        console.log(data);

        if (data.includes("error")) {
          throw new Error("There is an error on response from learnco server.");
        }
      });
    });

    req.on("error", e => {
      console.log(e);
      throw new Error("data did not send to learnco server correctly");
    });

    // send the request
    req.write(
      JSON.stringify({
        fields: {
          subject: "PRE-exercise-underbar",
          username: username.trim()
        }
      })
    );
    req.end();
  });
});
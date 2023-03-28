const fs = require("fs");
const prompts = require("prompts");

(async () => {
  const response = await prompts([
    {
      type: "text",
      name: "jobNumber",
      message: "What is the job number?",
    },
    {
      type: "text",
      name: "jobAddress",
      message: "What is the job address?",
    },
  ]);

  const { jobNumber, jobAddress } = response;

  // Remove all non-letter and non-digit characters from the job address using regex
  const cleanAddress = jobAddress.replace(/[^\w\s]/gi, "");

  // Convert the job number and clean address to kebab case format and join them with a dash
  const directoryName = `${jobNumber}-${cleanAddress
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")}`;

  try {
    fs.mkdirSync(directoryName);
    fs.mkdirSync(`${directoryName}/Calcs`);
    fs.mkdirSync(`${directoryName}/Drawings`);
    fs.mkdirSync(`${directoryName}/Soil Reports`);
    console.log(`Directory '${directoryName}' created successfully!`);
  } catch (err) {
    console.error(err);
  }
})();

const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");

const client = new textToSpeech.TextToSpeechClient();

//
const text = process.argv[2] || "hello how are you";
const outputFilePrefix = process.argv[3] || "Prefix";
const languagecode = process.argv[4] || "en-GB";
const voicename = process.argv[5] || "en-GB-Wavenet-A";
const gender = process.argv[6] || "MALE";

//Audio encoding options https://cloud.google.com/text-to-speech/docs/reference/rest/v1/text/synthesize#AudioEncoding
const encoding = process.argv[7] || "MULAW";

//Set file extension based on encoding
const fileExtension = ".wav";

if (encoding === "MP3") {
  fileExtension = ".mp3";
} else if (encoding == "OGG_OPUS") {
  fileExtension = ".ogg";
}

const outputFilename = `${outputFilePrefix}-${languagecode}-${voicename}-${gender}${fileExtension}`;

const request = {
  input: { text: text },
  voice: { languageCode: languagecode, name: voicename, sslgender: gender },
  audioConfig: { audioEncoding: encoding },
};

(async function convertTextToSpeech() {
  try {
    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputFilename, response.audioContent, "binary");
    console.log(`Audio content written to file: ${outputFilename}`);
  } catch (err) {
    console.log(err);
  }
  client.close();
})();






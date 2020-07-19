const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const text = "I would like to test how google cloud test to speech engine works";
const outputFile = './test.mp3';

const request = {
  input: {text: text},
  voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
  audioConfig: {audioEncoding: 'MP3'},
};

(async function convertTextToSpeech() {
  try {
    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputFile, response.audioContent, 'binary');
    console.log(`Audio content written to file: ${outputFile}`);
  } catch (err) {
    console.log(err);
  }
  client.close()
}());





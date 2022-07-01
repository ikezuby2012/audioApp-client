import { default as apiaudio } from "apiaudio";

export async function textToSpeech(text) {
   try {
      apiaudio.configure({ apiKey: process.env.NEXT_API_KEY });

      let script = await apiaudio.Script.create({ scriptText: text });
      script = await apiaudio.Script.retrieve(script["scriptId"]);
      // console.log(script);

      const speech = await apiaudio.Speech.create({
         scriptId: script["scriptId"],
         voice: "Abeo"
      });
      // console.log(speech);

      const template = "parisianmorning";
      const mastering = await apiaudio.Mastering.create({
         scriptId: script["scriptId"],
         soundTemplate: template
         //  endFormat: "mp3"
      });
      // console.log("this is " + JSON.stringify(mastering));

      //   const masteringResult = await apiaudio.Mastering.retrieve({
      //      scriptId: script["scriptId"],
      //      endFormat: "mp3"
      //   });
      //   console.log(masteringResult);
      apiaudio.reset();
      return mastering;
   } catch (err) {
      console.log(err.message);
      apiaudio.reset();
   }
   apiaudio.reset();
}

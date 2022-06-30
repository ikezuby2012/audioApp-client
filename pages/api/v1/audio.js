import AppError from "../../../utils/AppError";
// import CatchAsync from "../../../utils/CatchAsync";
import { textToSpeech } from "../../../utils/AudioService";

export default async function handler(req, res, next) {
   const { method } = req;
   const { value } = req.body;
   if (method === "POST") {
      console.log(req.body);

      const data = await textToSpeech(value);

      if (!data) {
         return new AppError(`something went wrong`, 404);
      }

      res.status(201).json({
         status: "success",
         data
      });
   } else {
      return next(new AppError(`${method} is not allowed`, 403));
   }
}

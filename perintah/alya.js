const axios = require('axios');
async function Alya(ctx) {
  // Extract the question from the message
  const text = ctx.message.text?.replace("/alya", "")?.trim().toLowerCase();

  if (text) {
    ctx.sendChatAction("typing"); // Show typing indicator

    try {
      // Fetch information based on the question
      const hady = `nama kamu adalah Alya Kujou. User input: ${text}`;
      const respon = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(hady)}`);
      if (respon.data.answer) {
        return ctx.reply(respon.data.answer);
      } else {
        // Handle case where getChat doesn't return a response
        return ctx.reply("No information found for your question.");
      }
    } catch (error) {
      // Handle errors thrown by getChat or during the process
      return ctx.reply("An error occurred. Please try again later.");
    }
  } else {
    return ctx.reply("Please ask anything after /ask");
  }
};

const info = {
  nama: "alya",
  penulis: "hady",
  kuldown: 4
};

module.exports = { info, Alya };
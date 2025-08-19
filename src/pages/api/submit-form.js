// Path: src/pages/api/submit-form.js
export const prerender = false;

export async function POST({ request }) {
  const formData = await request.formData();
  const name = formData.get('name');
  const phone = formData.get('phone');
  const email = formData.get('email');
  const location = formData.get('location');
  const products = formData.get('products');
  const quantity = formData.get('quantity');
  const message = formData.get('message');
  
  const DISCORD_WEBHOOK_URL = import.meta.env.DISCORD_WEBHOOK_URL;

  if (!name || !phone) {
    // We don't need to send a visible error, just stop if data is bad
    return new Response(null, { status: 400 });
  }

  // A simplified Discord message just for your records
  const discordMessage = {
    username: "Goan Traders Log",
    avatar_url: "https://media.discordapp.net/attachments/1407307695886696448/1407320603764985937/wflogo.png?ex=68a5acf2&is=68a45b72&hm=5d92e08c065794c349dd921c57056837291469e4853f3070fb6d39db0a37fce1&=&format=webp&quality=lossless&width=625&height=625",
    embeds: [
      {
        title: "Submission Log (User Redirected to WhatsApp)",
        color: 15844367, // A yellow/gold color for "log"
        fields: [
          { name: "Name", value: name, inline: true },
          { name: "Phone", value: phone, inline: true },
          { name: "Email", value: email || "_Not provided_", inline: false },
          { name: "Location", value: location || "_Not specified_", inline: true },
          { name: "Quantity", value: quantity || "_Not specified_", inline: true },
          { name: "Products", value: products || "_Not specified_", inline: false },
          { name: "Details", value: "```" + (message || "_No additional details_") + "```" },
        ],
        footer: {
          text: `Logged at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`
        }
      }
    ]
  };

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordMessage),
    });
    return new Response(JSON.stringify({ message: "Logged to Discord" }), { status: 200 });
  } catch (error) {
    console.error("Error logging to Discord:", error);
    return new Response(null, { status: 500 });
  }
}
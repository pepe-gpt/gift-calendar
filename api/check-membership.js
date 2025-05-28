// ====== check-membership.js (для Vercel Serverless Function) ======

export default async function handler(req, res) {
  const { telegram_id } = req.query;

  if (!telegram_id) {
    return res.status(400).json({ error: 'telegram_id is required' });
  }

  const BOT_TOKEN = '7364290849:AAFG12ijlGW-JBHChbbL21sCfjuB_Zyt28w';
  const CHANNEL = '@calendargift';
  const CHAT = '@adventon';

  const fetchMember = async (chatId) => {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${chatId}&user_id=${telegram_id}`);
    const data = await response.json();
    return data.ok && ["member", "administrator", "creator"].includes(data.result.status);
  };

  try {
    const [inChannel, inChat] = await Promise.all([
      fetchMember(CHANNEL),
      fetchMember(CHAT)
    ]);

    return res.status(200).json({ channel: inChannel, chat: inChat });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch membership status' });
  }
}

import { Message } from "../model.js";

export const scheduleMessage = async (req, res) => {
  try {
    const { message, day, time } = req.body;

    if (!message || !day || !time) {
      return res
        .status(400)
        .json({ error: "Message, day, and time are required!" });
    }

    // Convert day & time to a Date object
    const scheduledDate = new Date(`${day} ${time}`);

    if (isNaN(scheduledDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Save message to MongoDB
    const newMessage = new Message({ message, scheduledDate });
    await newMessage.save();

    res.json({ message: "Message scheduled successfully!", data: newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

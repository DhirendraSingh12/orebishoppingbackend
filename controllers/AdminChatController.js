const MessageModel = require('../models/AdminChatModel')
const userService = require("../services/userServices");

exports.ChatSendMessage = async (req, res) => {
    const { sender, recipient, message } = req.body;
  
    if (!sender || !recipient || !message) {
      return res.status(400).json({ error: 'Sender, recipient, and message are required' });
    }
  
    try {
      if (sender !== 'superadmin') {
        const senderUser = await userService.findUserByEmployeeId(sender);
        if (!senderUser) {
          return res.status(404).json({ error: 'Sender not found' });
        }
      }
  
      if (recipient !== 'superadmin') {
        const recipientUser = await userService.findUserByEmployeeId(recipient);
        if (!recipientUser) {
          return res.status(404).json({ error: 'Recipient not found' });
        }
      }
  
      // Save the message
      const newMessage = new MessageModel({
        employeeId: sender === 'superadmin' ? recipient : sender,
        sender,
        recipient,
        message,
      });
      await newMessage.save();
      return res.status(200).json({ success: true, message: newMessage });
    } catch (error) {
      console.error('Error in ChatSendMessage:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  exports.ChatGetMessagesForSuperAdmin = async (req, res) => {
    try {
      const messages = await MessageModel.find({
        $or: [{ sender: 'superadmin' }, { recipient: 'superadmin' }],
      }).sort({ createdAt: -1 });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching messages', message: err.message });
    }
  };

  
  exports.ChatGetMessagesByEmployeeId = async (req, res) => {
    const { employeeId } = req.params;
  
    try {
      const messages = await MessageModel.find({
        $or: [
          { sender: 'superadmin', recipient: employeeId },
          { sender: employeeId, recipient: 'superadmin' },
        ],
      }).sort({ createdAt: -1 });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching messages', message: err.message });
    }
  };
  
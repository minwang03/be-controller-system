require('dotenv').config();
const http = require('http');          
const app = require('./app');            
const { Server } = require('socket.io'); 
const messageService = require('./services/messageService'); 

const PORT = process.env.PORT || 3001;

// Tạo http server từ app
const server = http.createServer(app);

// Khởi tạo socket.io với http server
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  socket.on('sendMessage', async (data) => {
    console.log('Received sendMessage data:', data);  

    const { sender_id, room, message } = data || {};

    if (!sender_id) {
      console.error('sender_id missing in sendMessage data!');
      socket.emit('errorMessage', { message: 'sender_id is required' });
      return;
    }
    if (!room) {
      console.error('room missing in sendMessage data!');
      socket.emit('errorMessage', { message: 'room is required' });
      return;
    }
    if (!message) {
      console.error('message missing in sendMessage data!');
      socket.emit('errorMessage', { message: 'message content is required' });
      return;
    }

    try {
      const user = await messageService.getUserById(sender_id);
      if (!user) {
        console.error('User không tồn tại với id:', sender_id);
        socket.emit('errorMessage', { message: `User not found with id: ${sender_id}` });
        return;
      }

      const fullMessage = {
        sender_id,
        room,
        message,
        name: user.name,
        avatar: user.avatar || null,
        created_at: new Date().toISOString(),
      };

      io.to(room).emit('newMessage', fullMessage);

    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error.message);
      socket.emit('errorMessage', { message: 'Internal server error' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

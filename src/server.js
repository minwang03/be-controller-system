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
    const { sender_id, room, message } = data;

    // Phát lại tin nhắn cho các client trong room
    io.to(room).emit('newMessage', data);

    // Lưu tin nhắn vào database
    try {
      await messageService.saveMessage({ sender_id, room, message });
    } catch (error) {
      console.error('Lỗi lưu tin nhắn:', error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

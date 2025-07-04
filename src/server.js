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

      try {
        // 1. Lấy thông tin người gửi từ DB (bạn cần có hàm lấy user)
        const user = await messageService.getUserById(sender_id);

        // 2. Thêm name vào object gửi lại
        const fullMessage = {
          sender_id,
          room,
          message,
          name: user.name,  
          avatar: user.avatar || null, 
          created_at: new Date().toISOString() 
        };

        // 3. Emit lại cho client khác
        io.to(room).emit('newMessage', fullMessage);

        // 4. Lưu vào DB
        await messageService.saveMessage(fullMessage);
      } catch (error) {
        console.error('Lỗi khi gửi tin nhắn:', error.message);
      }
    });


  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

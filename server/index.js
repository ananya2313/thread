const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// CORS setup
const allowedOrigins = [
  "https://thread-1yni.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("✅ Backend is live and working!");
});

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// --- SOCKET.IO SETUP ---
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// 👇 Store userId <=> socket.id mappings
const onlineUsers = new Map(); // instead of Set

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // User connected (send their userId from client)
  socket.on("user_connected", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`✅ UserID ${userId} added to onlineUsers`);

    // Notify others
    socket.broadcast.emit("user_connected_broadcast", userId);
  });

  // User joined a room
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`🟡 User joined room: ${room}`);
  });

  // Receive and broadcast messages
  socket.on("send_message", (data) => {
    console.log("📨 Message:", data);
    io.to(data.room).emit("receive_message", data);
  });

  // Typing indicators
  socket.on("typing", ({ room, senderName }) => {
    socket.to(room).emit("user_typing", senderName);
  });

  socket.on("stop_typing", ({ room }) => {
    socket.to(room).emit("user_stopped_typing");
  });

  // Online status check
  socket.on("check_online", (userId) => {
    const isOnline = onlineUsers.has(userId);
    socket.emit("user_online_status", { userId, online: isOnline });
  });

  // User disconnect
  socket.on("disconnect", () => {
    let disconnectedUserId = null;

    for (const [userId, sId] of onlineUsers.entries()) {
      if (sId === socket.id) {
        disconnectedUserId = userId;
        onlineUsers.delete(userId);
        console.log(`🔴 User disconnected: ${userId}`);
        break;
      }
    }

    if (disconnectedUserId) {
      // Notify others that user went offline
      socket.broadcast.emit("user_disconnected_broadcast", disconnectedUserId);
    }
  });
});

// Start server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`✅ App is listening on PORT: ${port}`);
  console.log("✅ Allowed CORS Origins:", allowedOrigins);
});

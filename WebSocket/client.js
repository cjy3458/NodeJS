const io = require("socket.io-client");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const serverAddress = "http://mutsachatting.p-e.kr:8000";

const socket = io.connect(serverAddress);

rl.question("Enter your name: ", (clientName) => {
  socket.emit("registerName", clientName);
  console.log(`registered as ${clientName}`);
});

socket.on("connect", () => {
  rl.on("line", (input) => {
    if (input == `quit`) {
      socket.disconnect();
      process.exit(0);
    } else {
      const data = {
        msg: input,
      };
      socket.emit("message", data);
    }
  });
});

socket.on("message", (data) => {
  console.log(data);
});

socket.on("disconnect", (reason) => {
  console.log(`Disconnected from server: ${reason}`);
});

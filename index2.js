const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const axios = require("axios");
require('dotenv').config()

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://shrine-auction2-app.netlify.app",
      "http://192.168.1.58:5173",
      "http://192.168.43.77:5173",
      "http://192.168.1.149:5173",
      "http://192.168.1.7:5173",
      "http://192.168.1.96:8000",
      "http://127.0.0.1:5173",
    ],
    methods: ["GET", "POST"],
  },
});

// SOCKET IO
io.on("connection", (socket) => {
  console.log("soket connect success :", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected ", socket.id);
  });

  // test
  //   socket.on('test', ()=>{

  //     try {
  //         io.sockets.emit('testSocket','555555555555555555')
  //     } catch (error) {
  //       console.log(error);

  //     }
  //   })

  //order
  socket.on("display_1", () => {
    //io.sockets.emit("shop", data)
    try {
      axios
        .get(`${process.env.API}/Show`)
        .then((result) => io.sockets.emit("show_display_1", result.data))

        .catch((err) => res.send(err));
    } catch (err) {
      console.error("GG", err);
    }
  });

  socket.on("display_2", () => {
    let data;

    // ข้อมูลเสริม
    try {
      axios.get(`${process.env.API}/Show`).then((newData) => {
        data = newData.data;
        mainData(data);
      });
    } catch (err) {
      console.error("GG", err);
    }

    // ข้อมูลหลัก
    mainData = (data) => {
      try {
        axios.get(`${process.env.API}/Show`).then((newData) => {
          const updateData = {
            main: {
              ...newData.data,
            },
            ...data,
          };
          io.sockets.emit("show_display_2", updateData);
        });
      } catch (err) {
        console.error("GG", err);
      }
    };
  });

  socket.on("display_3", () => {
    let data;

    // ข้อมูลเสริม
    try {
      axios.get(`${process.env.API}/Show`).then((newData) => {
        data = newData.data;
        mainData(data);
      });
    } catch (err) {
      console.error("GG", err);
    }
    // ข้อมูลหลัก
    mainData = (data) => {
      try {
        axios
          .get(`${process.env.API}/Show/List/Top`)
          .then((newData) => {
            const updateData = {
              main: [...newData.data],
              ...data,
            };
            io.sockets.emit("show_display_3", updateData);
            console.log(updateData);
          })
          .catch((err) => res.send(err));
      } catch (err) {
        console.error("GG", err);
      }
    };
  });

  socket.on("display_4", () => {
    const data = "ลบแล้ว";
    io.sockets.emit("show_display_4", data);
  });

  // Number 0
  socket.on("number_0", () => {
    let data;

    // ข้อมูลเสริม
    try {
      axios.get(`${process.env.API}/Show`).then((newData) => {
        data = newData.data;
        mainData(data);
      });
    } catch (err) {
      console.error("GG", err);
    }
    // ข้อมูลหลัก
    mainData = (data) => {
      try {
        axios
          .get(`${process.env.API}/Show/List/Top`)
          .then((newData) => {
            const updateData = {
              main: [...newData.data],
              ...data,
              number: 0
            };
            io.sockets.emit("show_number_1", updateData);
            console.log(updateData);
          })
          .catch((err) => res.send(err));
      } catch (err) {
        console.error("GG", err);
      }
    };
  });

  //Number 1
  socket.on("number_1", () => {
    let data;

    // ข้อมูลเสริม
    try {
      axios.get(`${process.env.API}/Show`).then((newData) => {
        data = newData.data;
        mainData(data);
      });
    } catch (err) {
      console.error("GG", err);
    }
    // ข้อมูลหลัก
    mainData = (data) => {
      try {
        axios
          .get(`${process.env.API}/Show/List/Top`)
          .then((newData) => {
            const updateData = {
              main: [...newData.data],
              ...data,
              number: 1
            };
            io.sockets.emit("show_number_1", updateData);
            console.log(updateData);
          })
          .catch((err) => res.send(err));
      } catch (err) {
        console.error("GG", err);
      }
    };
  });

  // Number 2
  socket.on("number_2", () => {
    let data;

    // ข้อมูลเสริม
    try {
      axios.get(`${process.env.API}/Show`).then((newData) => {
        data = newData.data;
        mainData(data);
      });
    } catch (err) {
      console.error("GG", err);
    }
    // ข้อมูลหลัก
    mainData = (data) => {
      try {
        axios
          .get(`${process.env.API}/Show/List/Top`)
          .then((newData) => {
            const updateData = {
              main: [...newData.data],
              ...data,
              number: 2
            };
            io.sockets.emit("show_number_1", updateData);
            console.log(updateData);
          })
          .catch((err) => res.send(err));
      } catch (err) {
        console.error("GG", err);
      }
    };
  });

  // Number 3
  socket.on("number_3", () => {
    let data;

    // ข้อมูลเสริม
    try {
      axios.get(`${process.env.API}/Show`).then((newData) => {
        data = newData.data;
        mainData(data);
      });
    } catch (err) {
      console.error("GG", err);
    }
    // ข้อมูลหลัก
    mainData = (data) => {
      try {
        axios
          .get(`${process.env.API}/Show/List/Top`)
          .then((newData) => {
            const updateData = {
              main: [...newData.data],
              ...data,
              number: 3
            };
            io.sockets.emit("show_number_1", updateData);
            console.log(updateData);
          })
          .catch((err) => res.send(err));
      } catch (err) {
        console.error("GG", err);
      }
    };
  });

  // Number 4
  socket.on("number_4", () => {
    // io.sockets.emit("show_number_4", 4);

    // ข้อมูลเสริม
    try {
      axios.get(`${process.env.API}/Finish`).then((newData) => {
        data = newData.data;
        mainData(data);
      });
    } catch (err) {
      console.error("GG", err);
    }

    // ข้อมูลหลัก
    mainData = (dataSub) => {
      const updateData = {
        main: {
          ...dataSub,
        },
        data: "4",
      };
      // console.log(updateData);
      io.sockets.emit("show_number_4", updateData);
    };
  });

  // Number_5

  socket.on("number_5", () => {
    io.sockets.emit("show_number_5", 5);
  });

  // GET Old Data

  // socket.on("get_data", () => {
  //   // ข้อมูลเสริม
  //   try {
  //     axios.get("http://192.168.1.96:8000/Show").then((newData) => {
  //       io.sockets.emit("show_get_data", newData);
  //     });
  //   } catch (err) {
  //     console.error("GG", err);
  //   }
  // });
});

// START SERVER
server.listen(process.env.PORT || 3001, () => {
  console.log("server Running is 3001");
});

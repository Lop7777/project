const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
// npm install mysql2
const connection = mysql.createConnection({ // 본인 환경에 맞춰서 바꿔서 하시면 되요
  host: "localhost", 
  user: "root", 
  password: "1234", 
  database: "test", 
});

connection.connect((error) => {
  if (error) {
    console.error("Failed to connect to the database:", error);
  } else {
    console.log("Connected to the database");
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("send!");
});

app.get("/bus", (req, res) => {
  const query = "SELECT * FROM bus";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Fail" });
    } else {
      res.json(results);
    }
  });
});

// app.post("/reservation", (req, res) => {
//   const { seats, start, end } = req.body; //정보 추출 내보내야함

//   const checkQuery = `SELECT * FROM bus WHERE start='${start}' AND end='${end}'`; // bus테이블 db에서 출발지와 도착지가 일치하는 버스를 찾아
//   connection.query(checkQuery, (error, results) => { // 조회 확인하고 데이터 처리
//     if (error) {
//       console.error("Error executing query:", error);
//       res.status(500).json({ error: "Failed to check bus data" });
//       return;
//     }

//     if (results.length > 0) { //일치하는 버스 있는 경우
//       const busId = results[0].id;
//     //   const seatArray = JSON.parse(results[0].seat || "[]");
//     // 수정된 코드
//         let seatArray;
//         try {
//         seatArray = JSON.parse(results[0].seat);
//         if (!Array.isArray(seatArray)) {
//             seatArray = [];
//         }
//         } catch (error) {
//         seatArray = [];
//         }
//         const updatedSeatArray = [...seatArray, ...seats];


//       const updateQuery = `UPDATE bus SET seat='${JSON.stringify(
//         updatedSeatArray
//       )}' WHERE id=${busId}`;
//       connection.query(updateQuery, (error) => { //에러 처리와 업뎃 결과 확인
//         if (error) {
//           console.error("Error executing query:", error);
//           res.status(500).json({ error: "Failed to update bus data" });
//           return;
//         }
//         res.json({ message: "Reservation successful" });
//       });
//     } else {
//       일치하는버스x
//        const insertQuery = `INSERT INTO bus (start, end, seat) VALUES ('${start}', '${end}', '${JSON.stringify(
//         seats
//       )}')`;
//       connection.query(insertQuery, (error) => { //에러 처리와 삽입 결과 확인
//         if (error) {
//           console.error("Error executing query:", error);
//           res.status(500).json({ error: "Failed to insert bus data" });
//           return;
//         }
//         res.json({ message: "Reservation successful" });
//       });
//     }
//   });
// });


app.post("/reservation", (req, res) => {
  const { seats, start, end } = req.body;

  const checkQuery = `SELECT * FROM bus WHERE start='${start}' AND end='${end}'`;
  connection.query(checkQuery, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Failed to check bus data" });
      return;
    }

    if (results.length > 0) {
      const busId = results[0].id;
      let seatArray;
      try {
        seatArray = JSON.parse(results[0].seat);
        if (!Array.isArray(seatArray)) {
          seatArray = [];
        }
      } catch (error) {
        seatArray = [];
      }

      const updatedSeatArray = [...seatArray, ...seats];
      const uniqueSeats = Array.from(new Set(updatedSeatArray));

      const updateQuery = `UPDATE bus SET seat='${JSON.stringify(uniqueSeats)}' WHERE id=${busId}`;
      connection.query(updateQuery, (error) => {
        if (error) {
          console.error("Error executing query:", error);
          res.status(500).json({ error: "Failed to update bus data" });
          return;
        }
        res.json({ message: "Reservation successful" });
      });
    } else {
      const insertQuery = `INSERT INTO bus (start, end, seat) VALUES ('${start}', '${end}', '${JSON.stringify(
        seats
      )}')`;
      connection.query(insertQuery, (error) => {
        if (error) {
          console.error("Error executing query:", error);
          res.status(500).json({ error: "Failed to insert bus data" });
          return;
        }
        res.json({ message: "Reservation successful" });
      });
    }
  });
});



app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});

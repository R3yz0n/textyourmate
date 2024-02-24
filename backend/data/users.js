import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@test.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Sagar",
    email: "sagar@test.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Jane",
    email: "jane@test.com",
    password: bcrypt.hashSync("1,2,3,4,5,6", 10),
    isAdmin: false,
  },
];

export default users;

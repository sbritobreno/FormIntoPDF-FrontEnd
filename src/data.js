import img from "../src/pdf_img.png";
import user_img from "../src/profile_img_default.png";

const pdfsData = [
  {
    id: 1,
    type: "Hole",
    image: img,
    name: "PDF made by the Admin",
    date: "01/01/2023",
    address: "Dublin 01",
  },
  {
    id: 2,
    type: "Hole",
    image: img,
    name: "PDF made by the Admin",
    date: "01/01/2023",
    address: "Dublin 01",
  },
  {
    id: 3,
    type: "Hole",
    image: img,
    name: "PDF made by the Admin",
    date: "01/01/2023",
    address: "Dublin 01",
  },
  {
    id: 4,
    type: "Hole",
    image: img,
    name: "PDF made by the Admin",
    date: "01/01/2023",
    address: "Dublin 01",
  },
  {
    id: 5,
    type: "Hole",
    image: img,
    name: "PDF made by the Admin",
    date: "01/01/2023",
    address: "Dublin 01",
  },
];

const users_staff = [
  {
    id: 1,
    name: "Gian",
    image: user_img,
    email: "gian@s.com",
    phone: "123 456 45",
    isadmin: false,
    role: "Engineer",
  },
  {
    id: 2,
    name: "Gian",
    image: user_img,
    email: "gian@s.com",
    phone: "123 456 45",
    isadmin: false,
    role: "Engineer",
  },
  {
    id: 3,
    name: "Gian",
    image: user_img,
    email: "gian@s.com",
    phone: "123 456 45",
    isadmin: true,
    role: "Engineer",
  },
  {
    id: 4,
    name: "Gian",
    image: user_img,
    email: "gian@s.com",
    phone: "123 456 45",
    isadmin: true,
    role: "Engineer",
  },
];

export { pdfsData, users_staff };

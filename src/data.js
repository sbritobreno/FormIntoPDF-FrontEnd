import img from "../src/pdf_img.png";
import formimg from "../src/form_img.png";
import user_img from "../src/profile_img_default.png";

const formsData = [
  {
    id: 1,
    image: formimg,
    address: "Spire of Dublin, O'Connell Street Upper, North City, Dublin, Ireland",
    coordinates: "53.3498114 -6.2602525",
    length: 1,
    width: 2,
    area: 2,
    surface_category: "granite slabs",
    reinstatement: "permanent",
    status: "completed",
    comment: "No comment",
    date: "01/01/2023",
  },
  {
    id: 2,
    image: formimg,
    address: "Spire of Dublin, O'Connell Street Upper, North City, Dublin, Ireland",
    coordinates: "53.3498114 -6.2602525",
    length: 1,
    width: 2,
    area: 2,
    surface_category: "granite slabs",
    reinstatement: "permanent",
    status: "completed",
    comment: "No comment",
    date: "01/01/2023",
  },
];

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

export { pdfsData, users_staff, formsData };

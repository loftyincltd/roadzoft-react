import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import * as Icon from "@mui/icons-material";
import * as Item from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { API_BASE } from "../utils/Api";

const Input = styled("input")({
  display: "none",
});

function AddUser() {
  const [project, setProject] = React.useState("");
  const [date, setDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [state, setUserstate] = React.useState("");
  const [lga, setLga] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [role, setRole] = React.useState("");
  const [roles, setRoles] = React.useState([]);
  const [user, setUser] = React.useState({});

  const handleDate = (newDate) => {
    setDate(newDate);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleStateChange = (event) => {
    console.log(event.target.value)
    setUserstate(event.target.value);
  };
  const handleProjectChange = (event) => {
    setProject(event.target.value);
  };

  const register = async () => {
    const dobYear = date.getFullYear();
    const response = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email,
        name,
        phone,
        state,
        lga,
        password: dobYear.toString(),
        dob: date,
      }),
    });
    const result = await response.json();
    console.log("Register", result);
  };

  const getRoles = async () => {
    const response = await fetch(`${API_BASE}/roles`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    setRoles(result.data);
    console.log("Roles", result);
  };

  const title = "NEW USER";
  const states = [
    {
      code: "FC",
      name: "Abuja",
      lgas: ["Abuja", "Kwali", "Kuje", "Gwagwalada", "Bwari", "Abaji"],
    },
    {
      code: "AB",
      name: "Abia",
      lgas: [
        "Aba North",
        "Aba South",
        "Arochukwu",
        "Bende",
        "Ikawuno",
        "Ikwuano",
        "Isiala-Ngwa North",
        "Isiala-Ngwa South",
        "Isuikwuato",
        "Umu Nneochi",
        "Obi Ngwa",
        "Obioma Ngwa",
        "Ohafia",
        "Ohaozara",
        "Osisioma",
        "Ugwunagbo",
        "Ukwa West",
        "Ukwa East",
        "Umuahia North",
        "Umuahia South",
      ],
    },
    {
      code: "AD",
      name: "Adamawa",
      lgas: [
        "Demsa",
        "Fufore",
        "Ganye",
        "Girei",
        "Gombi",
        "Guyuk",
        "Hong",
        "Jada",
        "Lamurde",
        "Madagali",
        "Maiha",
        "Mayo-Belwa",
        "Michika",
        "Mubi-North",
        "Mubi-South",
        "Numan",
        "Shelleng",
        "Song",
        "Toungo",
        "Yola North",
        "Yola South",
      ],
    },
    {
      code: "AK",
      name: "AkwaIbom",
      lgas: [
        "Abak",
        "Eastern-Obolo",
        "Eket",
        "Esit-Eket",
        "Essien-Udim",
        "Etim-Ekpo",
        "Etinan",
        "Ibeno",
        "Ibesikpo-Asutan",
        "Ibiono-Ibom",
        "Ika",
        "Ikono",
        "Ikot-Abasi",
        "Ikot-Ekpene",
        "Ini",
        "Itu",
        "Mbo",
        "Mkpat-Enin",
        "Nsit-Atai",
        "Nsit-Ibom",
        "Nsit-Ubium",
        "Obot-Akara",
        "Okobo",
        "Onna",
        "Oron",
        "Oruk Anam",
        "Udung-Uko",
        "Ukanafun",
        "Urue-Offong/Oruko",
        "Uruan",
        "Uyo",
      ],
    },
    {
      code: "AN",
      name: "Anambra",
      lgas: [
        "Aguata",
        "Anambra East",
        "Anambra West",
        "Anaocha",
        "Awka North",
        "Awka South",
        "Ayamelum",
        "Dunukofia",
        "Ekwusigo",
        "Idemili-North",
        "Idemili-South",
        "Ihiala",
        "Njikoka",
        "Nnewi-North",
        "Nnewi-South",
        "Ogbaru",
        "Onitsha-North",
        "Onitsha-South",
        "Orumba-North",
        "Orumba-South",
      ],
    },
    {
      code: "BA",
      name: "Bauchi",
      lgas: [
        "Alkaleri",
        "Bauchi",
        "Bogoro",
        "Damban",
        "Darazo",
        "Dass",
        "Gamawa",
        "Ganjuwa",
        "Giade",
        "Itas Gadau",
        "Jama'Are",
        "Katagum",
        "Kirfi",
        "Misau",
        "Ningi",
        "Shira",
        "Tafawa-Balewa",
        "Toro",
        "Warji",
        "Zaki",
      ],
    },
    {
      code: "BY",
      name: "Bayelsa",
      lgas: [
        "Brass",
        "Ekeremor",
        "Kolokuma Opokuma",
        "Nembe",
        "Ogbia",
        "Sagbama",
        "Southern-Ijaw",
        "Yenagoa",
      ],
    },
    {
      code: "BE",
      name: "Benue",
      lgas: [
        "Ado",
        "Agatu",
        "Apa",
        "Buruku",
        "Gboko",
        "Guma",
        "Gwer-East",
        "Gwer-West",
        "Katsina-Ala",
        "Konshisha",
        "Kwande",
        "Logo",
        "Makurdi",
        "Ogbadibo",
        "Ohimini",
        "Oju",
        "Okpokwu",
        "Otukpo",
        "Tarka",
        "Ukum",
        "Ushongo",
        "Vandeikya",
      ],
    },
    {
      code: "BO",
      name: "Borno",
      lgas: [
        "Abadam",
        "Askira-Uba",
        "Bama",
        "Bayo",
        "Biu",
        "Chibok",
        "Damboa",
        "Dikwa",
        "Gubio",
        "Guzamala",
        "Gwoza",
        "Hawul",
        "Jere",
        "Kaga",
        "Kala Balge",
        "Konduga",
        "Kukawa",
        "Kwaya-Kusar",
        "Mafa",
        "Magumeri",
        "Maiduguri",
        "Marte",
        "Mobbar",
        "Monguno",
        "Ngala",
        "Nganzai",
        "Shani",
      ],
    },
    {
      code: "CR",
      name: "CrossRiver",
      lgas: [
        "Abi",
        "Akamkpa",
        "Akpabuyo",
        "Bakassi",
        "Bekwarra",
        "Biase",
        "Boki",
        "Calabar-Municipal",
        "Calabar-South",
        "Etung",
        "Ikom",
        "Obanliku",
        "Obubra",
        "Obudu",
        "Odukpani",
        "Ogoja",
        "Yakurr",
        "Yala",
      ],
    },
    {
      code: "DE",
      name: "Delta",
      lgas: [
        "Aniocha North",
        "Aniocha-North",
        "Aniocha-South",
        "Bomadi",
        "Burutu",
        "Ethiope-East",
        "Ethiope-West",
        "Ika-North-East",
        "Ika-South",
        "Isoko-North",
        "Isoko-South",
        "Ndokwa-East",
        "Ndokwa-West",
        "Okpe",
        "Oshimili-North",
        "Oshimili-South",
        "Patani",
        "Sapele",
        "Udu",
        "Ughelli-North",
        "Ughelli-South",
        "Ukwuani",
        "Uvwie",
        "Warri South-West",
        "Warri North",
        "Warri South",
      ],
    },
    {
      code: "EB",
      name: "Ebonyi",
      lgas: [
        "Abakaliki",
        "Afikpo-North",
        "Afikpo South (Edda)",
        "Ebonyi",
        "Ezza-North",
        "Ezza-South",
        "Ikwo",
        "Ishielu",
        "Ivo",
        "Izzi",
        "Ohaukwu",
        "Onicha",
      ],
    },
    {
      code: "ED",
      name: "Edo",
      lgas: [
        "Akoko Edo",
        "Egor",
        "Esan-Central",
        "Esan-North-East",
        "Esan-South-East",
        "Esan-West",
        "Etsako-Central",
        "Etsako-East",
        "Etsako-West",
        "Igueben",
        "Ikpoba-Okha",
        "Oredo",
        "Orhionmwon",
        "Ovia-North-East",
        "Ovia-South-West",
        "Owan East",
        "Owan-West",
        "Uhunmwonde",
      ],
    },
    {
      code: "EK",
      name: "Ekiti",
      lgas: [
        "Ado-Ekiti",
        "Efon",
        "Ekiti-East",
        "Ekiti-South-West",
        "Ekiti-West",
        "Emure",
        "Gbonyin",
        "Ido-Osi",
        "Ijero",
        "Ikere",
        "Ikole",
        "Ilejemeje",
        "Irepodun Ifelodun",
        "Ise-Orun",
        "Moba",
        "Oye",
      ],
    },
    {
      code: "EN",
      name: "Enugu",
      lgas: [
        "Aninri",
        "Awgu",
        "Enugu-East",
        "Enugu-North",
        "Enugu-South",
        "Ezeagu",
        "Igbo-Etiti",
        "Igbo-Eze-North",
        "Igbo-Eze-South",
        "Isi-Uzo",
        "Nkanu-East",
        "Nkanu-West",
        "Nsukka",
        "Oji-River",
        "Udenu",
        "Udi",
        "Uzo-Uwani",
      ],
    },
    {
      code: "GO",
      name: "Gombe",
      lgas: [
        "Akko",
        "Balanga",
        "Billiri",
        "Dukku",
        "Funakaye",
        "Gombe",
        "Kaltungo",
        "Kwami",
        "Nafada",
        "Shongom",
        "Yamaltu Deba",
      ],
    },
    {
      code: "IM",
      name: "Imo",
      lgas: [
        "Aboh-Mbaise",
        "Ahiazu-Mbaise",
        "Ehime-Mbano",
        "Ezinihitte",
        "Ideato-North",
        "Ideato-South",
        "Ihitte Uboma",
        "Ikeduru",
        "Isiala-Mbano",
        "Isu",
        "Mbaitoli",
        "Ngor-Okpala",
        "Njaba",
        "Nkwerre",
        "Nwangele",
        "Obowo",
        "Oguta",
        "Ohaji-Egbema",
        "Okigwe",
        "Onuimo",
        "Orlu",
        "Orsu",
        "Oru-East",
        "Oru-West",
        "Owerri-Municipal",
        "Owerri-North",
        "Owerri-West",
      ],
    },
    {
      code: "JI",
      name: "Jigawa",
      lgas: [
        "Auyo",
        "Babura",
        "Biriniwa",
        "Birnin-Kudu",
        "Buji",
        "Dutse",
        "Gagarawa",
        "Garki",
        "Gumel",
        "Guri",
        "Gwaram",
        "Gwiwa",
        "Hadejia",
        "Jahun",
        "Kafin-Hausa",
        "Kaugama",
        "Kazaure",
        "Kiri kasama",
        "Maigatari",
        "Malam Madori",
        "Miga",
        "Ringim",
        "Roni",
        "Sule-Tankarkar",
        "Taura",
        "Yankwashi",
      ],
    },
    {
      code: "KD",
      name: "Kaduna",
      lgas: [
        "Birnin-Gwari",
        "Chikun",
        "Giwa",
        "Igabi",
        "Ikara",
        "Jaba",
        "Jema'A",
        "Kachia",
        "Kaduna-North",
        "Kaduna-South",
        "Kagarko",
        "Kajuru",
        "Kaura",
        "Kauru",
        "Kubau",
        "Kudan",
        "Lere",
        "Makarfi",
        "Sabon-Gari",
        "Sanga",
        "Soba",
        "Zangon-Kataf",
        "Zaria",
      ],
    },
    {
      code: "KN",
      name: "Kano",
      lgas: [
        "Ajingi",
        "Albasu",
        "Bagwai",
        "Bebeji",
        "Bichi",
        "Bunkure",
        "Dala",
        "Dambatta",
        "Dawakin-Kudu",
        "Dawakin-Tofa",
        "Doguwa",
        "Fagge",
        "Gabasawa",
        "Garko",
        "Garun-Mallam",
        "Gaya",
        "Gezawa",
        "Gwale",
        "Gwarzo",
        "Kabo",
        "Kano-Municipal",
        "Karaye",
        "Kibiya",
        "Kiru",
        "Kumbotso",
        "Kunchi",
        "Kura",
        "Madobi",
        "Makoda",
        "Minjibir",
        "Nasarawa",
        "Rano",
        "Rimin-Gado",
        "Rogo",
        "Shanono",
        "Sumaila",
        "Takai",
        "Tarauni",
        "Tofa",
        "Tsanyawa",
        "Tudun-Wada",
        "Ungogo",
        "Warawa",
        "Wudil",
      ],
    },
    {
      code: "KT",
      name: "Katsina",
      lgas: [
        "Bakori",
        "Batagarawa",
        "Batsari",
        "Baure",
        "Bindawa",
        "Charanchi",
        "Dan-Musa",
        "Dandume",
        "Danja",
        "Daura",
        "Dutsi",
        "Dutsin-Ma",
        "Faskari",
        "Funtua",
        "Ingawa",
        "Jibia",
        "Kafur",
        "Kaita",
        "Kankara",
        "Kankia",
        "Katsina",
        "Kurfi",
        "Kusada",
        "Mai-Adua",
        "Malumfashi",
        "Mani",
        "Mashi",
        "Matazu",
        "Musawa",
        "Rimi",
        "Sabuwa",
        "Safana",
        "Sandamu",
        "Zango",
      ],
    },
    {
      code: "KE",
      name: "Kebbi",
      lgas: [
        "Aleiro",
        "Arewa-Dandi",
        "Argungu",
        "Augie",
        "Bagudo",
        "Birnin-Kebbi",
        "Bunza",
        "Dandi",
        "Fakai",
        "Gwandu",
        "Jega",
        "Kalgo",
        "Koko-Besse",
        "Maiyama",
        "Ngaski",
        "Sakaba",
        "Shanga",
        "Suru",
        "Wasagu/Danko",
        "Yauri",
        "Zuru",
      ],
    },
    {
      code: "KO",
      name: "Kogi",
      lgas: [
        "Adavi",
        "Ajaokuta",
        "Ankpa",
        "Dekina",
        "Ibaji",
        "Idah",
        "Igalamela-Odolu",
        "Ijumu",
        "Kabba Bunu",
        "Kogi",
        "Lokoja",
        "Mopa-Muro",
        "Ofu",
        "Ogori Magongo",
        "Okehi",
        "Okene",
        "Olamaboro",
        "Omala",
        "Oyi",
        "Yagba-East",
        "Yagba-West",
      ],
    },
    {
      code: "KW",
      name: "Kwara",
      lgas: [
        "Asa",
        "Baruten",
        "Edu",
        "Ekiti (Araromi/Opin)",
        "Ilorin-East",
        "Ilorin-South",
        "Ilorin-West",
        "Isin",
        "Kaiama",
        "Moro",
        "Offa",
        "Oke-Ero",
        "Oyun",
        "Pategi",
      ],
    },
    {
      code: "LA",
      name: "Lagos",
      lgas: [
        "Agege",
        "Ajeromi-Ifelodun",
        "Alimosho",
        "Amuwo-Odofin",
        "Apapa",
        "Badagry",
        "Epe",
        "Eti-Osa",
        "Ibeju-Lekki",
        "Ifako-Ijaiye",
        "Ikeja",
        "Ikorodu",
        "Kosofe",
        "Lagos-Island",
        "Lagos-Mainland",
        "Mushin",
        "Ojo",
        "Oshodi-Isolo",
        "Shomolu",
        "Surulere",
        "Yewa-South",
      ],
    },
    {
      code: "NA",
      name: "Nassarawa",
      lgas: [
        "Akwanga",
        "Awe",
        "Doma",
        "Karu",
        "Keana",
        "Keffi",
        "Kokona",
        "Lafia",
        "Nasarawa",
        "Nasarawa-Eggon",
        "Obi",
        "Wamba",
        "Toto",
      ],
    },
    {
      code: "NI",
      name: "Niger",
      lgas: [
        "Agaie",
        "Agwara",
        "Bida",
        "Borgu",
        "Bosso",
        "Chanchaga",
        "Edati",
        "Gbako",
        "Gurara",
        "Katcha",
        "Kontagora",
        "Lapai",
        "Lavun",
        "Magama",
        "Mariga",
        "Mashegu",
        "Mokwa",
        "Moya",
        "Paikoro",
        "Rafi",
        "Rijau",
        "Shiroro",
        "Suleja",
        "Tafa",
        "Wushishi",
      ],
    },
    {
      code: "OG",
      name: "Ogun",
      lgas: [
        "Abeokuta-North",
        "Abeokuta-South",
        "Ado-Odo Ota",
        "Ewekoro",
        "Ifo",
        "Ijebu-East",
        "Ijebu-North",
        "Ijebu-North-East",
        "Ijebu-Ode",
        "Ikenne",
        "Imeko-Afon",
        "Ipokia",
        "Obafemi-Owode",
        "Odeda",
        "Odogbolu",
        "Ogun-Waterside",
        "Remo-North",
        "Shagamu",
        "Yewa North",
      ],
    },
    {
      code: "ON",
      name: "Ondo",
      lgas: [
        "Akoko North-East",
        "Akoko North-West",
        "Akoko South-West",
        "Akoko South-East",
        "Akure-North",
        "Akure-South",
        "Ese-Odo",
        "Idanre",
        "Ifedore",
        "Ilaje",
        "Ile-Oluji-Okeigbo",
        "Irele",
        "Odigbo",
        "Okitipupa",
        "Ondo West",
        "Ondo-East",
        "Ose",
        "Owo",
      ],
    },
    {
      code: "OS",
      name: "Osun",
      lgas: [
        "Atakumosa West",
        "Atakumosa East",
        "Ayedaade",
        "Ayedire",
        "Boluwaduro",
        "Boripe",
        "Ede South",
        "Ede North",
        "Egbedore",
        "Ejigbo",
        "Ife North",
        "Ife South",
        "Ife-Central",
        "Ife-East",
        "Ifelodun",
        "Ila",
        "Ilesa-East",
        "Ilesa-West",
        "Irepodun",
        "Irewole",
        "Isokan",
        "Iwo",
        "Obokun",
        "Odo-Otin",
        "Ola Oluwa",
        "Olorunda",
        "Oriade",
        "Orolu",
        "Osogbo",
      ],
    },
    {
      code: "OY",
      name: "Oyo",
      lgas: [
        "Afijio",
        "Akinyele",
        "Atiba",
        "Atisbo",
        "Egbeda",
        "Ibadan North",
        "Ibadan North-East",
        "Ibadan North-West",
        "Ibadan South-East",
        "Ibadan South-West",
        "Ibarapa-Central",
        "Ibarapa-East",
        "Ibarapa-North",
        "Ido",
        "Ifedayo",
        "Irepo",
        "Iseyin",
        "Itesiwaju",
        "Iwajowa",
        "Kajola",
        "Lagelu",
        "Ogo-Oluwa",
        "Ogbomosho-North",
        "Ogbomosho-South",
        "Olorunsogo",
        "Oluyole",
        "Ona-Ara",
        "Orelope",
        "Ori-Ire",
        "Oyo-West",
        "Oyo-East",
        "Saki-East",
        "Saki-West",
        "Surulere",
      ],
    },
    {
      code: "PL",
      name: "Plateau",
      lgas: [
        "Barkin-Ladi",
        "Bassa",
        "Bokkos",
        "Jos-East",
        "Jos-North",
        "Jos-South",
        "Kanam",
        "Kanke",
        "Langtang-North",
        "Langtang-South",
        "Mangu",
        "Mikang",
        "Pankshin",
        "Qua'an Pan",
        "Riyom",
        "Shendam",
        "Wase",
      ],
    },
    {
      code: "RI",
      name: "Rivers",
      lgas: [
        "Abua Odual",
        "Ahoada-East",
        "Ahoada-West",
        "Akuku Toru",
        "Andoni",
        "Asari-Toru",
        "Bonny",
        "Degema",
        "Eleme",
        "Emuoha",
        "Etche",
        "Gokana",
        "Ikwerre",
        "Khana",
        "Obio Akpor",
        "Ogba-Egbema-Ndoni",
        "Ogba Egbema Ndoni",
        "Ogu Bolo",
        "Okrika",
        "Omuma",
        "Opobo Nkoro",
        "Oyigbo",
        "Port-Harcourt",
        "Tai",
      ],
    },
    {
      code: "SO",
      name: "Sokoto",
      lgas: [
        "Binji",
        "Bodinga",
        "Dange-Shuni",
        "Gada",
        "Goronyo",
        "Gudu",
        "Gwadabawa",
        "Illela",
        "Kebbe",
        "Kware",
        "Rabah",
        "Sabon Birni",
        "Shagari",
        "Silame",
        "Sokoto-North",
        "Sokoto-South",
        "Tambuwal",
        "Tangaza",
        "Tureta",
        "Wamako",
        "Wurno",
        "Yabo",
      ],
    },
    {
      code: "TA",
      name: "Taraba",
      lgas: [
        "Ardo-Kola",
        "Bali",
        "Donga",
        "Gashaka",
        "Gassol",
        "Ibi",
        "Jalingo",
        "Karim-Lamido",
        "Kurmi",
        "Lau",
        "Sardauna",
        "Takum",
        "Ussa",
        "Wukari",
        "Yorro",
        "Zing",
      ],
    },
    {
      code: "YO",
      name: "Yobe",
      lgas: [
        "Bade",
        "Bursari",
        "Damaturu",
        "Fika",
        "Fune",
        "Geidam",
        "Gujba",
        "Gulani",
        "Jakusko",
        "Karasuwa",
        "Machina",
        "Nangere",
        "Nguru",
        "Potiskum",
        "Tarmuwa",
        "Yunusari",
        "Yusufari",
      ],
    },
    {
      code: "ZA",
      name: "Zamfara",
      lgas: [
        "Anka",
        "Bakura",
        "Birnin Magaji/Kiyaw",
        "Bukkuyum",
        "Bungudu",
        "Gummi",
        "Gusau",
        "Isa",
        "Kaura-Namoda",
        "Kiyawa",
        "Maradun",
        "Maru",
        "Shinkafi",
        "Talata-Mafara",
        "Tsafe",
        "Zurmi",
      ],
    },
  ];

  const localGovt = state && states.filter(s => s.state === state)

  const getUser = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/user/${localStorage.getItem("user")}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      const data = result.data;
      setUser(data);
      console.log("User:", result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser();
    getRoles();
  }, []);

  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={user} title={title.toUpperCase()} />
          <div className="profile-picture flex flex-col justify-center items-center">
            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <Item.Avatar
                    style={{ height: 90, width: 90 }}
                    variant="circular"
                  />
                </IconButton>
              </label>
            </Stack>
            <p>Tap to add profile picture (optional)</p>
          </div>
          <form className="mx-5">
            <div className="mt-5 flex flex-row justify-evenly items-center">
              <div className="flex flex-col justify-center items-center">
                <div>
                  <TextField
                  style={{width: '100%', paddingX: 5}}
                    placeholder="Type Name"
                    onChange={(e) => setName(e.target.value)}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                  />

                  <div className="my-3 flex flex-row justify-evenly items-center">
                    <Box sx={{ minWidth: 200 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          State
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={state}
                          label="State"
                          onChange={handleStateChange}
                        >
                          <MenuItem>Select State</MenuItem>
                          {states &&
                            states.map((item, i) => (
                              <MenuItem value={item.name} key={i}>
                                {item.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 200 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          LGA
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={lga}
                          label="LGA"
                          onChange={(e) => setLga(e.target.value)}
                        >
                          <MenuItem>Select LGA</MenuItem>
                          { states &&
                            states.filter(s => s.name === state).map((item, i) => (
                              item.lgas.map((lg, i) => <MenuItem value={lg} key={i}>
                                {lg}
                              </MenuItem>)
                            ))}
                        </Select>
                      </FormControl>
                      </Box>
                  </div>
                  <div className="my-3 flex flex-row justify-evenly items-center">
                    <Box sx={{ minWidth: 200 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Role
                        </InputLabel>
                        <Select
                          disabled
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={project}
                          label="Role"
                          onChange={handleRoleChange}
                        >
                          <MenuItem value="Super Admin">Super Admin</MenuItem>
                          <MenuItem value="Admin">Admin</MenuItem>
                          <MenuItem value="Staff">Staff</MenuItem>
                          <MenuItem value="Ad-hoc">Ad-hoc</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <TextField
                      placeholder="Phone"
                      onChange={(e) => setPhone(e.target.value)}
                      id="outlined-basic"
                      label="Phone"
                      variant="outlined"
                    />
                  </div>
                  <div className="my-3 flex flex-row justify-evenly items-center">
                    <TextField
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DesktopDatePicker
                          label="Date of Birth"
                          inputFormat="MM/dd/yyyy"
                          value={date}
                          onChange={handleDate}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-center">
               
                <Item.Button
                  onClick={register}
                  color="primary"
                  variant="contained"
                >
                  Regiter
                </Item.Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;

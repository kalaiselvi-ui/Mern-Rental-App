import { AiFillCar } from "react-icons/ai";
import {
  BiSolidDryer,
  BiSolidFirstAid,
  BiSolidFridge,
  BiSolidWasher,
  BiWifi,
  BiWorld,
} from "react-icons/bi";
import { BsFillDoorOpenFill, BsPersonWorkspace, BsSnow } from "react-icons/bs";
import {
  FaFireExtinguisher,
  FaKey,
  FaPumpSoap,
  FaShower,
  FaSkiing,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { FaHouseUser, FaKitchenSet, FaPeopleRoof } from "react-icons/fa6";
import {
  GiBarbecue,
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCampfire,
  GiCastle,
  GiCaveEntrance,
  GiCctvCamera,
  GiForestCamp,
  GiHeatHaze,
  GiIsland,
  GiToaster,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import {
  MdBalcony,
  MdMicrowave,
  MdOutlineVilla,
  MdPets,
  MdYard,
} from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { TbBeach, TbIroning3, TbMountain, TbPool } from "react-icons/tb";
import Arctic from './assets/images/arctic_cat.webp';
import Barns from './assets/images/barn_cat.jpg';
import beachCat from './assets/images/beach_cat.jpg';
import Camping from './assets/images/camping_cat.jpg';
import Castles from './assets/images/castle_cat.webp';
import Caves from './assets/images/cave_cat.jpg';
import countrysideCat from './assets/images/countryside_cat.webp';
import Desert from './assets/images/desert_cat.webp';
import Islands from './assets/images/island_cat.webp';
import Lakefront from './assets/images/lake_cat.webp';
import Luxury from './assets/images/lux_cat.jpg';
import modernCat from './assets/images/modern_cat.webp';
import poolCat from './assets/images/pool_cat.jpg';
import skiing from './assets/images/skiing_cat.jpg';
import windmillCat from './assets/images/windmill_cat.webp';


export const categories = [
  {
    label: "All",
    icon: <BiWorld />,
  },
  {
    img: beachCat,
    label: "Beachfront",
    icon: <TbBeach />,
    description: "This property is close to the beach!",
  },
  {
    img: windmillCat,
    label: "Windmills",
    icon: <GiWindmill />,
    description: "This property is has windmills!",
  },
  {
    img: modernCat,
    label: "Iconic cities",
    icon: <MdOutlineVilla />,
    description: "This property is modern!",
  },
  {
    img: countrysideCat,
    label: "Countryside",
    icon: <TbMountain />,
    description: "This property is in the countryside!",
  },
  {
    img: poolCat,
    label: "Amazing Pools",
    icon: <TbPool />,
    description: "This is property has a beautiful pool!",
  },
  {
    img: Islands,
    label: "Islands",
    icon: <GiIsland />,
    description: "This property is on an island!",
  },
  {
    img: Lakefront,
    label: "Lakefront",
    icon: <GiBoatFishing />,
    description: "This property is near a lake!",
  },
  {
    img: skiing,
    label: "Ski-in/out",
    icon: <FaSkiing />,
    description: "This property has skiing activies!",
  },
  {
    img: Castles,
    label: "Castles",
    icon: <GiCastle />,
    description: "This property is an ancient castle!",
  },
  {
    img: Caves,
    label: "Caves",
    icon: <GiCaveEntrance />,
    description: "This property is in a spooky cave!",
  },
  {
    img: Camping,
    label: "Camping",
    icon: <GiForestCamp />,
    description: "This property offers camping activities!",
  },
  {
    img: Arctic,
    label: "Arctic",
    icon: <BsSnow />,
    description: "This property is in arctic environment!",
  },
  {
    img: Desert,
    label: "Desert",
    icon: <GiCactus />,
    description: "This property is in the desert!",
  },
  {
    img: Barns,
    label: "Barns",
    icon: <GiBarn />,
    description: "This property is in a barn!",
  },
  {
    img: Luxury,
    label: "Luxury",
    icon: <IoDiamond />,
    description: "This property is brand new and luxurious!",
  },
];

export const types = [
  {
    name: "An entire place",
    description: "Guests have the whole place to themselves",
    icon: <FaHouseUser />,
  },
  {
    name: "Room(s)",
    description:
      "Guests have their own room in a house, plus access to shared places",
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: "A Shared Room",
    description:
      "Guests sleep in a room or common area that maybe shared with you or others",
    icon: <FaPeopleRoof />,
  },
];

export const facilities = [
  {
    name: "Bath tub",
    icon: <PiBathtubFill />,
  },
  {
    name: "Personal care products",
    icon: <FaPumpSoap />,
  },
  {
    name: "Outdoor shower",
    icon: <FaShower />,
  },
  {
    name: "Washer",
    icon: <BiSolidWasher />,
  },
  {
    name: "Dryer",
    icon: <BiSolidDryer />,
  },
  {
    name: "Hangers",
    icon: <PiCoatHangerFill />,
  },
  {
    name: "Iron",
    icon: <TbIroning3 />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill />,
  },
  {
    name: "Dedicated workspace",
    icon: <BsPersonWorkspace />,
  },
  {
    name: "Air Conditioning",
    icon: <BsSnow />,
  },
  {
    name: "Heating",
    icon: <GiHeatHaze />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "First Aid",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
  {
    name: "Cooking set",
    icon: <FaKitchenSet />,
  },
  {
    name: "Refrigerator",
    icon: <BiSolidFridge />,
  },
  {
    name: "Microwave",
    icon: <MdMicrowave />,
  },
  {
    name: "Stove",
    icon: <GiToaster />,
  },
  {
    name: "Barbecue grill",
    icon: <GiBarbecue />,
  },
  {
    name: "Outdoor dining area",
    icon: <FaUmbrellaBeach />,
  },
  {
    name: "Private patio or Balcony",
    icon: <MdBalcony />,
  },
  {
    name: "Camp fire",
    icon: <GiCampfire />,
  },
  {
    name: "Garden",
    icon: <MdYard />,
  },
  {
    name: "Free parking",
    icon: <AiFillCar />,
  },
  {
    name: "Self check-in",
    icon: <FaKey />,
  },
  {
    name: " Pet allowed",
    icon: <MdPets />,
  },
];

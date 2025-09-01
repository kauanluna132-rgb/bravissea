import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import VesselCard from "./VesselCard";
import { 
  Search, 
  Filter, 
  Users, 
  Wifi, 
  Coffee, 
  Music, 
  Shield, 
  Waves,
  Anchor,
  Sun,
  Clock,
  MapPin
} from "lucide-react";

// Importar as imagens das embarcações
import segueImage from "@/assets/segue-yacht.jpg";
import tecnomarineImage from "@/assets/tecnomarine-yacht.jpg";
import mywayImage from "@/assets/myway-yacht.jpg";
import flyhiImage from "@/assets/flyhi-boat.jpg";
import mcellImage from "@/assets/mcell-boat.jpg";
import comendadorImage from "@/assets/comendador-yacht.jpg";
import dragaoImage from "@/assets/dragao-yacht.jpg";
import grandrarayImage from "@/assets/grandraray-yacht.jpg";
// Novas embarcações
import ladyRuthImage from "@/assets/lady-ruth-yacht.jpg";
import mangataImage from "@/assets/mangata-yacht.jpg";
import prestigeImage from "@/assets/prestige-yacht.jpg";
import rebecaImage from "@/assets/rebeca-yacht.jpg";
import oceanoImage from "@/assets/oceano-catamaran.jpg";
import blauImage from "@/assets/blau-catamaran.jpg";
import nossaImage from "@/assets/nossa-yacht.jpg";
import sevenImage from "@/assets/seven-yacht.jpg";
import sennaImage from "@/assets/senna-yacht.jpg";
import luisaImage from "@/assets/luisa-yacht.jpg";

const vessels = [
  {
    id: "segue",
    name: "SEGUE",
    type: "Iate 58 Pés",
    image: "/lovable-uploads/e52f0edd-5490-4210-9f1a-35b63fc3cf97.png",
    images: [
      "/lovable-uploads/e52f0edd-5490-4210-9f1a-35b63fc3cf97.png",
      "/lovable-uploads/dfe6175f-7118-4636-a1b0-a4ddc3109dc1.png",
      "/lovable-uploads/fe41a6fd-0783-417f-b167-506aea17952e.png",
      "/lovable-uploads/1c084d08-90e7-465f-a60d-01bc9b8e2c50.png",
      "/lovable-uploads/aff73c70-ac4e-4f33-a275-7199028d5abe.png",
      "/lovable-uploads/915d6ac3-d213-42f2-a532-21999a73e18b.png",
      "/lovable-uploads/1a51455d-0fb7-450a-9aa2-8f47c4fbe235.png",
      "/lovable-uploads/bdf8c013-2441-43f9-beaf-26ec4c1c805d.png",
      "/lovable-uploads/05b3916b-9a80-45a7-9cc2-acf139866904.png",
      "/lovable-uploads/b945f968-c86e-4010-9c3c-6454c94a319d.png"
    ],
    capacity: 18,
    price: "R$ 18.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "58 Pés" },
      { icon: Music, label: "Som Bluetooth" },
      { icon: Coffee, label: "Churrasqueira" },
      { icon: Shield, label: "3 Quartos" }
    ],
    description: "Iate Segue 58 Pés com capacidade para 18 passageiros",
    highlight: false,
    category: "iate"
  },
  {
    id: "tecnomarine",
    name: "TECNOMARINE",
    type: "Iate 52 pés",
    image: "/lovable-uploads/92b2d24f-28f3-4cdb-be14-99cf7cd729da.png",
    images: [
      "/lovable-uploads/92b2d24f-28f3-4cdb-be14-99cf7cd729da.png",
      "/lovable-uploads/4697521e-1dee-4702-bbe1-67079bb5f843.png",
      "/lovable-uploads/af99f0bb-1b98-48c8-b827-d0bc93ba7759.png",
      "/lovable-uploads/463d7eeb-42ce-415c-b7ff-80724d026b46.png",
      "/lovable-uploads/b0f38995-9c1b-4570-951d-57023d3d1199.png",
      "/lovable-uploads/95ba7d4a-ca33-4738-a613-7148b3d1b867.png",
      "/lovable-uploads/96e4b997-89be-4c5d-985b-ccd8c69440cc.png",
      "/lovable-uploads/6ba680e5-fcc8-4a6b-b81e-78a8c7589659.png",
      "/lovable-uploads/31a54bf8-6201-4349-b69a-9b289882ff99.png"
    ],
    capacity: 20,
    price: "R$ 10.000",
    rating: 4.9,
    duration: "5h",
    location: "Marina da Glória",
    size: "52 pés",
    features: [
      { icon: Anchor, label: "52 Pés" },
      { icon: Music, label: "Sistema de Som" },
      { icon: Coffee, label: "Cozinha Equipada" },
      { icon: Shield, label: "Marinheiro Incluso" }
    ],
    description: "Iate Tecnomarine 52 pés com capacidade para 20 passageiros",
    category: "iate"
  },
  {
    id: "myway",
    name: "IATE MY WAY",
    type: "Iate 60 pés",
    image: "/lovable-uploads/3588f07b-7df8-4af6-829b-24ecd40b669e.png",
    images: [
      "/lovable-uploads/3588f07b-7df8-4af6-829b-24ecd40b669e.png",
      "/lovable-uploads/78c323b5-e854-4a7c-ad9c-66b0477d604b.png",
      "/lovable-uploads/9eddcf09-1dc0-44ce-8335-a8c03e574409.png",
      "/lovable-uploads/221aa19e-adc7-47e6-a105-6d253b1b47fa.png",
      "/lovable-uploads/be0928b3-3995-4daf-a4c0-9e51b1c70487.png",
      "/lovable-uploads/df620d3e-513f-4487-adc4-4b90ca2dc0c3.png",
      "/lovable-uploads/6f10c3d7-fdd1-4a6b-aff5-c747bab05438.png",
      "/lovable-uploads/9dd84655-7e04-4441-9eab-f45a778e5d9c.png",
      "/lovable-uploads/e02bd15f-6c03-4c32-85fc-5de1a208a6e3.png"
    ],
    capacity: 20,
    price: "R$ 12.000",
    rating: 4.9,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "60 Pés" },
      { icon: Music, label: "Caixa de Som" },
      { icon: Coffee, label: "Cozinha Equipada" },
      { icon: Waves, label: "Flybrigde" }
    ],
    description: "Iate my way - Lancha 60 pés com 3 quartos, 2 banheiros, sala 2 ambientes e cozinha equipada",
    highlight: true,
    category: "iate"
  },
  {
    id: "flyhi",
    name: "LUÍSA VIII",
    type: "Lancha 38 Pés",
    image: "/lovable-uploads/7e95a21c-7588-479d-b209-a63d158402cf.png",
    images: [
      "/lovable-uploads/7e95a21c-7588-479d-b209-a63d158402cf.png",
      "/lovable-uploads/2ebda6df-6882-4c6b-b682-b007670efd23.png",
      "/lovable-uploads/ef09472e-331c-4441-b5da-2117580f78b7.png",
      "/lovable-uploads/4e87113f-0897-4e88-9229-f6f955dcf309.png",
      "/lovable-uploads/d6e878ee-6e60-46e8-969a-16cc6c49f976.png",
      "/lovable-uploads/6e132063-1c8a-4b6b-ac64-0ef4627ea834.png",
      "/lovable-uploads/32d94aba-c4ba-4e2b-be73-c76551f11a47.png",
      "/lovable-uploads/cd17a893-4bbc-4a82-bf5b-84b03ea11881.png",
      "/lovable-uploads/dfd65f37-942d-4bf1-9741-434ae2430999.png",
      "/lovable-uploads/86c6955b-f427-49fe-a9ce-30905edd7328.png"
    ],
    capacity: 13,
    price: "R$ 3.200",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "38 Pés" },
      { icon: Music, label: "Som de Altíssima Qualidade" },
      { icon: Coffee, label: "Coolers" },
      { icon: Shield, label: "Marinheiro Incluso" }
    ],
    description: "Luisa 8 38 Pés - 5 horas de passeio com combustível, marinheiro, tapetão flutuante, coolers e caixa de som de altíssima qualidade",
    category: "lancha"
  },
  {
    id: "mcell",
    name: "Lancha M Cell",
    type: "Lancha",
    image: "/lovable-uploads/fe22476e-95ca-419b-b283-9a55cd96b7a9.png",
    capacity: 9,
    price: "R$ 2.500",
    originalPrice: undefined,
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Users, label: "Grupos Pequenos" },
      { icon: Music, label: "Som Bluetooth" },
      { icon: Sun, label: "Churrasqueira" },
      { icon: Shield, label: "Banheiro" }
    ],
    description: "Lancha M Cell com cabine, churrasqueira e todas as comodidades para um passeio perfeito",
    category: "lancha"
  },
  {
    id: "comendador",
    name: "COMENDADOR",
    type: "Lancha 55 Pés",
    image: "/lovable-uploads/ca40959a-88f6-40ad-b3af-b8dca052c478.png",
    images: [
      "/lovable-uploads/ca40959a-88f6-40ad-b3af-b8dca052c478.png",
      "/lovable-uploads/1c23f56d-2616-47e2-ba2d-f7bd359321e6.png",
      "/lovable-uploads/cc84d2d6-4777-40f2-b0c5-e4a7ed3cfb1f.png",
      "/lovable-uploads/d3999fcc-6362-452a-95f1-ee4837989846.png",
      "/lovable-uploads/51953857-9cc6-4f6b-860b-f10e344d8e94.png",
      "/lovable-uploads/f5fdfd5d-7cd9-457e-b76c-c16cbda72ee9.png",
      "/lovable-uploads/6dc5fa01-f68a-45c6-aa61-a7dcc64a66f5.png",
      "/lovable-uploads/1f2426c2-e57a-44a4-8978-c8a660c19472.png",
      "/lovable-uploads/82016ba6-204b-43a9-ab66-548244eb229b.png",
      "/lovable-uploads/3329870f-eac1-45fd-9e11-293311b5b514.png"
    ],
    capacity: 25,
    price: "R$ 7.700",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "55 Pés" },
      { icon: Music, label: "Som Bluetooth" },
      { icon: Coffee, label: "Cooler" },
      { icon: Waves, label: "Flybridge" }
    ],
    description: "Lancha 55 Pés com capacidade para 25 passageiros + 2 tripulantes",
    category: "lancha"
  },
  {
    id: "dragao",
    name: "DRAGÃO",
    type: "Lancha 41 pés",
    image: "/lovable-uploads/063d534d-72c1-4861-964e-1013f7b5e1fb.png",
    images: [
      "/lovable-uploads/063d534d-72c1-4861-964e-1013f7b5e1fb.png",
      "/lovable-uploads/78e24106-0662-4b8f-b957-01c6446386f0.png",
      "/lovable-uploads/e0c8a5e9-c885-4aaa-8a4e-2f6e32b615eb.png",
      "/lovable-uploads/206b8791-35ce-478d-b0ce-50f36209cdbb.png",
      "/lovable-uploads/811fbc3c-bbbb-49d6-9ef2-6b047f5dee31.png",
      "/lovable-uploads/991fc380-07b8-4ab0-869a-af16900c15e0.png",
      "/lovable-uploads/9b059d47-e2ac-4f6a-bccf-b5d9f4b6a2ae.png",
      "/lovable-uploads/b7ece9f5-ac8c-4875-8123-350d6f0bbae6.png",
      "/lovable-uploads/4babac2a-c5e7-4a90-a06f-af9ef7824b00.png",
      "/lovable-uploads/6dd56391-2365-43bd-9ac8-52d83aec7bbf.png"
    ],
    capacity: 17,
    price: "R$ 4.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    size: "41 pés",
    features: [
      { icon: Anchor, label: "41 Pés" },
      { icon: Music, label: "Som Bluetooth" },
      { icon: Coffee, label: "Churrasqueira" },
      { icon: Shield, label: "2 Tripulantes" }
    ],
    description: "Iate de 41 pés com capacidade para 17 passageiros + 2 tripulantes",
    category: "lancha"
  },
  {
    id: "grandraray",
    name: "GRAND RARAY",
    type: "Lancha Premium",
    image: "/lovable-uploads/ab7f00cd-e5bd-490d-8dce-6f179460fd9a.png",
    capacity: 20,
    price: "R$ 7.000",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "20 Passageiros" },
      { icon: Music, label: "Som Altíssima Qualidade" },
      { icon: Coffee, label: "Coolers" },
      { icon: Waves, label: "Tapetão Flutuante" }
    ],
    description: "GRAND RARAY com 5 horas de passeio e equipamentos de primeira qualidade",
    category: "lancha"
  },
  // Novas embarcações
  {
    id: "lady-ruth",
    name: "LADY RUTH",
    type: "Lancha Premium",
    image: "/lovable-uploads/030db542-183e-4ed7-bb19-0a6cd334cdb5.png",
    images: [
      "/lovable-uploads/030db542-183e-4ed7-bb19-0a6cd334cdb5.png",
      "/lovable-uploads/d9a6c9b9-9fee-4e01-994c-ebe3035b166d.png",
      "/lovable-uploads/88d5840c-c694-469c-b0b6-ebd172700c69.png",
      "/lovable-uploads/266900b9-42c7-4b08-a0cd-c9cb1755d25e.png",
      "/lovable-uploads/8ae1039c-db06-4d08-9021-8bdb576806e4.png",
      "/lovable-uploads/5f54c9a8-1d11-43f6-b5fd-d5b2121a0144.png",
      "/lovable-uploads/6db08f7a-905e-46d7-96a2-9854a88f7b02.png"
    ],
    capacity: 13,
    price: "R$ 2.500",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "13 Passageiros" },
      { icon: Music, label: "Som Bluetooth" },
      { icon: Coffee, label: "Tapetão Flutuante" },
      { icon: Shield, label: "Marinheiro Incluso" }
    ],
    description: "LADY RUTH | 13 PASSAGEIROS - 5 horas de um excelente passeio",
    category: "lancha"
  },
  {
    id: "mangata",
    name: "MANGATA",
    type: "Lancha 44 Pés",
    image: "/lovable-uploads/8e04365e-545e-47e3-a14d-2cf6b644e2f4.png",
    capacity: 12,
    price: "R$ 11.500",
    originalPrice: "R$ 12.000",
    rating: 4.9,
    duration: "5h",
    location: "Late Clube Rio de Janeiro",
    features: [
      { icon: Anchor, label: "44 Pés" },
      { icon: Music, label: "Som 3 Ambientes" },
      { icon: Coffee, label: "2 Freezers" },
      { icon: Shield, label: "2 Quartos" }
    ],
    description: "Sessa Marine C44 - Iate de luxo com área gourmet e plataforma submergível",
    category: "lancha"
  },
  {
    id: "prestige",
    name: "PRESTIGE",
    type: "Iate",
    image: "/lovable-uploads/a4f88006-70b1-4a04-9d57-28bfa10151de.png",
    images: [
      "/lovable-uploads/a4f88006-70b1-4a04-9d57-28bfa10151de.png",
      "/lovable-uploads/6cf377ab-a937-4fe3-ac92-9095dba56157.png",
      "/lovable-uploads/7165fe57-2b4a-455a-ae95-3149e6e3b7df.png",
      "/lovable-uploads/73ec5552-0181-4d19-b75d-2a24057c3735.png",
      "/lovable-uploads/fa35a6dd-ee47-4ad7-8102-d37f9922d687.png",
      "/lovable-uploads/15303440-1cc6-4b35-90c6-aadc5d3e0e34.png",
      "/lovable-uploads/6b669433-863d-478c-9b9a-ad488e7b6b61.png",
      "/lovable-uploads/50a08687-a27e-4702-bb79-7fe91990bf02.png",
      "/lovable-uploads/2c51654c-c654-47ab-a790-6535d71a42cd.png",
      "/lovable-uploads/88594a2b-10de-4896-ab88-9412866aa0fa.png"
    ],
    capacity: 20,
    price: "R$ 20.000",
    rating: 5.0,
    duration: "6h",
    location: "Marina da Glória",
    features: [
      { icon: Users, label: "20 passageiros" },
      { icon: Clock, label: "6 horas" },
      { icon: MapPin, label: "Marina da Glória" },
      { icon: Anchor, label: "Iate de Luxo" }
    ],
    description: "Iate de luxo Prestige 60 pés com máximo conforto e elegância para sua experiência única no mar.",
    highlight: true,
    category: "iate"
  },
  {
    id: "rebeca",
    name: "YACHT REBECA",
    type: "Iate Luxury",
    image: "/lovable-uploads/f29c9b99-1624-4a05-a608-82a9c3a46f5e.png",
    images: [
      "/lovable-uploads/f29c9b99-1624-4a05-a608-82a9c3a46f5e.png",
      "/lovable-uploads/37d8fc0a-3dca-4800-8ea3-a120ba77fd6c.png",
      "/lovable-uploads/e2c9c31d-7a16-4dd1-b3c3-27083fed6d7a.png",
      "/lovable-uploads/642a623e-b8b9-43fa-b668-9788940208a1.png",
      "/lovable-uploads/260e64f1-d533-416d-a9a3-553ef2bc58f1.png",
      "/lovable-uploads/d73b8c23-47c6-4e6f-a37c-bc753b9b9a2a.png",
      "/lovable-uploads/a0d6795e-3c20-45cb-9f90-29bd99912ab9.png",
      "/lovable-uploads/cf856525-328b-4f76-8889-9925830ac08b.png",
      "/lovable-uploads/87821562-8761-4226-8364-6d7a846d5dda.png"
    ],
    capacity: 16,
    price: "R$ 20.000",
    rating: 4.9,
    duration: "6h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "62 Pés" },
      { icon: Music, label: "Pininfarina" },
      { icon: Coffee, label: "Cozinha Gourmet" },
      { icon: Shield, label: "Design Italiano" }
    ],
    description: "Phantom 620 Pininfarina de 62 pés com design italiano",
    category: "iate"
  },
  {
    id: "oceano",
    name: "OCEANO",
    type: "Catamarã",
    image: "/lovable-uploads/2402bb41-ddc9-4cfa-96e5-b21a00722ecb.png",
    capacity: 65,
    price: "R$ 16.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "65 Passageiros" },
      { icon: Music, label: "Horários Flexíveis" },
      { icon: Coffee, label: "Roteiro Interno" },
      { icon: Shield, label: "Marinheiro" }
    ],
    description: "Catamarã de até 65 passageiros com horários válidos por 30 dias",
    highlight: true,
    category: "catamara"
  },
  {
    id: "blau",
    name: "CATAMARÃ BLAU",
    type: "Catamarã",
    image: "/lovable-uploads/da67be76-ac24-4269-aead-b242639fa0a3.png",
    images: [
      "/lovable-uploads/da67be76-ac24-4269-aead-b242639fa0a3.png",
      "/lovable-uploads/9811b275-cdf5-422e-adce-19e83e5c4d45.png",
      "/lovable-uploads/d88ff8fb-9e94-47f9-8f78-e61e8272618d.png",
      "/lovable-uploads/801c9b39-27b8-4d39-b8aa-a171e0173460.png",
      "/lovable-uploads/12450aa9-b646-4ad7-8de4-38fb91bc6480.png",
      "/lovable-uploads/81555da6-30a6-4286-b4e9-f39844b74db8.png",
      "/lovable-uploads/62a4a4ee-7b72-4365-86a2-b870cd9a3b67.png",
      "/lovable-uploads/08097703-3ae1-4432-8fe4-5092bda148ef.png",
      "/lovable-uploads/5533ccfe-73f1-4e38-a910-b70a71adb094.png",
      "/lovable-uploads/2c53acee-78b6-45f0-9cfc-3e2fda51d15f.png"
    ],
    capacity: 20,
    price: "R$ 8.000",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "20 Passageiros" },
      { icon: Music, label: "Som" },
      { icon: Coffee, label: "Combustível Incluso" },
      { icon: Shield, label: "Marinheiro" }
    ],
    description: "Catamarã Blau com embarque na Marina da Glória",
    category: "catamara"
  },
  {
    id: "atlantis",
    name: "YACHT CATAMARÃ ATLANTIS",
    type: "Catamarã Luxury",
    image: "/lovable-uploads/915a115f-06cd-4dae-a14b-eb03cbc20e7d.png",
    capacity: 80,
    price: "R$ 80.000",
    rating: 5.0,
    duration: "6h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "120 Pés" },
      { icon: Users, label: "80-100 Passageiros" },
      { icon: Coffee, label: "BBQ Experience" },
      { icon: Shield, label: "Catamarã de Luxo" }
    ],
    description: "Catamarã de luxo de 120 pés para grandes eventos e celebrações",
    highlight: true,
    category: "catamara"
  },
  {
    id: "seven",
    name: "SEVEN",
    type: "Lancha Premium",
    image: "/lovable-uploads/0e8ef52a-4cbd-4c90-8602-90019c49b129.png",
    capacity: 15,
    price: "R$ 7.000",
    rating: 4.7,
    duration: "5h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "44 Pés" },
      { icon: Music, label: "Som Bluetooth" },
      { icon: Coffee, label: "Flutuadores" },
      { icon: Shield, label: "Marinheiro" }
    ],
    description: "Lancha SEVEN Intermarine 44 com duração de 5 horas de passeio",
    category: "lancha"
  },
  {
    id: "senna",
    name: "SENNA",
    type: "Lancha Premium",
    image: "/lovable-uploads/758a21a0-0f35-4d63-8802-bf9fb5543f54.png",
    capacity: 18,
    price: "R$ 7.700",
    rating: 4.8,
    duration: "5h",
    location: "Marina da Glória (Pier Nobre)",
    features: [
      { icon: Anchor, label: "Motores diesel 500HP" },
      { icon: Music, label: "Som Bluetooth" },
      { icon: Coffee, label: "2 quartos, 2 banheiros (1 suíte)" },
      { icon: Shield, label: "Fly e solário espaçosos" }
    ],
    description: "Capacidade: 18 passageiros + 2 tripulantes. Motores de centro diesel 500HP",
    category: "lancha"
  },
  {
    id: "luisa",
    name: "LUÍSA V",
    type: "Lancha Premium",
    image: "/lovable-uploads/03c21177-517e-46bb-ba14-3d5e3e92b548.png",
    images: [
      "/lovable-uploads/03c21177-517e-46bb-ba14-3d5e3e92b548.png",
      "/lovable-uploads/5b46ecc7-6d2f-49f9-97e1-18cd69e70334.png",
      "/lovable-uploads/971d60d5-6cd7-46b1-80e0-b22fc9971ecf.png",
      "/lovable-uploads/f445fc67-3320-4ec8-9fb4-242ae592d18c.png",
      "/lovable-uploads/729365c1-b3c2-4db7-8b9d-931a2f7fb1f7.png",
      "/lovable-uploads/3e2e65a7-195a-4f5e-9cf9-39c176c713cd.png",
      "/lovable-uploads/2b635aac-c2f0-4db3-a82a-e8c116893024.png",
      "/lovable-uploads/c84fec1a-ab0f-4007-ae85-08012b4590c2.png",
      "/lovable-uploads/da929e32-33ee-4fc1-97c0-d366d63ff457.png",
      "/lovable-uploads/8ce2e68b-6ed0-47b8-9f7b-df5ab588c7d2.png"
    ],
    capacity: 15,
    price: "R$ 3.200",
    rating: 4.6,
    duration: "6h",
    location: "Marina da Glória",
    features: [
      { icon: Anchor, label: "15 Passageiros" },
      { icon: Music, label: "Som Bluetooth" },
      { icon: Coffee, label: "Churrasqueira" },
      { icon: Shield, label: "Marinheiro Incluso" }
    ],
    description: "LUÍSA V - Iate Premium para até 15 passageiros com comodidades completas",
    category: "lancha"
  }
];

const VesselCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const categories = [
    { id: "all", name: "Todas", count: vessels.length },
    { id: "lancha", name: "Lanchas", count: vessels.filter(v => v.category === "lancha").length },
    { id: "iate", name: "Iates", count: vessels.filter(v => v.category === "iate").length },
    { id: "catamara", name: "Catamarãs", count: vessels.filter(v => v.category === "catamara").length }
  ];

  const filteredVessels = vessels
    .filter(vessel => {
      const matchesSearch = vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vessel.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || vessel.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, ""));
        case "price-high":
          return parseInt(b.price.replace(/\D/g, "")) - parseInt(a.price.replace(/\D/g, ""));
        case "capacity":
          return b.capacity - a.capacity;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.highlight ? 1 : -1;
      }
    });

  return (
    <section id="embarcações" className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Nossa Frota Premium
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Escolha Sua
            <span className="text-gradient-ocean"> Embarcação</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Oferecemos uma frota diversificada de embarcações premium, todas equipadas com os melhores 
            equipamentos de segurança e conforto para garantir uma experiência inesquecível.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Buscar embarcação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-background border-border/50 focus:border-primary"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-background border border-border/50 rounded-lg focus:border-primary focus:outline-none"
            >
              <option value="featured">Destaques</option>
              <option value="price-low">Menor Preço</option>
              <option value="price-high">Maior Preço</option>
              <option value="capacity">Capacidade</option>
              <option value="rating">Avaliação</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            {filteredVessels.length} embarcação{filteredVessels.length !== 1 ? 'ões' : ''} encontrada{filteredVessels.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Vessel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredVessels.map((vessel) => (
            <VesselCard
              key={vessel.id}
              {...vessel}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredVessels.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nenhuma embarcação encontrada</h3>
            <p className="text-muted-foreground mb-6">
              Tente ajustar os filtros ou termo de busca
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              variant="outline"
            >
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Não encontrou o que procurava?</h3>
            <p className="text-muted-foreground mb-6">
              Entre em contato conosco e criaremos uma experiência personalizada para você!
            </p>
            <Button asChild className="btn-ocean">
              <a href="https://wa.me/5521974004415?text=Olá! Gostaria de uma experiência personalizada." target="_blank" rel="noopener noreferrer">
                Falar com Especialista
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VesselCatalog;